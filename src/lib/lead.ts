import { randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import tls from "node:tls";
import { z } from "zod";
import { getDirectusConfig } from "@/lib/content/directus-client";
import { isValidRussianPhone, normalizeRussianPhone } from "@/lib/phone";
import type { LeadPayload } from "@/types/content";

const rateLimitWindowMs = 15 * 60 * 1000;
const ipLimit = 8;
const phoneLimit = 4;
const directusSaveTimeoutMs = 10_000;
const telegramTimeoutMs = 10_000;

const quizAnswerSchema = z.object({
  step: z.number().int().min(1).max(20),
  question: z.string().trim().min(1).max(240),
  value: z.string().trim().min(1).max(240),
  label: z.string().trim().min(1).max(240),
});

const phoneSchema = z.string().trim().superRefine((value, context) => {
  if (!value) {
    context.addIssue({
      code: "custom",
      message: "Введите телефон",
    });
    return;
  }

  if (!isValidRussianPhone(value)) {
    context.addIssue({
      code: "custom",
      message: "Введите корректный номер телефона",
    });
  }
});

export const leadSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80, "Имя слишком длинное"),
  phone: phoneSchema,
  communicationMethod: z.enum(["whatsapp", "call", "telegram"], {
    error: "Выберите способ связи",
  }),
  comment: z.string().trim().max(1000, "Комментарий слишком длинный").optional().or(z.literal("")),
  consent: z.boolean().refine((value) => value === true, "Необходимо согласие на обработку персональных данных"),
  honeypot: z.string().max(0, "Заявка не прошла антиспам-проверку").optional().or(z.literal("")),
  quizAnswers: z.array(quizAnswerSchema).max(20).optional(),
  selectedProjectId: z.string().trim().max(120).optional().or(z.literal("")),
  sourcePage: z.string().trim().min(1, "Не указан источник заявки").max(160),
  utm_source: z.string().trim().max(160).optional().or(z.literal("")),
  utm_medium: z.string().trim().max(160).optional().or(z.literal("")),
  utm_campaign: z.string().trim().max(160).optional().or(z.literal("")),
  utm_content: z.string().trim().max(160).optional().or(z.literal("")),
  utm_term: z.string().trim().max(160).optional().or(z.literal("")),
  referrer: z.string().trim().max(500).optional().or(z.literal("")),
  timestamp: z.string().datetime().optional(),
});

type ParsedLead = z.infer<typeof leadSubmissionSchema>;

type StoredLead = Omit<LeadPayload, "timestamp"> & {
  id: string;
  timestamp: string;
  createdAt: string;
  ip?: string;
  userAgent?: string;
};

