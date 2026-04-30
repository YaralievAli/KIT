"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { imageMap } from "@/content/images-map";
import { contactFormSchema } from "@/lib/form-schemas";
import { cn } from "@/lib/helpers";
import { collectLeadClientMeta, sendLead } from "@/lib/lead-client";

const layoutOptions = [
  {
    value: "Угловая",
    image: "/images/layouts/layout-corner-kitchen.png",
    alt: "Угловая кухня для предварительного расчёта",
  },
  {
    value: "Прямая",
    image: "/images/layouts/layout-straight-kitchen.png",
    alt: "Прямая кухня для предварительного расчёта",
  },
  {
    value: "П-образная",
    image: "/images/layouts/fallback.svg",
    alt: "Схема П-образной кухни для предварительного расчёта",
  },
  {
    value: "С островом",
    image: "/images/layouts/layout-island-kitchen.png",
    alt: "Кухня с островом для предварительного расчёта",
  },
] as const;

const materialOptions = ["МДФ", "Пластик", "ЛДСП", "Эмаль", "Нужна консультация"];
const budgetOptions = ["До 250 тыс.", "250-400 тыс.", "400-700 тыс.", "От 700 тыс.", "Пока не понимаю"];
const previewFields: Array<keyof PreviewDarkCalculatorValues> = ["layout", "material", "budget"];

const previewDarkCalculatorSchema = contactFormSchema.extend({
  layout: z.enum(["Угловая", "Прямая", "П-образная", "С островом"], {
    error: "Выберите планировку",
  }),
  wallA: z.string().trim().max(20, "Слишком длинное значение").optional(),
  wallB: z.string().trim().max(20, "Слишком длинное значение").optional(),
  material: z.string().trim().min(1, "Выберите материал фасадов"),
  budget: z.string().trim().min(1, "Выберите бюджет"),
});

type PreviewDarkCalculatorValues = z.infer<typeof previewDarkCalculatorSchema>;

const defaultValues: PreviewDarkCalculatorValues = {
  layout: "Угловая",
  wallA: "",
  wallB: "",
  material: "",
  budget: "",
  name: "",
  phone: "",
  communicationMethod: "whatsapp",
  comment: "",
  consent: false,
  honeypot: "",
};

