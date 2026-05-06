"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator, ChevronUp, Send } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { ConsentCheckbox } from "@/components/ui/FormFields";
import { imageMap } from "@/content/images-map";
import { contactFormSchema } from "@/lib/form-schemas";
import { cn } from "@/lib/helpers";
import { collectLeadClientMeta, sendLead } from "@/lib/lead-client";
import { normalizeRussianPhone } from "@/lib/phone";
import { redirectToThankYou } from "@/lib/thank-you-summary";

const calculatorLayoutImages = imageMap.previewDark.calculatorLayouts;

const layoutOptions = [
  {
    value: "Угловая",
    image: calculatorLayoutImages.corner.image,
    alt: calculatorLayoutImages.corner.alt,
  },
  {
    value: "Прямая",
    image: calculatorLayoutImages.straight.image,
    alt: calculatorLayoutImages.straight.alt,
  },
  {
    value: "П-образная",
    image: calculatorLayoutImages.uShaped.image,
    alt: calculatorLayoutImages.uShaped.alt,
  },
  {
    value: "С островом",
    image: calculatorLayoutImages.island.image,
    alt: calculatorLayoutImages.island.alt,
  },
] as const;

const materialOptions = ["МДФ", "Пластик", "ЛДСП", "Эмаль", "Нужна консультация"];
const budgetOptions = ["До 250 тыс.", "250-400 тыс.", "400-700 тыс.", "От 700 тыс.", "Пока не понимаю"];
const previewFields: Array<keyof PreviewDarkCalculatorValues> = ["layout", "material", "budget"];
const calculatorContentId = "homepage-calculator-content";
const calculatorSubmitButtonClass =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(13,148,136,0.28)] transition hover:bg-teal-glow active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-56 sm:px-6";

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
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Не удалось отправить заявку. Попробуйте ещё раз или напишите в WhatsApp.");
  const focusTargetRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm<PreviewDarkCalculatorValues>({
    resolver: zodResolver(previewDarkCalculatorSchema),
    defaultValues,
    mode: "onBlur",
  });
  const selectedLayoutValue = useWatch({ control, name: "layout" });
  const selectedLayout = layoutOptions.find((item) => item.value === selectedLayoutValue) ?? layoutOptions[0];

  const openMobileCalculator = useCallback((options?: { updateHash?: boolean; scroll?: boolean }) => {
    setIsExpandedMobile(true);

    window.requestAnimationFrame(() => {
      if (options?.updateHash && window.location.hash !== "#quiz") {
        window.history.pushState(null, "", "#quiz");
      }

      if (options?.scroll) {
        const quizTarget = document.getElementById("quiz");
        if (quizTarget) {
          const top = quizTarget.getBoundingClientRect().top + window.scrollY - 88;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
      }

      window.requestAnimationFrame(() => {
        focusTargetRef.current?.focus({ preventScroll: true });
      });
    });
  }, []);

  useEffect(() => {
    function handleQuizAnchorClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        !window.matchMedia("(max-width: 1023px)").matches
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest("input, select, textarea, button, [role='button']")) {
        return;
      }

      const link = target.closest('a[href="#quiz"]');
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      event.preventDefault();
      openMobileCalculator({ updateHash: true, scroll: true });
    }

    document.addEventListener("click", handleQuizAnchorClick);
    return () => {
      document.removeEventListener("click", handleQuizAnchorClick);
    };
  }, [openMobileCalculator]);

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
        phone: normalizeRussianPhone(values.phone) ?? values.phone,
        communicationMethod: values.communicationMethod,
        comment: values.comment,
        consent: values.consent,
        honeypot: values.honeypot,
        sourcePage: "homepage-calculator",
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
      redirectToThankYou({
        layout: values.layout,
        budget: values.budget,
        sourceForm: "homepage-calculator",
      });
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      }
      setStatus("error");
    }
  }

  return (
    <>
      <div className={cn("lg:hidden", isExpandedMobile ? "hidden" : "block")}>
        <div className="overflow-hidden rounded-[22px] border border-[#14B8A6]/[0.12] bg-[linear-gradient(135deg,#062e30_0%,#061b1e_100%)] p-4 text-white shadow-[0_16px_44px_rgba(6,46,48,0.18)]">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] text-teal-glow">
              <Calculator size={22} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-glow">Предварительный расчёт</p>
              <h2 className="mt-1 text-2xl font-semibold leading-tight">Рассчитайте стоимость кухни</h2>
              <p className="mt-2 text-sm leading-6 text-white/72">Ответьте на 5 вопросов и получите предварительный расчёт.</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_104px] gap-3 rounded-2xl bg-[#061112]/48 p-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/46">1 минута</p>
              <p className="mt-1 text-sm font-semibold leading-tight text-white">Планировка, материалы и бюджет</p>
              <p className="mt-1 text-xs leading-5 text-white/62">Контакты понадобятся только в конце.</p>
            </div>
            <div className="relative min-h-[82px] overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_45%,rgba(20,184,166,0.14),rgba(255,255,255,0.03)_62%,rgba(0,0,0,0.24)_100%)]">
              <Image
                src={selectedLayout.image}
                alt=""
                fill
                sizes="112px"
                loading="lazy"
                aria-hidden="true"
                className="object-contain p-2 opacity-85"
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(13,148,136,0.26)] transition hover:bg-teal-glow active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow"
            aria-expanded={isExpandedMobile}
            aria-controls={calculatorContentId}
            onClick={() => openMobileCalculator({ updateHash: true, scroll: true })}
          >
            Открыть калькулятор
            <Send size={17} aria-hidden="true" />
          </button>
        </div>
      </div>

    <form
      id={calculatorContentId}
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-[22px] border border-[#14B8A6]/[0.12] bg-[linear-gradient(135deg,#062e30_0%,#061b1e_100%)] p-3.5 text-white shadow-[0_18px_48px_rgba(6,46,48,0.2)] md:rounded-[28px] md:p-5 lg:block",
        isExpandedMobile ? "block" : "hidden"
      )}
      aria-labelledby="homepage-calculator-heading"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" {...register("layout")} />
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("honeypot")} />
      <div className="grid min-w-0 gap-4 md:gap-5 lg:grid-cols-[minmax(0,1fr)_250px] 2xl:grid-cols-[minmax(0,1fr)_270px]">
        <div className="min-w-0">
          <div
            id="homepage-calculator-focus"
            ref={focusTargetRef}
            tabIndex={-1}
            className="outline-none focus-visible:rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-glow"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-teal-glow">Калькулятор</p>
                <h2 id="homepage-calculator-heading" className="mt-1 text-2xl font-semibold leading-tight md:text-[32px]">
                  Рассчитайте стоимость кухни
                </h2>
              </div>
              <button
                type="button"
                className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-white/14 bg-white/[0.08] px-3 text-xs font-semibold text-white/78 transition hover:bg-white/[0.12] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow lg:hidden"
                aria-expanded={isExpandedMobile}
                aria-controls={calculatorContentId}
                onClick={() => setIsExpandedMobile(false)}
              >
                <ChevronUp size={15} aria-hidden="true" />
                Свернуть
              </button>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:mt-5 md:gap-3.5">
            <CalculatorRow number="1" label="Тип планировки" error={errors.layout?.message} contentClassName="grid grid-cols-2 gap-2 xl:grid-cols-4">
              {layoutOptions.map((item) => {
                const isActive = item.value === selectedLayout.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    className={cn(
                      "inline-flex min-h-[50px] items-center justify-center rounded-xl border px-2 text-center text-sm font-semibold leading-tight transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6] lg:min-h-[46px]",
                      isActive
                        ? "border-[#C8A96E]/[0.36] bg-teal text-white shadow-[0_0_18px_rgba(20,184,166,0.12)]"
                        : "border-[#14B8A6]/[0.14] bg-white/[0.06] text-white/80 hover:border-[#C8A96E]/[0.28] hover:bg-white/[0.1] hover:text-white"
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

            <CalculatorRow number="2" label="Размеры кухни" contentClassName="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-white/82">
                Стена 1 (см)
                <input className="v2-calc-input" placeholder="Например, 300" inputMode="numeric" {...register("wallA")} />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-white/82">
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
            <div className="mt-4 rounded-2xl border border-[#14B8A6]/[0.12] bg-black/14 p-3 md:mt-6 md:p-4">
              <p className="text-sm font-semibold text-teal-glow">Куда отправить подборку?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 md:mt-4">
                <DarkField label="Ваше имя" error={errors.name?.message}>
                  <input className="v2-calc-input" placeholder="Например, Анна" autoComplete="name" {...register("name")} />
                </DarkField>
                <DarkField label="Телефон" error={errors.phone?.message}>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <PhoneInput
                        ref={field.ref}
                        name={field.name}
                        className="v2-calc-input"
                        placeholder="+7 (___) ___-__-__"
                        value={field.value ?? ""}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                      />
                    )}
                  />
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
              <div className="mt-4">
                <ConsentCheckbox id="preview-calculator-consent" register={register} error={errors.consent?.message} dark />
              </div>
            </div>
          ) : null}

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-5">
            {showContacts ? (
              <button className={calculatorSubmitButtonClass} disabled={status === "loading"} type="submit">
                <Send size={18} aria-hidden="true" />
                {status === "loading" ? "Отправляем..." : "Получить расчёт"}
              </button>
            ) : (
              <button className={calculatorSubmitButtonClass} type="button" onClick={openContactStep}>
                <Send size={18} aria-hidden="true" />
                Получить расчёт
              </button>
            )}
            <p className="max-w-md text-xs leading-5 text-white/60">Это предварительный расчёт. Точная стоимость зависит от замера, материалов и проекта.</p>
          </div>

          {status === "success" ? (
            <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
              Спасибо! Мы получили заявку. Дизайнер свяжется с вами в рабочее время.
            </p>
          ) : null}
          {status === "error" ? <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{errorMessage}</p> : null}
        </div>

        <aside className="relative min-w-0 overflow-hidden rounded-[18px] border border-[#14B8A6]/[0.12] bg-black/16 p-3 md:rounded-[24px] md:p-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_45%,rgba(20,184,166,0.12),rgba(255,255,255,0.03)_58%,rgba(0,0,0,0.22)_100%)] md:aspect-[4/3] md:border md:border-[#14B8A6]/[0.1]">
            <Image
              key={selectedLayout.image}
              src={selectedLayout.image}
              alt={selectedLayout.alt}
              fill
              sizes={calculatorLayoutImages.corner.sizes}
              loading="lazy"
              className="object-contain p-3 opacity-85 transition duration-300 md:p-4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062e30]/80 via-transparent to-transparent" />
          </div>
          <div className="mt-3 rounded-2xl bg-[#061112]/54 p-3 md:mt-4 md:border md:border-[#C8A96E]/[0.18] md:p-4">
            <p className="text-sm font-semibold text-white">Предварительный расчёт</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/48">{selectedLayout.value.toLowerCase()}</p>
            <p className="mt-2 text-xl font-semibold text-champagne md:mt-3 md:text-2xl">от 180 000 ₽</p>
            <p className="mt-2 text-xs leading-5 text-white/68 md:mt-3 md:text-sm md:leading-6">Точная стоимость после замера и разработки дизайн-проекта.</p>
          </div>
        </aside>
      </div>
    </form>
    </>
  );
}

function CalculatorRow({
  number,
  label,
  error,
  contentClassName,
  children,
}: {
  number: string;
  label: string;
  error?: string;
  contentClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-w-0 grid-cols-[30px_minmax(0,1fr)] gap-x-3 gap-y-2 lg:grid-cols-[32px_128px_minmax(0,1fr)] lg:items-start lg:gap-3 2xl:grid-cols-[32px_138px_minmax(0,1fr)]">
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-champagne/80 bg-[#061112]/48 text-xs font-semibold text-champagne lg:h-8 lg:w-8 lg:bg-transparent lg:text-sm">{number}</span>
      <span className="self-center text-[15px] font-semibold text-white/88 lg:self-auto lg:pt-2 lg:text-sm lg:text-white/84">{label}</span>
      <div className="col-span-2 min-w-0 lg:col-span-1">
        <div className={contentClassName ?? "flex flex-wrap gap-3"}>{children}</div>
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
