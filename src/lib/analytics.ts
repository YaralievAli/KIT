const analyticsEventNames = [
  "hero_calculate_click",
  "hero_catalog_click",
  "header_callback_click",
  "mobile_sticky_cta_click",
  "phone_click",
  "social_click",
  "review_source_click",
  "calculator_start",
  "calculator_step_next",
  "calculator_contact_open",
  "lead_submit_attempt",
  "lead_submit_success",
  "lead_submit_error",
] as const;

const communicationMethods = ["phone", "whatsapp", "telegram", "vk", "max"] as const;
const socialChannels = ["vk", "telegram", "max", "whatsapp"] as const;
const reviewSources = ["yandex", "2gis", "vk"] as const;
const leadSources = ["homepage-calculator", "homepage-final-cta", "quiz"] as const;
const safeErrorCodes = [
  "validation_error",
  "spam",
  "rate_limited",
  "save_failed",
  "unexpected_error",
  "unsupported_media_type",
  "body_too_large",
  "forbidden",
  "network_error",
  "unknown_error",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];
export type AnalyticsCommunicationMethod = (typeof communicationMethods)[number];
export type AnalyticsSocialChannel = (typeof socialChannels)[number];
export type AnalyticsReviewSource = (typeof reviewSources)[number];
export type AnalyticsLeadSource = (typeof leadSources)[number];
export type AnalyticsErrorCode = (typeof safeErrorCodes)[number];

export type AnalyticsEventParams = {
  sourcePage?: AnalyticsLeadSource;
  sourceForm?: AnalyticsLeadSource;
  communicationMethod?: AnalyticsCommunicationMethod;
  calculatorStep?: number;
  socialChannel?: AnalyticsSocialChannel;
  reviewSource?: AnalyticsReviewSource;
  errorCode?: AnalyticsErrorCode;
};

type SafeAnalyticsParams = Record<string, string | number>;

type MetrikaInitOptions = {
  accurateTrackBounce: boolean;
  clickmap: boolean;
  trackLinks: boolean;
};

type YandexMetrikaFunction = {
  (counterId: number, method: "init", options: MetrikaInitOptions): void;
  (counterId: number, method: "reachGoal", target: AnalyticsEventName, params?: SafeAnalyticsParams): void;
};

declare global {
  interface Window {
    ym?: YandexMetrikaFunction;
  }
}

export function getYandexMetrikaId(value = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) {
  const trimmed = value?.trim();

  return trimmed && /^\d+$/.test(trimmed) ? trimmed : null;
}

export function trackAnalyticsEvent(eventName: AnalyticsEventName, params?: AnalyticsEventParams) {
  if (typeof window === "undefined") return;

  const counterId = getYandexMetrikaId();
  if (!counterId || typeof window.ym !== "function") return;

  const safeParams = sanitizeAnalyticsParams(params);
  window.ym(Number(counterId), "reachGoal", eventName, Object.keys(safeParams).length ? safeParams : undefined);
}

function sanitizeAnalyticsParams(params?: AnalyticsEventParams) {
  const safeParams: SafeAnalyticsParams = {};

  if (!params) return safeParams;
  if (isLeadSource(params.sourcePage)) safeParams.sourcePage = params.sourcePage;
  if (isLeadSource(params.sourceForm)) safeParams.sourceForm = params.sourceForm;
  if (isCommunicationMethod(params.communicationMethod)) safeParams.communicationMethod = params.communicationMethod;
  if (isSafeStep(params.calculatorStep)) safeParams.calculatorStep = params.calculatorStep;
  if (isSocialChannel(params.socialChannel)) safeParams.socialChannel = params.socialChannel;
  if (isReviewSource(params.reviewSource)) safeParams.reviewSource = params.reviewSource;
  if (isSafeErrorCode(params.errorCode)) safeParams.errorCode = params.errorCode;

  return safeParams;
}

function isCommunicationMethod(value: unknown): value is AnalyticsCommunicationMethod {
  return typeof value === "string" && communicationMethods.includes(value as AnalyticsCommunicationMethod);
}

function isSocialChannel(value: unknown): value is AnalyticsSocialChannel {
  return typeof value === "string" && socialChannels.includes(value as AnalyticsSocialChannel);
}

function isReviewSource(value: unknown): value is AnalyticsReviewSource {
  return typeof value === "string" && reviewSources.includes(value as AnalyticsReviewSource);
}

function isLeadSource(value: unknown): value is AnalyticsLeadSource {
  return typeof value === "string" && leadSources.includes(value as AnalyticsLeadSource);
}

function isSafeErrorCode(value: unknown): value is AnalyticsErrorCode {
  return typeof value === "string" && safeErrorCodes.includes(value as AnalyticsErrorCode);
}

function isSafeStep(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 10;
}
