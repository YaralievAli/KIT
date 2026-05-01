"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { ConsentCheckbox } from "@/components/ui/FormFields";
import { contactFormSchema, type ContactFormValues } from "@/lib/form-schemas";
import { collectLeadClientMeta, sendLead } from "@/lib/lead-client";
import { normalizeRussianPhone } from "@/lib/phone";
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
    control,
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
        phone: normalizeRussianPhone(values.phone) ?? values.phone,
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
    <form className="mx-auto max-w-[680px] rounded-[26px] bg-white p-4 text-navy shadow-[0_20px_58px_rgba(0,0,0,0.18)] md:p-5 lg:ml-auto lg:mr-0" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("honeypot")} />
      <div className="grid gap-3 md:grid-cols-2">
        <LightField label="Ваше имя" error={errors.name?.message}>
          <input className="form-input rounded-xl" placeholder="Например, Анна" autoComplete="name" {...register("name")} />
        </LightField>
        <LightField label="Телефон" error={errors.phone?.message}>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                ref={field.ref}
                name={field.name}
                className="form-input rounded-xl"
                placeholder="+7 (___) ___-__-__"
                value={field.value ?? ""}
                onBlur={field.onBlur}
                onChange={field.onChange}
              />
            )}
          />
        </LightField>
        <LightField label="Способ связи" error={errors.communicationMethod?.message}>
          <select className="form-input rounded-xl" {...register("communicationMethod")}>
            <option value="whatsapp">WhatsApp</option>
            <option value="call">Звонок</option>
            <option value="telegram">Telegram</option>
          </select>
        </LightField>
        <LightField label="Комментарий" error={errors.comment?.message}>
          <input className="form-input rounded-xl" placeholder="Что важно учесть" {...register("comment")} />
        </LightField>
      </div>
      <div className="mt-3">
        <ConsentCheckbox id="preview-final-consent" register={register} error={errors.consent?.message} />
      </div>
      <button className="btn-primary mt-4 w-full rounded-xl py-3.5" disabled={status === "loading"} type="submit">
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