export function PreviewDarkCalculator() {
  const [showContacts, setShowContacts] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Не удалось отправить заявку. Попробуйте ещё раз или напишите в WhatsApp.");
  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    reset,
    formState: { errors },
  } = useForm<PreviewDarkCalculatorValues>({
    resolver: zodResolver(previewDarkCalculatorSchema),
    defaultValues,
    mode: "onBlur",
  });
  const selectedLayoutValue = useWatch({ control, name: "layout" });
  const selectedLayout = layoutOptions.find((item) => item.value === selectedLayoutValue) ?? layoutOptions[0];

  async function openContactStep() {
    const isValid = await trigger(previewFields);
    if (isValid) {
      setShowContacts(true);
      setStatus("idle");
    }
  }

  async function onSubmit(values: PreviewDarkCalculatorValues) {
    setStatus("loading");
    setErrorMessage("Не удалось отправить заявку. Попробуйте ещё раз или напишите в WhatsApp.");

    try {
      await sendLead({
        name: values.name,
        phone: values.phone,
        communicationMethod: values.communicationMethod,
        comment: values.comment,
        consent: values.consent,
        honeypot: values.honeypot,
        sourcePage: "preview-dark-calculator",
        quizAnswers: [
          { step: 1, question: "Тип планировки", value: values.layout, label: values.layout },
          {
            step: 2,
            question: "Размеры кухни",
            value: `Стена 1: ${values.wallA || "не указано"}; Стена 2: ${values.wallB || "не указано"}`,
            label: `Стена 1: ${values.wallA || "не указано"}, стена 2: ${values.wallB || "не указано"}`,
          },
          { step: 3, question: "Материал фасадов", value: values.material, label: values.material },
          { step: 4, question: "Бюджет", value: values.budget, label: values.budget },
        ],
        ...collectLeadClientMeta(),
      });
      setStatus("success");
      setShowContacts(false);
      reset(defaultValues);
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      }
      setStatus("error");
    }
  }

  return (
    <form
      className="overflow-hidden rounded-[28px] bg-[#062e30] p-6 text-white shadow-[0_22px_60px_rgba(6,46,48,0.22)] md:p-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" {...register("layout")} />
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("honeypot")} />
      <div className="grid gap-7 lg:grid-cols-[1fr_310px] xl:grid-cols-[1fr_330px]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Рассчитайте стоимость кухни</h2>
          <div className="mt-7 grid gap-5">
            <CalculatorRow number="1" label="Тип планировки" error={errors.layout?.message}>
              {layoutOptions.map((item) => {
                const isActive = item.value === selectedLayout.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    className={cn(
                      "inline-flex min-h-11 items-center justify-center rounded-xl border px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
                      isActive
                        ? "border-champagne bg-teal text-white shadow-glow"
                        : "border-white/12 bg-white/12 text-white/76 hover:border-teal hover:text-white"
                    )}
                    aria-pressed={isActive}
                    onClick={() => {
                      setValue("layout", item.value, { shouldDirty: true, shouldValidate: true });
                      setStatus("idle");
                    }}
                  >
                    {item.value}
                  </button>
                );
              })}
            </CalculatorRow>

            <CalculatorRow number="2" label="Размеры кухни">
              <label className="grid min-w-[180px] flex-1 gap-2 text-sm font-semibold text-white/82">
                Стена 1 (см)
                <input className="v2-calc-input" placeholder="Например, 300" inputMode="numeric" {...register("wallA")} />
              </label>
              <label className="grid min-w-[180px] flex-1 gap-2 text-sm font-semibold text-white/82">
                Стена 2 (см)
                <input className="v2-calc-input" placeholder="Например, 240" inputMode="numeric" {...register("wallB")} />
              </label>
            </CalculatorRow>

            <CalculatorRow number="3" label="Материал фасадов" error={errors.material?.message}>
              <select className="v2-calc-input w-full" {...register("material")}>
                <option value="">Выберите материал</option>
                {materialOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </CalculatorRow>

            <CalculatorRow number="4" label="Бюджет" error={errors.budget?.message}>
              <select className="v2-calc-input w-full" {...register("budget")}>
                <option value="">Выберите бюджет</option>
                {budgetOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </CalculatorRow>
          </div>

          {showContacts ? (
            <div className="mt-6 rounded-2xl border border-white/12 bg-black/16 p-4">
              <p className="text-sm font-semibold text-teal-glow">Куда отправить подборку?</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <DarkField label="Ваше имя" error={errors.name?.message}>
                  <input className="v2-calc-input" placeholder="Например, Анна" autoComplete="name" {...register("name")} />
                </DarkField>
                <DarkField label="Телефон" error={errors.phone?.message}>
                  <input className="v2-calc-input" placeholder="+7 (___) ___-__-__" autoComplete="tel" {...register("phone")} />
                </DarkField>
                <DarkField label="Способ связи" error={errors.communicationMethod?.message}>
                  <select className="v2-calc-input" {...register("communicationMethod")}>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="call">Звонок</option>
                    <option value="telegram">Telegram</option>
                  </select>
                </DarkField>
                <DarkField label="Комментарий">
                  <input className="v2-calc-input" placeholder="Что важно учесть" {...register("comment")} />
                </DarkField>
              </div>
              <label className="mt-4 flex items-start gap-3 text-xs leading-5 text-white/65">
                <input className="mt-1 h-4 w-4 rounded border-white/25 bg-white/10 text-teal focus:ring-teal" type="checkbox" {...register("consent")} />
                <span>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</span>
              </label>
              {errors.consent?.message ? <p className="mt-2 text-xs text-red-200">{errors.consent.message}</p> : null}
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {showContacts ? (
              <button className="v2-primary min-w-56" disabled={status === "loading"} type="submit">
                <Send size={18} aria-hidden="true" />
                {status === "loading" ? "Отправляем..." : "Получить расчёт"}
              </button>
            ) : (
              <button className="v2-primary min-w-56" type="button" onClick={openContactStep}>
                Получить расчёт
              </button>
            )}
            <p className="text-xs leading-5 text-white/60">Это предварительный расчёт. Точная стоимость зависит от замера, материалов и проекта.</p>
          </div>

          {status === "success" ? (
            <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
              Спасибо! Мы получили заявку. Дизайнер свяжется с вами в рабочее время.
            </p>
          ) : null}
          {status === "error" ? <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{errorMessage}</p> : null}
        </div>

        <aside className="relative overflow-hidden rounded-[24px] border border-champagne/24 bg-black/16 p-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/6">
            <Image
              key={selectedLayout.image}
              src={selectedLayout.image}
              alt={selectedLayout.alt}
              fill
              sizes="(max-width: 1024px) 80vw, 330px"
              loading="lazy"
              className={cn(
                "transition duration-300",
                selectedLayout.value === "П-образная" ? "object-contain p-8 opacity-55" : "object-cover opacity-72"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062e30]/80 via-transparent to-transparent" />
          </div>
          <div className="mt-5 rounded-2xl border border-champagne/24 bg-[#061112]/44 p-4">
            <p className="text-sm font-semibold text-white">Предварительный ориентир</p>
            <p className="mt-2 text-2xl font-semibold text-champagne">{selectedLayout.value.toLowerCase()}</p>
            <p className="mt-3 text-sm leading-6 text-white/68">После выбора параметров подготовим ориентировочный диапазон и рекомендации.</p>
          </div>
        </aside>
      </div>
    </form>
  );
}

function CalculatorRow({
  number,
  label,
  error,
  children,
}: {
  number: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-[34px_155px_1fr] lg:items-start">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-champagne text-sm font-semibold text-champagne">{number}</span>
      <span className="pt-2 text-sm font-semibold text-white/84">{label}</span>
      <div>
        <div className="flex flex-wrap gap-3">{children}</div>
        {error ? <p className="mt-2 text-xs text-red-200">{error}</p> : null}
      </div>
    </div>
  );
}

function DarkField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-white/82">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs font-normal text-red-200">{error}</span> : null}
    </label>
  );
}
