"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

type BaseForm = {
  name: string;
  phone: string;
  communicationMethod: "whatsapp" | "call" | "telegram";
  comment?: string;
  consent: boolean;
  honeypot?: string;
};

export function ContactFields<T extends BaseForm>({
  register,
  errors,
}: {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
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
        <input
          className="form-input"
          placeholder="+7 (___) ___-__-__"
          autoComplete="tel"
          {...register("phone" as never)}
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
      <label className="flex items-start gap-3 text-sm leading-6 text-muted">
        <input className="mt-1 h-4 w-4 rounded border-border text-teal focus:ring-teal" type="checkbox" {...register("consent" as never)} />
        <span>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</span>
      </label>
      {errors.consent?.message ? <p className="-mt-2 text-sm text-red-600">{errors.consent.message as string}</p> : null}
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
