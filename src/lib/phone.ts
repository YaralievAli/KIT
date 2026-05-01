export const RUSSIAN_PHONE_MASK_LENGTH = "+7 (999) 999-99-99".length;

export function extractRussianSubscriberDigits(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  const trimmed = raw.trim();
  const startsWithExplicitSeven = trimmed.startsWith("+") && digits.startsWith("7");
  const hasNationalPrefix = digits.length > 10 && (digits.startsWith("7") || digits.startsWith("8"));
  const subscriberDigits = startsWithExplicitSeven || hasNationalPrefix ? digits.slice(1) : digits;

  return subscriberDigits.slice(0, 10);
}

export function formatRussianPhoneInput(raw: string) {
  const subscriberDigits = extractRussianSubscriberDigits(raw);
  if (!subscriberDigits) return "";

  const first = subscriberDigits.slice(0, 3);
  const second = subscriberDigits.slice(3, 6);
  const third = subscriberDigits.slice(6, 8);
  const fourth = subscriberDigits.slice(8, 10);

  let formatted = `+7 (${first}`;

  if (subscriberDigits.length >= 3) {
    formatted += ")";
  }

  if (second) {
    formatted += ` ${second}`;
  }

  if (third) {
    formatted += `-${third}`;
  }

  if (fourth) {
    formatted += `-${fourth}`;
  }

  return formatted;
}

export function normalizeRussianPhone(raw: string) {
  const subscriberDigits = extractRussianSubscriberDigits(raw);

  if (subscriberDigits.length !== 10) {
    return null;
  }

  return `+7${subscriberDigits}`;
}

export function isValidRussianPhone(raw: string) {
  return normalizeRussianPhone(raw) !== null;
}
