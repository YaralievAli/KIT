"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormValues } from "@/lib/form-schemas";
import { collectLeadClientMeta, sendLead } from "@/lib/lead-client";
import { redirectToThankYou } from "@/lib/thank-you-summary";

const defaultValues: ContactFormValues = {
  name: "",
  phone: "",
  communicationMethod: "whatsapp",
  comment: "",
  consent: false,
  honeypot: "",
};

export function PreviewDarkFinalForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Не удалось отправить заявку. Попробуйте ещё раз или напишите в WhatsApp.");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("loading");
    setErrorMessage("Не удалось отправить заявку. Попробуйте ещё раз или напишите в WhatsApp.");

    try {
      await sendLead({
        ...values,
        sourcePage: "preview-dark-final-cta",
        ...collectLeadClientMeta(),
      });
      setStatus("success");
      redirectToThankYou({ sourceForm: "preview-dark-final-cta" });
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      }
      setStatus("error");
    }
  }

  return (
    <form className="rounded-[28px] bg-white p-5 text-navy shadow-[0_24px_70px_rgba(0,0,0,0.20)] md:p-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("honeypot")} />
      <div className="grid gap-4 md:grid-cols-2">
        <LightField label="Ваше имя" error={errors.name?.message}>
          <input className="form-input rounded-2xl" placeholder="Например, Анна" autoComplete="name" {...register("name")} />
        </LightField>
        <LightField label="Телефон" error={errors.phone?.message}>
          <input className="form-input rounded-2xl" placeholder="+7 (___) ___-__-__" autoComplete="tel" {...register("phone")} />
        </LightField>
        <LightField label="Способ связи" error={errors.communicationMethod?.message}>
          <select className="form-input rounded-2xl" {...register("communicationMethod")}>
            <option value="whatsapp">WhatsApp</option>
            <option value="call">Звонок</option>
            <option value="telegram">Telegram</option>
          </select>
        </LightField>
        <LightField label="Комментарий" error={errors.comment?.message}>
          <input className="form-input rounded-2xl" placeholder="Что важно учесть" {...register("comment")} />
        </LightField>
      </div>
      <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-muted">
        <input className="mt-1 h-4 w-4 rounded border-border text-teal focus:ring-teal" type="checkbox" {...register("consent")} />
        <span>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</span>
      </label>
      {errors.consent?.message ? <p className="mt-2 text-sm text-red-600">{errors.consent.message}</p> : null}
      <button className="btn-primary mt-5 w-full rounded-2xl" disabled={status === "loading"} type="submit">
        <Send size={18} aria-hidden="true" />
        {status === "loading" ? "Отправляем..." : "Получить расчёт"}
      </button>
      {status === "success" ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
          Спасибо! Мы получили заявку. Дизайнер свяжется с вами в рабочее время.
        </p>
      ) : null}
      {status === "error" ? <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{errorMessage}</p> : null}
    </form>
  );
}

function LightField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-navy">
      <span>{label}</span>
      {children}
      {error ? <span className="text-sm font-normal text-red-600">{error}</span> : null}
    </label>
  );
}
