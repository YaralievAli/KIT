"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactFields } from "@/components/ui/FormFields";
import { contactFormSchema, type ContactFormValues } from "@/lib/form-schemas";
import { collectLeadClientMeta, sendLead } from "@/lib/lead-client";
import { normalizeRussianPhone } from "@/lib/phone";
import { redirectToThankYou } from "@/lib/thank-you-summary";

type LeadFormProps = {
  sourcePage: string;
  buttonLabel?: string;
  compact?: boolean;
};

export function LeadForm({ sourcePage, buttonLabel = "Получить расчёт", compact = false }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Не удалось отправить заявку. Попробуйте ещё раз или напишите в WhatsApp.");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      communicationMethod: "whatsapp",
      comment: "",
      consent: false,
      honeypot: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("loading");
    setErrorMessage("Не удалось отправить заявку. Попробуйте ещё раз или напишите в WhatsApp.");

    try {
      await sendLead({
        ...values,
        phone: normalizeRussianPhone(values.phone) ?? values.phone,
        sourcePage,
        ...collectLeadClientMeta(),
      });
      setStatus("success");
      redirectToThankYou({ sourceForm: sourcePage });
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      }
      setStatus("error");
    }
  }

  return (
    <form className={compact ? "grid gap-4" : "rounded-3xl border border-border bg-white p-5 shadow-soft md:p-7"} onSubmit={handleSubmit(onSubmit)}>
      <ContactFields control={control} register={register} errors={errors} idPrefix={`lead-${sourcePage}`} />
      <button className="btn-primary mt-5 w-full" disabled={status === "loading"} type="submit">
        <Send size={18} aria-hidden="true" />
        {status === "loading" ? "Отправляем..." : buttonLabel}
      </button>
      {status === "success" ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
          Спасибо! Мы получили заявку. Дизайнер свяжется с вами в рабочее время.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
