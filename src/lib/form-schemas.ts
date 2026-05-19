import { z } from "zod";
import { isValidRussianPhone, normalizeRussianPhone } from "@/lib/phone";

export const communicationMethods = ["phone", "whatsapp", "telegram", "vk", "max"] as const;
export const legacyCommunicationMethods = ["call"] as const;
export const acceptedCommunicationMethods = [...communicationMethods, ...legacyCommunicationMethods] as const;
export const phoneLikeCommunicationMethods = ["phone", "whatsapp"] as const;

export type CommunicationMethod = (typeof communicationMethods)[number];
export type AcceptedCommunicationMethod = (typeof acceptedCommunicationMethods)[number];

export type ContactFieldConfig = {
  optionLabel: string;
  label: string;
  placeholder: string;
  inputKind: "phone" | "text";
  autoComplete: string;
};

const contactFieldConfigs: Record<CommunicationMethod, ContactFieldConfig> = {
  phone: {
    optionLabel: "Телефон",
    label: "Телефон",
    placeholder: "+7 (___) ___-__-__",
    inputKind: "phone",
    autoComplete: "tel",
  },
  whatsapp: {
    optionLabel: "WhatsApp",
    label: "Телефон для WhatsApp",
    placeholder: "+7 (___) ___-__-__",
    inputKind: "phone",
    autoComplete: "tel",
  },
  telegram: {
    optionLabel: "Telegram",
    label: "Telegram",
    placeholder: "@username",
    inputKind: "text",
    autoComplete: "username",
  },
  vk: {
    optionLabel: "ВКонтакте",
    label: "ВКонтакте",
    placeholder: "Ссылка на профиль или @username",
    inputKind: "text",
    autoComplete: "url",
  },
  max: {
    optionLabel: "MAX",
    label: "MAX",
    placeholder: "Логин или ссылка",
    inputKind: "text",
    autoComplete: "username",
  },
};

export function normalizeCommunicationMethod(method: AcceptedCommunicationMethod): CommunicationMethod {
  return method === "call" ? "phone" : method;
}

export function isPhoneLikeCommunicationMethod(method: AcceptedCommunicationMethod) {
  const normalizedMethod = normalizeCommunicationMethod(method);

  return normalizedMethod === "phone" || normalizedMethod === "whatsapp";
}

export function getContactFieldConfig(method: AcceptedCommunicationMethod): ContactFieldConfig {
  return contactFieldConfigs[normalizeCommunicationMethod(method)];
}

export function normalizeLeadContactValue(method: AcceptedCommunicationMethod, value: string) {
  const trimmedValue = value.trim();
  if (!isPhoneLikeCommunicationMethod(method)) {
    return trimmedValue;
  }

  return normalizeRussianPhone(trimmedValue) ?? trimmedValue;
}

function validateContactValue(
  value: { phone: string; communicationMethod: AcceptedCommunicationMethod },
  context: z.RefinementCtx
) {
  const method = normalizeCommunicationMethod(value.communicationMethod);
  const contactValue = value.phone.trim();
  const fieldConfig = getContactFieldConfig(method);

  if (!contactValue) {
    context.addIssue({
      code: "custom",
      path: ["phone"],
      message: method === "whatsapp" ? "Введите телефон для WhatsApp" : `Укажите ${fieldConfig.label}`,
    });
    return;
  }

  if (contactValue.length > 80) {
    context.addIssue({
      code: "custom",
      path: ["phone"],
      message: "Контакт слишком длинный",
    });
    return;
  }

  if (isPhoneLikeCommunicationMethod(method) && !isValidRussianPhone(contactValue)) {
    context.addIssue({
      code: "custom",
      path: ["phone"],
      message: "Введите корректный номер телефона",
    });
  }
}

const contactFormBaseSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя"),
  phone: z.string().trim().max(80, "Контакт слишком длинный"),
  communicationMethod: z.enum(communicationMethods, { error: "Выберите способ связи" }),
  comment: z.string().trim().max(500, "Комментарий слишком длинный").optional(),
  consent: z.boolean().refine((value) => value === true, "Необходимо согласие на обработку персональных данных"),
  honeypot: z.string().max(0, "Заявка не прошла антиспам-проверку").optional().or(z.literal("")),
});

export const contactFormSchema = contactFormBaseSchema.superRefine(validateContactValue);

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const quizLeadSchema = contactFormBaseSchema.extend({
  task: z.string().min(1, "Выберите задачу"),
  layout: z.string().min(1, "Выберите планировку"),
  style: z.string().min(1, "Выберите стиль"),
  budget: z.string().min(1, "Выберите бюджет"),
  selectedProjectId: z.string().optional(),
}).superRefine(validateContactValue);

export type QuizLeadValues = z.infer<typeof quizLeadSchema>;