type LeadContext = {
  ip?: string;
  userAgent?: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type DeliveryProviderCategory = "persistence" | "notification";
type DeliveryChannel = "directus" | "local_file" | "telegram" | "smtp";
type DeliveryStatus = "success" | "disabled" | "failed";

type DeliveryResult = {
  channel: DeliveryChannel;
  providerCategory: DeliveryProviderCategory;
  status: DeliveryStatus;
  reason?: string;
};

export type SubmitLeadResult =
  | {
      success: true;
      leadId: string;
    }
  | {
      success: false;
      code: "validation_error" | "spam" | "rate_limited" | "save_failed" | "unexpected_error";
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

const rateLimitStore = new Map<string, RateLimitEntry>();

export async function submitLead(input: unknown, context: LeadContext = {}): Promise<SubmitLeadResult> {
  const parsed = leadSubmissionSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      code: "validation_error",
      message: "Проверьте поля формы и попробуйте ещё раз.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  if (data.honeypot) {
    return {
      success: false,
      code: "spam",
      message: "Заявка не прошла антиспам-проверку.",
    };
  }

  const phone = normalizeRussianPhone(data.phone);
  if (!phone) {
    return {
      success: false,
      code: "validation_error",
      message: "Введите корректный номер телефона",
      fieldErrors: {
        phone: ["Введите корректный номер телефона"],
      },
    };
  }

  const ip = normalizeIp(context.ip);

  if (!consumeRateLimit(`ip:${ip}`, ipLimit) || !consumeRateLimit(`phone:${phone}`, phoneLimit)) {
    return {
      success: false,
      code: "rate_limited",
      message: "Слишком много заявок подряд. Попробуйте отправить форму чуть позже.",
    };
  }

  const lead = toStoredLead(data, {
    ip,
    userAgent: context.userAgent,
    phone,
  });

  const directusResult = await saveLeadToDirectus(lead);
  const localResult = directusResult.status === "success" ? null : await saveLeadLocally(lead);
  const persistenceSucceeded = directusResult.status === "success" || localResult?.status === "success";

  if (directusResult.status === "failed") {
    logDeliveryFailure(directusResult, lead.id, persistenceSucceeded);
  }

  if (localResult?.status === "failed") {
    logDeliveryFailure(localResult, lead.id, persistenceSucceeded);
  }

  if (!persistenceSucceeded) {
    return {
      success: false,
      code: "save_failed",
      message: "Не удалось сохранить заявку. Попробуйте ещё раз или напишите в WhatsApp.",
    };
  }

  const notificationResults = await Promise.all([notifyTelegram(lead), notifyEmail(lead)]);
  notificationResults.forEach((result) => {
    if (result.status === "failed") {
      logDeliveryFailure(result, lead.id, persistenceSucceeded);
    }
  });

  return {
    success: true,
    leadId: lead.id,
  };
}

function toStoredLead(data: ParsedLead, context: LeadContext & { phone: string }): StoredLead {
  const timestamp = data.timestamp ?? new Date().toISOString();

  return {
    id: randomUUID(),
    name: data.name,
    phone: context.phone,
    communicationMethod: data.communicationMethod,
    comment: data.comment || undefined,
    consent: data.consent,
    quizAnswers: data.quizAnswers,
    selectedProjectId: data.selectedProjectId || undefined,
    sourcePage: data.sourcePage,
    utm_source: data.utm_source || undefined,
    utm_medium: data.utm_medium || undefined,
    utm_campaign: data.utm_campaign || undefined,
    utm_content: data.utm_content || undefined,
    utm_term: data.utm_term || undefined,
    referrer: data.referrer || undefined,
    timestamp,
    createdAt: new Date().toISOString(),
    ip: context.ip,
    userAgent: context.userAgent,
  };
}

function deliveryResult(
  channel: DeliveryChannel,
  providerCategory: DeliveryProviderCategory,
  status: DeliveryStatus,
  reason?: string
): DeliveryResult {
  return {
    channel,
    providerCategory,
    status,
    reason,
  };
}

function classifyTimeout(error: unknown) {
  return error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
}

function logDeliveryFailure(result: DeliveryResult, leadId: string, persistenceSucceeded: boolean) {
  console.warn("Lead delivery failed", {
    event: "lead_delivery_failed",
    channel: result.channel,
    status: result.status,
    reason: result.reason ?? "delivery_failed",
    providerCategory: result.providerCategory,
    persistenceSucceeded,
    leadId,
  });
}

async function saveLeadLocally(lead: StoredLead): Promise<DeliveryResult> {
  const outputDir = path.join(process.cwd(), "output");
  const filePath = path.join(outputDir, "leads.jsonl");

  try {
    await mkdir(outputDir, { recursive: true });
    await appendFile(filePath, `${JSON.stringify(lead)}\n`, "utf8");
    return deliveryResult("local_file", "persistence", "success");
  } catch {
    return deliveryResult("local_file", "persistence", "failed", "local_file_save_failed");
  }
}

async function saveLeadToDirectus(lead: StoredLead): Promise<DeliveryResult> {
  const config = getDirectusConfig();

  if (!config) {
    return deliveryResult("directus", "persistence", "disabled");
  }

  const payload = {
    name: lead.name,
    phone: lead.phone,
    communicationMethod: lead.communicationMethod,
    comment: lead.comment,
    quizAnswers: lead.quizAnswers,
    selectedProjectId: lead.selectedProjectId,
    sourcePage: lead.sourcePage,
    utm_source: lead.utm_source,
    utm_medium: lead.utm_medium,
    utm_campaign: lead.utm_campaign,
    utm_content: lead.utm_content,
    utm_term: lead.utm_term,
    referrer: lead.referrer,
    consent: lead.consent,
    createdAt: lead.createdAt,
  };

  try {
    const response = await fetch(`${config.url}/items/Leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(directusSaveTimeoutMs),
    });

    if (!response.ok) {
      return deliveryResult("directus", "persistence", "failed", "directus_save_failed");
    }

    return deliveryResult("directus", "persistence", "success");
  } catch (error) {
    return deliveryResult(
      "directus",
      "persistence",
      "failed",
      classifyTimeout(error) ? "directus_save_timeout" : "directus_save_failed"
    );
  }
}

function consumeRateLimit(key: string, limit: number) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    cleanupRateLimit(now);
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count += 1;
  return true;
}

function cleanupRateLimit(now: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

function normalizeIp(ip?: string) {
  return ip?.split(",")[0]?.trim() || "local";
}

function buildNotificationText(lead: StoredLead) {
  const quiz = lead.quizAnswers?.length
    ? lead.quizAnswers.map((answer) => `- ${answer.question}: ${answer.label}`).join("\n")
    : "нет";

  return [
    "Новая заявка с сайта КИТ",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Способ связи: ${formatCommunicationMethod(lead.communicationMethod)}`,
    `Источник: ${lead.sourcePage}`,
    lead.selectedProjectId ? `Пример кухни: ${lead.selectedProjectId}` : undefined,
    lead.comment ? `Комментарий: ${lead.comment}` : undefined,
    `Квиз:\n${quiz}`,
    lead.utm_source ? `UTM source: ${lead.utm_source}` : undefined,
    lead.utm_medium ? `UTM medium: ${lead.utm_medium}` : undefined,
    lead.utm_campaign ? `UTM campaign: ${lead.utm_campaign}` : undefined,
    lead.referrer ? `Referrer: ${lead.referrer}` : undefined,
    `Время: ${lead.timestamp}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatCommunicationMethod(method: LeadPayload["communicationMethod"]) {
  const labels: Record<LeadPayload["communicationMethod"], string> = {
    whatsapp: "WhatsApp",
    call: "Звонок",
    telegram: "Telegram",
  };

  return labels[method];
}

async function notifyTelegram(lead: StoredLead): Promise<DeliveryResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return deliveryResult("telegram", "notification", "disabled");
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildNotificationText(lead),
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(telegramTimeoutMs),
    });

    if (!response.ok) {
      return deliveryResult("telegram", "notification", "failed", "notification_failed");
    }

    return deliveryResult("telegram", "notification", "success");
  } catch (error) {
    return deliveryResult(
      "telegram",
      "notification",
      "failed",
      classifyTimeout(error) ? "notification_timeout" : "notification_failed"
    );
  }
}

async function notifyEmail(lead: StoredLead): Promise<DeliveryResult> {
  const host = process.env.SMTP_HOST;
  const to = process.env.SMTP_TO;
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;

  if (!host || !to || !from) {
    return deliveryResult("smtp", "notification", "disabled");
  }

  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = process.env.SMTP_SECURE !== "false";

  try {
    await sendSmtpMail({
      host,
      port,
      secure,
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASS,
      from,
      to,
      subject: "Новая заявка с сайта КИТ",
      text: buildNotificationText(lead),
    });

    return deliveryResult("smtp", "notification", "success");
  } catch (error) {
    return deliveryResult(
      "smtp",
      "notification",
      "failed",
      error instanceof Error && error.message.toLowerCase().includes("timeout")
        ? "notification_timeout"
        : "notification_failed"
    );
  }
}

type SmtpMailOptions = {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  password?: string;
  from: string;
  to: string;
  subject: string;
  text: string;
};

async function sendSmtpMail(options: SmtpMailOptions) {
  let socket = await openSmtpConnection(options.host, options.port, options.secure);

  await readSmtpResponse(socket, [220]);
  await smtpCommand(socket, `EHLO ${process.env.SMTP_HELO_NAME ?? "kit-site.local"}`, [250]);

  if (!options.secure) {
    await smtpCommand(socket, "STARTTLS", [220]);
    socket = await upgradeToTls(socket, options.host);
    await smtpCommand(socket, `EHLO ${process.env.SMTP_HELO_NAME ?? "kit-site.local"}`, [250]);
  }

  if (options.user && options.password) {
    const auth = Buffer.from(`\u0000${options.user}\u0000${options.password}`).toString("base64");
    await smtpCommand(socket, `AUTH PLAIN ${auth}`, [235]);
  }

  await smtpCommand(socket, `MAIL FROM:<${sanitizeEmailAddress(options.from)}>`, [250]);

  const recipients = options.to
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);

  for (const recipient of recipients) {
    await smtpCommand(socket, `RCPT TO:<${sanitizeEmailAddress(recipient)}>`, [250, 251]);
  }

  await smtpCommand(socket, "DATA", [354]);
  socket.write(`${buildEmailMessage(options)}\r\n.\r\n`);
  await readSmtpResponse(socket, [250]);
  await smtpCommand(socket, "QUIT", [221]).catch(() => undefined);
  socket.end();
}

function openSmtpConnection(host: string, port: number, secure: boolean): Promise<net.Socket | tls.TLSSocket> {
  return new Promise((resolve, reject) => {
    const socket = secure
      ? tls.connect({
          host,
          port,
          servername: host,
          rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== "false",
        })
      : net.connect({ host, port });

    socket.once("connect", () => resolve(socket));
    socket.once("error", reject);
    socket.setTimeout(15000, () => {
      socket.destroy(new Error("SMTP connection timeout"));
    });
  });
}

function upgradeToTls(socket: net.Socket | tls.TLSSocket, host: string): Promise<tls.TLSSocket> {
  return new Promise((resolve, reject) => {
    const secureSocket = tls.connect({
      socket,
      servername: host,
      rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== "false",
    });

    secureSocket.once("secureConnect", () => resolve(secureSocket));
    secureSocket.once("error", reject);
    secureSocket.setTimeout(15000, () => {
      secureSocket.destroy(new Error("SMTP TLS timeout"));
    });
  });
}

async function smtpCommand(socket: net.Socket | tls.TLSSocket, command: string, expectedCodes: number[]) {
  socket.write(`${command}\r\n`);
  await readSmtpResponse(socket, expectedCodes);
}

function readSmtpResponse(socket: net.Socket | tls.TLSSocket, expectedCodes: number[]): Promise<string> {
  return new Promise((resolve, reject) => {
    let response = "";
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("SMTP response timeout"));
    }, 15000);

    function cleanup() {
      clearTimeout(timer);
      socket.off("data", onData);
      socket.off("error", onError);
    }

    function onError(error: Error) {
      cleanup();
      reject(error);
    }

    function onData(chunk: Buffer | string) {
      response += chunk.toString();
      const lines = response.split(/\r?\n/).filter(Boolean);
      const lastLine = lines.at(-1);

      if (!lastLine || !/^\d{3} /.test(lastLine)) {
        return;
      }

      const code = Number(lastLine.slice(0, 3));
      cleanup();

      if (!expectedCodes.includes(code)) {
        reject(new Error(`Unexpected SMTP response ${code}: ${response}`));
        return;
      }

      resolve(response);
    }

    socket.on("data", onData);
    socket.once("error", onError);
  });
}

function buildEmailMessage(options: SmtpMailOptions) {
  const subject = `=?UTF-8?B?${Buffer.from(options.subject).toString("base64")}?=`;
  const body = options.text.replace(/^\./gm, "..");

  return [
    `From: ${sanitizeHeader(options.from)}`,
    `To: ${sanitizeHeader(options.to)}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    `Date: ${new Date().toUTCString()}`,
    "",
    body,
  ].join("\r\n");
}

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}

function sanitizeEmailAddress(value: string) {
  return value.replace(/[<>\r\n]/g, "").trim();
}
