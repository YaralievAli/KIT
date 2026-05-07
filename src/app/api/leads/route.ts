import { NextRequest, NextResponse } from "next/server";
import { submitLead } from "@/lib/lead";

export const runtime = "nodejs";

const maxLeadBodyBytes = 16 * 1024;
const guardErrorMessage = "Не удалось отправить заявку. Попробуйте ещё раз.";

function jsonGuardError(code: string, status: number) {
  return NextResponse.json(
    {
      success: false,
      code,
      message: guardErrorMessage,
    },
    { status }
  );
}

function isJsonContentType(request: NextRequest) {
  const contentType = request.headers.get("content-type");
  const mediaType = contentType?.toLowerCase().split(";")[0]?.trim();

  return mediaType === "application/json";
}

function getContentLength(request: NextRequest) {
  const contentLength = request.headers.get("content-length");

  if (!contentLength) {
    return null;
  }

  const parsed = Number(contentLength);

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function getUtf8ByteLength(value: string) {
  return new TextEncoder().encode(value).byteLength;
}

function getRequestIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? undefined;
}

function maskIpKey(ipHeader?: string | null) {
  const ip = ipHeader?.split(",")[0]?.trim();

  if (!ip) {
    return "missing";
  }

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) {
    const [first, second] = ip.split(".");
    return `${first}.${second}.x.x`;
  }

  if (ip.includes(":")) {
    const parts = ip.split(":").filter(Boolean);
    return parts.length > 0 ? `${parts.slice(0, 2).join(":")}:*` : "present";
  }

  return "present";
}

function normalizeOrigin(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function getAllowedOrigins() {
  const origins = process.env.LEADS_ALLOWED_ORIGINS?.split(",") ?? [];

  return new Set(
    origins
      .map((origin) => normalizeOrigin(origin.trim()))
      .filter((origin): origin is string => Boolean(origin))
  );
}

function isDevelopmentLocalOrigin(origin: string) {
  if (process.env.NODE_ENV === "production") {
    return false;
  }

  try {
    const url = new URL(origin);
    return url.protocol === "http:" && (url.hostname === "localhost" || url.hostname === "127.0.0.1");
  } catch {
    return false;
  }
}

function isAllowedOrigin(value: string | null) {
  const origin = normalizeOrigin(value);

  if (!origin) {
    return false;
  }

  if (isDevelopmentLocalOrigin(origin)) {
    return true;
  }

  return getAllowedOrigins().has(origin);
}

function isAllowedRequestSource(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin) {
    return isAllowedOrigin(origin);
  }

  const referer = request.headers.get("referer");

  if (referer) {
    return isAllowedOrigin(referer);
  }

  return process.env.NODE_ENV !== "production";
}

function logGuardRejection(request: NextRequest, status: number, reason: string, contentLength?: number | null) {
  console.warn("Lead request rejected", {
    event: "lead_request_rejected",
    status,
    reason,
    hasOrigin: Boolean(request.headers.get("origin")),
    hasReferer: Boolean(request.headers.get("referer")),
    contentLength: contentLength ?? null,
    ipKey: maskIpKey(getRequestIp(request)),
  });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  const contentLength = getContentLength(request);

  if (!isJsonContentType(request)) {
    logGuardRejection(request, 415, "unsupported_content_type", contentLength);
    return jsonGuardError("unsupported_media_type", 415);
  }

  if (contentLength !== null && contentLength > maxLeadBodyBytes) {
    logGuardRejection(request, 413, "content_length_too_large", contentLength);
    return jsonGuardError("body_too_large", 413);
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      {
        success: false,
        code: "validation_error",
        message: "Не удалось прочитать данные формы.",
      },
      { status: 400 }
    );
  }

  const actualBodyBytes = getUtf8ByteLength(rawBody);

  if (actualBodyBytes > maxLeadBodyBytes) {
    logGuardRejection(request, 413, "body_too_large", actualBodyBytes);
    return jsonGuardError("body_too_large", 413);
  }

  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      {
        success: false,
        code: "validation_error",
        message: "Не удалось прочитать данные формы.",
      },
      { status: 400 }
    );
  }

  if (!isAllowedRequestSource(request)) {
    logGuardRejection(request, 403, "disallowed_origin_or_referer", contentLength ?? actualBodyBytes);
    return jsonGuardError("forbidden", 403);
  }

  const result = await submitLead(body, {
    ip: getRequestIp(request),
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  if (result.success) {
    return NextResponse.json(result);
  }

  const statusByCode: Record<typeof result.code, number> = {
    validation_error: 400,
    spam: 400,
    rate_limited: 429,
    save_failed: 500,
    unexpected_error: 500,
  };

  return NextResponse.json(result, { status: statusByCode[result.code] });
}
