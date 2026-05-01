"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";
import { PhoneInput } from "@/components/forms/PhoneInput";
import type { Control, FieldErrors, FieldPath, UseFormRegister } from "react-hook-form";

type BaseForm = {
  name: string;
  phone: string;
  communicationMethod: "whatsapp" | "call" | "telegram";
  comment?: string;
  consent: boolean;
  honeypot?: string;
};

export function ContactFields<T extends BaseForm>({
  control,
  register,
  errors,
  idPrefix = "lead-form",
}: {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  idPrefix?: string;
}) {
  return (
    <div className="grid gap-4">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("honeypot" as never)} />
      <Field label="Ваше имя" error={errors.name?.message as string | undefined}>
        <input
          className="form-input"
          placeholder="Например, Анна"
          autoComplete="name"
          {...register("name" as never)}
        />
      </Field>
      <Field label="Телефон" error={errors.phone?.message as string | undefined}>
        <Controller
          control={control}
          name={"phone" as FieldPath<T>}
          render={({ field }) => (
            <PhoneInput
              ref={field.ref}
              id={`${idPrefix}-phone`}
              name={field.name}
              className="form-input"
              placeholder="+7 (___) ___-__-__"
              value={(field.value as string | undefined) ?? ""}
              onBlur={field.onBlur}
              onChange={field.onChange}
            />
          )}
        />
      </Field>
      <Field label="Способ связи" error={errors.communicationMethod?.message as string | undefined}>
        <select className="form-input" {...register("communicationMethod" as never)}>
          <option value="">Выберите способ</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="call">Звонок</option>
          <option value="telegram">Telegram</option>
        </select>
      </Field>
      <Field label="Комментарий" error={errors.comment?.message as string | undefined}>
        <textarea className="form-input min-h-28 resize-y" placeholder="Расскажите, что важно учесть" {...register("comment" as never)} />
      </Field>
      <ConsentCheckbox id={`${idPrefix}-consent`} register={register} error={errors.consent?.message as string | undefined} />
    </div>
  );
}

export function ConsentCheckbox<T extends Pick<BaseForm, "consent">>({
  id,
  register,
  error,
  dark = false,
}: {
  id: string;
  register: UseFormRegister<T>;
  error?: string;
  dark?: boolean;
}) {
  const textClass = dark ? "text-white/65" : "text-muted";
  const linkClass = dark
    ? "font-semibold text-teal-glow underline underline-offset-4 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
    : "font-semibold text-teal underline underline-offset-4 transition hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

  return (
    <div>
      <div className={`flex items-start gap-3 text-sm leading-6 ${textClass}`}>
        <input
          id={id}
          className={dark ? "mt-1 h-4 w-4 rounded border-white/25 bg-white/10 text-teal focus:ring-teal" : "mt-1 h-4 w-4 rounded border-border text-teal focus:ring-teal"}
          type="checkbox"
          aria-describedby={`${id}-text`}
          {...register("consent" as never)}
        />
        <p id={`${id}-text`}>
          <label htmlFor={id} className="cursor-pointer">
            Я соглашаюсь на{" "}
          </label>
          <Link className={linkClass} href="/personal-data-consent">
            обработку персональных данных
          </Link>{" "}
          и ознакомлен с{" "}
          <Link className={linkClass} href="/privacy">
            Политикой конфиденциальности
          </Link>
          .
        </p>
      </div>
      {error ? <p className={dark ? "mt-2 text-xs text-red-200" : "-mt-2 text-sm text-red-600"}>{error}</p> : null}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-navy">
      <span>{label}</span>
      {children}
      {error ? <span className="text-sm font-normal text-red-600">{error}</span> : null}
    </label>
  );
}
