import type { LeadPayload } from "@/types/content";
import { normalizeRussianPhone } from "@/lib/phone";

export type ClientLeadPayload = Omit<LeadPayload, "timestamp"> & {
  timestamp?: string;
};

type LeadApiSuccess = {
  success: true;
  leadId: string;
};

type LeadApiError = {
  success: false;
  message?: string;
};

export async function sendLead(payload: ClientLeadPayload): Promise<LeadApiSuccess> {
  const normalizedPhone = normalizeRussianPhone(payload.phone);

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      phone: normalizedPhone ?? payload.phone,
      timestamp: payload.timestamp ?? new Date().toISOString(),
    }),
  });

  const result = (await response.json()) as LeadApiSuccess | LeadApiError;

  if (!response.ok) {
    const message = result.success ? undefined : result.message;
    throw new Error(message ?? "Не удалось отправить заявку.");
  }

  if (!result.success) {
    throw new Error(result.message ?? "Не удалось отправить заявку.");
  }

  return result;
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
