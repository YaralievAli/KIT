import { z } from "zod";

export const communicationMethods = ["whatsapp", "call", "telegram"] as const;

const phoneRegex = /^[+0-9()[\]\-\s]{7,24}$/;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя"),
  phone: z.string().trim().regex(phoneRegex, "Укажите корректный телефон"),
  communicationMethod: z.enum(communicationMethods, { error: "Выберите способ связи" }),
  comment: z.string().trim().max(500, "Комментарий слишком длинный").optional(),
  consent: z.boolean().refine((value) => value === true, "Нужно согласие на обработку персональных данных"),
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
