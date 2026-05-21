import type { LeadPayload } from "@/types/content";
import { normalizeLeadContactValue } from "@/lib/form-schemas";
import type { AnalyticsErrorCode } from "@/lib/analytics";

export type ClientLeadPayload = Omit<LeadPayload, "timestamp"> & {
  timestamp?: string;
};

type LeadApiSuccess = {
  success: true;
  leadId: string;
};

type LeadApiError = {
  success: false;
  code?: string;
  message?: string;
};

export type LeadSubmitErrorCode = AnalyticsErrorCode;

export class LeadClientError extends Error {
  code: LeadSubmitErrorCode;

  constructor(message: string, code: LeadSubmitErrorCode) {
    super(message);
    this.name = "LeadClientError";
    this.code = code;
  }
}

export async function sendLead(payload: ClientLeadPayload): Promise<LeadApiSuccess> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      phone: normalizeLeadContactValue(payload.communicationMethod, payload.phone),
      timestamp: payload.timestamp ?? new Date().toISOString(),
    }),
  });

  const result = (await response.json()) as LeadApiSuccess | LeadApiError;

  if (!response.ok) {
    const message = result.success ? undefined : result.message;
    const code = result.success ? "unknown_error" : getSafeLeadErrorCode(result.code);
    throw new LeadClientError(message ?? "Не удалось отправить заявку.", code);
  }

  if (!result.success) {
    throw new LeadClientError(result.message ?? "Не удалось отправить заявку.", getSafeLeadErrorCode(result.code));
  }

  return result;
}

export function getSafeLeadErrorCode(errorOrCode: unknown): LeadSubmitErrorCode {
  if (errorOrCode instanceof LeadClientError) {
    return errorOrCode.code;
  }

  if (typeof errorOrCode !== "string") {
    return "unknown_error";
  }

  switch (errorOrCode) {
    case "validation_error":
    case "spam":
    case "rate_limited":
    case "save_failed":
    case "unexpected_error":
    case "unsupported_media_type":
    case "body_too_large":
    case "forbidden":
    case "network_error":
      return errorOrCode;
    default:
      return "unknown_error";
  }
}

export function collectLeadClientMeta() {
  if (typeof window === "undefined") {
    return {
      timestamp: new Date().toISOString(),
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
    referrer: document.referrer || undefined,
    timestamp: new Date().toISOString(),
  };
}
