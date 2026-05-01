import { z } from "zod";
import { isValidRussianPhone } from "@/lib/phone";

export const communicationMethods = ["whatsapp", "call", "telegram"] as const;

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

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя"),
  phone: phoneSchema,
  communicationMethod: z.enum(communicationMethods, { error: "Выберите способ связи" }),
  comment: z.string().trim().max(500, "Комментарий слишком длинный").optional(),
  consent: z.boolean().refine((value) => value === true, "Необходимо согласие на обработку персональных данных"),
  honeypot: z.string().max(0, "Заявка не прошла антиспам-проверку").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const quizLeadSchema = contactFormSchema.extend({
  task: z.string().min(1, "Выберите задачу"),
  layout: z.string().min(1, "Выберите планировку"),
  style: z.string().min(1, "Выберите стиль"),
  budget: z.string().min(1, "Выберите бюджет"),
  selectedProjectId: z.string().optional(),
});

export type QuizLeadValues = z.infer<typeof quizLeadSchema>;
