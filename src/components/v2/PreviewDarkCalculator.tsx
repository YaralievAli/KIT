"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Calculator, ChevronUp, Send } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { ConsentCheckbox } from "@/components/ui/FormFields";
import { imageMap } from "@/content/images-map";
import { contactFormSchema } from "@/lib/form-schemas";
import { cn } from "@/lib/helpers";
import {
  calculateKitchenEstimate,
  validateKitchenCalculatorInput,
  type CountertopMaterial,
  type FacadeMaterial,
  type FittingsLevel,
  type KitchenCalculatorInput,
  type KitchenCalculatorResult,
  type KitchenLayout,
  type Range,
} from "@/lib/kitchen-calculator";
import { collectLeadClientMeta, sendLead } from "@/lib/lead-client";
import { normalizeRussianPhone } from "@/lib/phone";
import { redirectToThankYou } from "@/lib/thank-you-summary";

const calculatorLayoutImages = imageMap.previewDark.calculatorLayouts;

const layoutValues = ["straight", "corner", "uShape", "island"] as const;
const facadeMaterialValues = ["ldsp", "mdfFilm", "mdfEnamel", "hplPlastic", "veneerPremium"] as const;
const countertopMaterialValues = ["ldsp", "waterResistant", "compact", "acrylic", "quartz"] as const;
const fittingsLevelValues = ["basic", "standard", "premium"] as const;

const layoutOptions: Array<{
  value: KitchenLayout;
  label: string;
  image: string;
  alt: string;
}> = [
  {
    value: "straight",
    label: "Прямая",
    image: calculatorLayoutImages.straight.image,
    alt: calculatorLayoutImages.straight.alt,
  },
  {
    value: "corner",
    label: "Угловая",
    image: calculatorLayoutImages.corner.image,
    alt: calculatorLayoutImages.corner.alt,
  },
  {
    value: "uShape",
    label: "П-образная",
    image: calculatorLayoutImages.uShaped.image,
    alt: calculatorLayoutImages.uShaped.alt,
  },
  {
    value: "island",
    label: "С островом",
    image: calculatorLayoutImages.island.image,
    alt: calculatorLayoutImages.island.alt,
  },
];

const facadeOptions: Array<{ value: FacadeMaterial; label: string; description: string }> = [
  { value: "ldsp", label: "ЛДСП", description: "Практичный базовый вариант" },
  { value: "mdfFilm", label: "МДФ плёнка", description: "Популярный баланс цены и внешнего вида" },
  { value: "mdfEnamel", label: "МДФ эмаль", description: "Больше вариантов цвета и отделки" },
  { value: "hplPlastic", label: "Пластик / HPL", description: "Стойкое покрытие для активной кухни" },
  { value: "veneerPremium", label: "Шпон / премиум", description: "Сложные материалы и индивидуальная отделка" },
];

const countertopOptions: Array<{ value: CountertopMaterial; label: string; description: string }> = [
  { value: "ldsp", label: "ЛДСП / постформинг", description: "Практичная базовая столешница" },
  { value: "waterResistant", label: "Влагостойкая / улучшенная", description: "Более стойкое решение для ежедневной кухни" },
  { value: "compact", label: "Компакт-плита", description: "Тонкая и прочная современная столешница" },
  { value: "acrylic", label: "Акрил", description: "Бесшовные решения и сложные формы" },
  { value: "quartz", label: "Кварц", description: "Премиальный вид и высокая износостойкость" },
];

const fittingsLevelOptions: Array<{ value: FittingsLevel; label: string; description: string }> = [
  { value: "basic", label: "Базовая", description: "Надёжная комплектация без сложных механизмов" },
  { value: "standard", label: "Средняя", description: "Комфортный уровень для ежедневного использования" },
  { value: "premium", label: "Премиальная", description: "Больше механизмов, плавности и ресурса" },
];

const fittingsOptionFields = [
  { name: "softClose", label: "Доводчики" },
  { name: "extraDrawers", label: "Больше выдвижных ящиков" },
  { name: "cornerMechanism", label: "Угловой механизм" },
  { name: "liftMechanisms", label: "Подъёмные механизмы" },
  { name: "cargoBottleRack", label: "Бутылочница / карго" },
  { name: "worktopLighting", label: "Подсветка рабочей зоны" },
] as const;

const extraWorkFields = [
  { name: "toCeiling", label: "Шкафы до потолка" },
  { name: "dismantling", label: "Демонтаж старой кухни" },
  { name: "deliveryLift", label: "Доставка / подъём" },
  { name: "sinkCutout", label: "Врезка мойки" },
  { name: "cooktopCutout", label: "Врезка варочной панели" },
  { name: "complexInstallation", label: "Сложный монтаж" },
  { name: "nonStandardSizes", label: "Нестандартные размеры" },
] as const;

const budgetQualificationOptions = ["До 250 тыс.", "250-400 тыс.", "400-700 тыс.", "От 700 тыс.", "Пока не понимаю"];
const calculatorSteps = [
  { title: "Планировка и размеры", helper: "Выберите форму кухни и укажите размеры." },
  { title: "Фасады", helper: "Материал фасадов сильно влияет на диапазон стоимости." },
  { title: "Столешница", helper: "Выберите ориентировочный материал столешницы." },
  { title: "Фурнитура и наполнение", helper: "Уточните уровень фурнитуры и основные механизмы." },
  { title: "Монтаж и дополнительные работы", helper: "Отметьте работы, которые могут повлиять на расчёт." },
] as const;
const calculatorContentId = "homepage-calculator-content";
const calculatorSubmitButtonClass =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#18C6B4_0%,#0D9488_56%,#0A6A64_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(13,148,136,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(20,184,166,0.38)] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto sm:min-w-56 sm:px-7";
const calculatorSecondaryButtonClass =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.085] bg-white/[0.028] px-5 py-3 text-sm font-semibold text-white/64 transition hover:border-[#C8A96E]/[0.2] hover:bg-white/[0.06] hover:text-white active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow disabled:cursor-not-allowed disabled:border-white/[0.05] disabled:bg-white/[0.018] disabled:text-white/28 disabled:shadow-none sm:w-auto sm:min-w-36";

const previewDarkCalculatorSchema = contactFormSchema.extend({
  layout: z.enum(layoutValues, { error: "Выберите планировку" }),
  wallACm: z.string().trim().max(20, "Слишком длинное значение").optional(),
  wallBCm: z.string().trim().max(20, "Слишком длинное значение").optional(),
  wallCCm: z.string().trim().max(20, "Слишком длинное значение").optional(),
  islandLengthCm: z.string().trim().max(20, "Слишком длинное значение").optional(),
  facadeMaterial: z.enum(facadeMaterialValues, { error: "Выберите фасады" }),
  countertopMaterial: z.enum(countertopMaterialValues, { error: "Выберите столешницу" }),
  fittingsLevel: z.enum(fittingsLevelValues, { error: "Выберите уровень фурнитуры" }),
  softClose: z.boolean().optional(),
  extraDrawers: z.boolean().optional(),
  cornerMechanism: z.boolean().optional(),
  liftMechanisms: z.boolean().optional(),
  cargoBottleRack: z.boolean().optional(),
  worktopLighting: z.boolean().optional(),
  toCeiling: z.boolean().optional(),
  dismantling: z.boolean().optional(),
  deliveryLift: z.boolean().optional(),
  sinkCutout: z.boolean().optional(),
  cooktopCutout: z.boolean().optional(),
  complexInstallation: z.boolean().optional(),
  nonStandardSizes: z.boolean().optional(),
  budgetQualification: z.string().trim().max(120, "Слишком длинное значение").optional(),
});

type PreviewDarkCalculatorValues = z.infer<typeof previewDarkCalculatorSchema>;

type CalculatorState = {
  input: KitchenCalculatorInput;
  result: KitchenCalculatorResult | null;
  errors: string[];
};

const defaultValues: PreviewDarkCalculatorValues = {
  layout: "corner",
  wallACm: "300",
  wallBCm: "240",
  wallCCm: "220",
  islandLengthCm: "180",
  facadeMaterial: "mdfFilm",
  countertopMaterial: "waterResistant",
  fittingsLevel: "standard",
  softClose: false,
  extraDrawers: false,
  cornerMechanism: false,
  liftMechanisms: false,
  cargoBottleRack: false,
  worktopLighting: false,
  toCeiling: false,
  dismantling: false,
  deliveryLift: false,
  sinkCutout: false,
  cooktopCutout: false,
  complexInstallation: false,
  nonStandardSizes: false,
  budgetQualification: "",
  name: "",
  phone: "",
  communicationMethod: "whatsapp",
  comment: "",
  consent: false,
  honeypot: "",
};

export function PreviewDarkCalculator() {
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showContacts, setShowContacts] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Не удалось отправить заявку. Попробуйте ещё раз или напишите в WhatsApp.");
  const [calculatorMessage, setCalculatorMessage] = useState("");
  const focusTargetRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    trigger,
    formState: { errors },
  } = useForm<PreviewDarkCalculatorValues>({
    resolver: zodResolver(previewDarkCalculatorSchema),
    defaultValues,
    mode: "onBlur",
  });
  const watchedValues = useWatch({ control }) as PreviewDarkCalculatorValues;
  const calculatorState = useMemo(() => buildCalculatorState({ ...defaultValues, ...watchedValues }), [watchedValues]);
  const selectedLayout = layoutOptions.find((item) => item.value === watchedValues.layout) ?? layoutOptions[1];
  const result = calculatorState.result;
  const visibleDimensionFields = getVisibleDimensionFields(watchedValues.layout ?? defaultValues.layout);
  const currentStep = calculatorSteps[activeStep] ?? calculatorSteps[0];
  const isLastCalculatorStep = activeStep === calculatorSteps.length - 1;

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

  function resetCalculatorMessage() {
    setStatus("idle");
    setCalculatorMessage("");
  }

  async function validateCalculatorForProgress(message?: string) {
    const isValid = await trigger([
      "layout",
      "wallACm",
      "wallBCm",
      "wallCCm",
      "islandLengthCm",
      "facadeMaterial",
      "countertopMaterial",
      "fittingsLevel",
    ]);
    const currentState = buildCalculatorState(getValues());

    if (isValid && currentState.result) {
      setCalculatorMessage("");
      return true;
    }

    setCalculatorMessage(currentState.errors[0] ?? message ?? "Заполните параметры расчёта, чтобы увидеть диапазон.");
    return false;
  }

  async function goToNextStep() {
    const canProceed = await validateCalculatorForProgress("Заполните текущий шаг, чтобы продолжить.");
    if (!canProceed) return;

    setShowContacts(false);
    setStatus("idle");
    setActiveStep((step) => Math.min(step + 1, calculatorSteps.length - 1));
  }

  function goToPreviousStep() {
    setStatus("idle");
    setCalculatorMessage("");

    if (showContacts) {
      setShowContacts(false);
      return;
    }

    setActiveStep((step) => Math.max(step - 1, 0));
  }

  async function openContactStep() {
    const canOpen = await validateCalculatorForProgress("Заполните параметры расчёта, чтобы перейти к контактам.");
    if (!canOpen) {
      setShowContacts(false);
      return;
    }

    setActiveStep(calculatorSteps.length - 1);
    setShowContacts(true);
    setStatus("idle");
  }

  async function onSubmit(values: PreviewDarkCalculatorValues) {
    const currentState = buildCalculatorState(values);

    if (!currentState.result) {
      setShowContacts(false);
      setStatus("idle");
      setCalculatorMessage(currentState.errors[0] ?? "Заполните параметры расчёта, чтобы отправить заявку.");
      return;
    }

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
        quizAnswers: buildQuizAnswers(values, currentState.result),
        ...collectLeadClientMeta(),
      });
      setStatus("success");
      redirectToThankYou({
        layout: getLayoutLabel(values.layout),
        budget: values.budgetQualification?.trim() || undefined,
        sourceForm: "homepage-calculator",
      });
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      }
      setStatus("error");
    }
  }

  const activeStepContent = (() => {
    switch (activeStep) {
      case 0:
        return (
          <div className="grid gap-3">
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {layoutOptions.map((item) => {
                const isActive = item.value === selectedLayout.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    className={cn(
                      "inline-flex min-h-[50px] items-center justify-start gap-2.5 rounded-2xl border px-3 py-1.5 text-left text-sm font-semibold leading-tight transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6] xl:gap-2",
                      isActive
                        ? "border-[#14B8A6]/[0.46] bg-[#0F766E]/28 text-white shadow-[0_0_22px_rgba(20,184,166,0.1)]"
                        : "border-white/[0.065] bg-white/[0.028] text-white/70 hover:border-[#C8A96E]/[0.2] hover:bg-white/[0.055] hover:text-white"
                    )}
                    aria-pressed={isActive}
                    onClick={() => {
                      setValue("layout", item.value, { shouldDirty: true, shouldValidate: true });
                      resetCalculatorMessage();
                    }}
                  >
                    <LayoutSchemeIcon active={isActive} layout={item.value} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {visibleDimensionFields.map((field) => (
                <label key={field.name} className="grid gap-1.5 text-sm font-semibold text-white/82">
                  {field.label}
                  <input
                    className="v2-calc-input"
                    placeholder={field.placeholder}
                    inputMode="numeric"
                    {...register(field.name)}
                    onChange={(event) => {
                      register(field.name).onChange(event);
                      resetCalculatorMessage();
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="grid w-full gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {facadeOptions.map((item) => (
              <ChoiceButton
                key={item.value}
                active={watchedValues.facadeMaterial === item.value}
                title={item.label}
                description={item.description}
                onClick={() => {
                  setValue("facadeMaterial", item.value, { shouldDirty: true, shouldValidate: true });
                  resetCalculatorMessage();
                }}
              />
            ))}
          </div>
        );

      case 2:
        return (
          <div className="grid w-full gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {countertopOptions.map((item) => (
              <ChoiceButton
                key={item.value}
                active={watchedValues.countertopMaterial === item.value}
                title={item.label}
                description={item.description}
                onClick={() => {
                  setValue("countertopMaterial", item.value, { shouldDirty: true, shouldValidate: true });
                  resetCalculatorMessage();
                }}
              />
            ))}
          </div>
        );

      case 3:
        return (
          <div className="grid gap-3">
            <div className="grid gap-2 md:grid-cols-3">
              {fittingsLevelOptions.map((item) => (
                <ChoiceButton
                  key={item.value}
                  active={watchedValues.fittingsLevel === item.value}
                  title={item.label}
                  description={item.description}
                  onClick={() => {
                    setValue("fittingsLevel", item.value, { shouldDirty: true, shouldValidate: true });
                    resetCalculatorMessage();
                  }}
                />
              ))}
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {fittingsOptionFields.map((item) => (
                <CheckOption key={item.name} label={item.label} registration={register(item.name)} onChange={resetCalculatorMessage} />
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {extraWorkFields.map((item) => (
              <CheckOption key={item.name} label={item.label} registration={register(item.name)} onChange={resetCalculatorMessage} />
            ))}
          </div>
        );
    }
  })();

  return (
    <>
      <div className={cn("lg:hidden", isExpandedMobile ? "hidden" : "block")}>
        <div className="overflow-hidden rounded-[22px] border border-white/[0.07] bg-[linear-gradient(135deg,rgba(7,45,47,0.92)_0%,rgba(6,26,29,0.94)_100%)] p-4 text-white shadow-[0_16px_38px_rgba(6,46,48,0.14)]">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-teal-glow">
              <Calculator size={22} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-glow">Предварительный расчёт</p>
              <h2 className="mt-1 text-2xl font-semibold leading-tight">Рассчитайте стоимость кухни</h2>
              <p className="mt-2 text-sm leading-6 text-white/72">Ответьте на 5 вопросов и получите предварительный диапазон.</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_96px] gap-3 rounded-2xl bg-white/[0.035] p-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/46">1 минута</p>
              <p className="mt-1 text-sm font-semibold leading-tight text-white">Планировка, материалы и работы</p>
              <p className="mt-1 text-xs leading-5 text-white/62">Контакты понадобятся только после расчёта.</p>
            </div>
            <div className="relative min-h-[78px] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_46%,rgba(20,184,166,0.13),rgba(255,255,255,0.025)_62%,rgba(0,0,0,0.18)_100%)]">
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
          "w-full min-w-0 overflow-hidden rounded-[24px] border border-white/[0.07] bg-[linear-gradient(135deg,rgba(7,43,45,0.9)_0%,rgba(5,21,24,0.94)_68%,rgba(6,32,34,0.9)_100%)] p-2.5 text-white shadow-[0_18px_44px_rgba(3,20,22,0.16)] md:rounded-[28px] md:p-4 lg:block",
          isExpandedMobile ? "block" : "hidden"
        )}
        aria-labelledby="homepage-calculator-heading"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("honeypot")} />
        <div className="grid min-w-0 gap-2.5 md:gap-4 lg:grid-cols-[minmax(0,1.65fr)_380px] lg:items-start xl:grid-cols-[minmax(0,1.65fr)_400px]">
          <div className="min-w-0 rounded-[20px] bg-white/[0.024] p-2.5 md:rounded-[24px] md:p-3.5 lg:self-start">
            <div
              id="homepage-calculator-focus"
              ref={focusTargetRef}
              tabIndex={-1}
              className="outline-none focus-visible:rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-glow"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-glow">Калькулятор</p>
                  <h2 id="homepage-calculator-heading" className="mt-1 text-2xl font-semibold leading-tight md:text-[28px]">
                    Предварительный расчёт кухни
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

            <div className="mt-2.5 rounded-[18px] bg-white/[0.032] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.032)] md:p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-glow/90">
                    Шаг {activeStep + 1} из {calculatorSteps.length}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-tight text-white md:text-xl">{currentStep.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-[1.45] text-white/54">{currentStep.helper}</p>
                </div>
                <span className="hidden shrink-0 px-1 pt-0.5 text-xs font-semibold text-white/42 sm:inline-flex">
                  {showContacts ? "Контакты" : "Калькулятор"}
                </span>
              </div>

              <div className="mt-2.5 grid grid-cols-5 gap-1.5" aria-hidden="true">
                {calculatorSteps.map((step, index) => (
                  <span
                    key={step.title}
                    className={cn("h-0.5 rounded-full transition", index <= activeStep ? "bg-[linear-gradient(90deg,#C8A96E,#14B8A6)]" : "bg-white/[0.1]")}
                  />
                ))}
              </div>

              <div className="mt-2.5 min-w-0">{activeStepContent}</div>
            </div>

            {calculatorMessage ? (
              <p className="mt-3 rounded-2xl border border-[#C8A96E]/[0.22] bg-[#C8A96E]/[0.08] px-3 py-2 text-sm leading-5 text-white/78">
                {calculatorMessage}
              </p>
            ) : null}

            {showContacts ? (
              <div className="mt-3 rounded-[18px] bg-white/[0.035] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <p className="text-sm font-semibold text-teal-glow">Куда отправить расчёт?</p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
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
                  <DarkField label="На какой бюджет ориентируетесь?">
                    <select className="v2-calc-input" {...register("budgetQualification")}>
                      <option value="">Не указывать</option>
                      {budgetQualificationOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <span className="text-xs font-normal text-white/50">Не влияет на расчёт</span>
                  </DarkField>
                  <DarkField label="Комментарий">
                    <input className="v2-calc-input" placeholder="Что важно учесть" {...register("comment")} />
                  </DarkField>
                </div>
                <div className="mt-3">
                  <ConsentCheckbox id="preview-calculator-consent" register={register} error={errors.consent?.message} dark />
                </div>
              </div>
            ) : null}

            <div className="mt-2.5 flex flex-col gap-2.5 rounded-[18px] bg-white/[0.02] px-2.5 py-2.5 sm:flex-row sm:items-center sm:justify-between md:px-3">
              {showContacts ? (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <button className={calculatorSecondaryButtonClass} type="button" onClick={goToPreviousStep}>
                    <ArrowLeft size={17} aria-hidden="true" />
                    Назад
                  </button>
                  <button className={calculatorSubmitButtonClass} disabled={status === "loading"} type="submit">
                    <Send size={18} aria-hidden="true" />
                    {status === "loading" ? "Отправляем..." : "Отправить расчёт"}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <button className={calculatorSecondaryButtonClass} disabled={activeStep === 0} type="button" onClick={goToPreviousStep}>
                    <ArrowLeft size={17} aria-hidden="true" />
                    Назад
                  </button>
                  {isLastCalculatorStep ? (
                    <button className={calculatorSubmitButtonClass} type="button" onClick={openContactStep}>
                      Перейти к контактам
                      <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  ) : (
                    <button className={calculatorSubmitButtonClass} type="button" onClick={goToNextStep}>
                      Далее
                      <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
              <p className="max-w-md text-xs leading-[1.45] text-white/46">
                Сначала покажем предварительный диапазон, контакты понадобятся только для проверки расчёта дизайнером.
              </p>
            </div>

            {status === "success" ? (
              <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                Спасибо! Мы получили заявку. Дизайнер свяжется с вами в рабочее время.
              </p>
            ) : null}
            {status === "error" ? <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{errorMessage}</p> : null}
          </div>

          <aside className="relative min-w-0 overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_78%_6%,rgba(200,169,110,0.13),transparent_34%),linear-gradient(155deg,rgba(255,255,255,0.062)_0%,rgba(255,255,255,0.026)_48%,rgba(20,184,166,0.06)_100%)] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_34px_rgba(2,18,20,0.13)] md:p-4 lg:sticky lg:top-24 lg:self-start">
            <div className="relative z-10">
              <p className="text-sm font-semibold text-white/86">Предварительный диапазон</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/42">{selectedLayout.label}</p>
              {result ? (
                <>
                  <p className="mt-2.5 text-[28px] font-semibold leading-[1.06] text-champagne md:text-[34px]">
                    от {formatMoney(result.minPrice)} до {formatMoney(result.maxPrice)} ₽
                  </p>
                  <p className="mt-2 text-[13px] leading-5 text-white/58">{result.disclaimer}</p>
                  <div className="relative mt-3 h-[104px] overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_50%_44%,rgba(20,184,166,0.13),rgba(255,255,255,0.035)_58%,rgba(0,0,0,0.18)_100%)] md:h-[124px]">
                    <Image
                      key={selectedLayout.image}
                      src={selectedLayout.image}
                      alt={selectedLayout.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 340px"
                      loading="lazy"
                      className="object-contain p-4 opacity-78 transition duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#061112]/44 to-transparent" />
                  </div>
                  <ResultBreakdown result={result} values={watchedValues} />
                  {result.warnings.length ? (
                    <div className="mt-3 grid gap-1">
                      {result.warnings.slice(0, 2).map((warning) => (
                        <p key={warning} className="rounded-xl bg-white/[0.028] px-2.5 py-1.5 text-xs leading-5 text-white/48">
                          {warning}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <p className="mt-2 text-xl font-semibold text-champagne">Заполните параметры</p>
                  <p className="mt-2 text-[13px] leading-5 text-white/58">
                    Укажите размеры и комплектацию, чтобы увидеть предварительный диапазон.
                  </p>
                  <div className="mt-3 grid gap-1">
                    {calculatorState.errors.slice(0, 3).map((error) => (
                      <p key={error} className="rounded-xl bg-[#C8A96E]/[0.08] px-2.5 py-1.5 text-xs leading-5 text-white/62">
                        {error}
                      </p>
                    ))}
                  </div>
                  <div className="relative mt-3 h-[104px] overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_50%_44%,rgba(20,184,166,0.13),rgba(255,255,255,0.035)_58%,rgba(0,0,0,0.18)_100%)] md:h-[124px]">
                    <Image
                      key={selectedLayout.image}
                      src={selectedLayout.image}
                      alt={selectedLayout.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 340px"
                      loading="lazy"
                      className="object-contain p-4 opacity-78 transition duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#061112]/44 to-transparent" />
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </form>
    </>
  );
}

function LayoutSchemeIcon({ active, layout }: { active: boolean; layout: KitchenLayout }) {
  const mainStroke = active ? "text-teal-glow" : "text-white/38";
  const accentStroke = active ? "#C8A96E" : "currentColor";
  const accentOpacity = active ? 0.86 : 0.28;

  return (
    <svg
      aria-hidden="true"
      className={cn("h-7 w-10 shrink-0 sm:h-8 sm:w-12", mainStroke, active ? "opacity-95" : "opacity-70")}
      fill="none"
      viewBox="0 0 64 40"
    >
      {layout === "straight" ? (
        <>
          <path d="M12 24H52" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
          <path d="M17 15H47" stroke="currentColor" strokeLinecap="round" strokeWidth="2" opacity="0.38" />
          <path d="M22 30H42" stroke={accentStroke} strokeLinecap="round" strokeWidth="2" opacity={accentOpacity} />
        </>
      ) : null}
      {layout === "corner" ? (
        <>
          <path d="M16 11V28H51" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M25 18V23H43" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" opacity="0.36" />
          <path d="M16 28L24 20" stroke={accentStroke} strokeLinecap="round" strokeWidth="2" opacity={accentOpacity} />
        </>
      ) : null}
      {layout === "uShape" ? (
        <>
          <path d="M15 11V29H49V11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M23 17V23H41V17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" opacity="0.34" />
          <path d="M26 29H38" stroke={accentStroke} strokeLinecap="round" strokeWidth="2" opacity={accentOpacity} />
        </>
      ) : null}
      {layout === "island" ? (
        <>
          <path d="M13 14H42V25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M20 21H35" stroke="currentColor" strokeLinecap="round" strokeWidth="2" opacity="0.34" />
          <rect height="8" rx="4" stroke={accentStroke} strokeWidth="2" opacity={accentOpacity} width="17" x="36" y="24" />
        </>
      ) : null}
    </svg>
  );
}

function ChoiceButton({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "min-h-[52px] rounded-2xl border px-3 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]",
        active
          ? "border-[#14B8A6]/[0.42] bg-[#0F766E]/28 text-white shadow-[0_0_22px_rgba(20,184,166,0.09)]"
          : "border-white/[0.065] bg-white/[0.028] text-white/72 hover:border-[#C8A96E]/[0.2] hover:bg-white/[0.055] hover:text-white"
      )}
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="block text-sm font-semibold leading-tight">{title}</span>
      <span className="mt-0.5 block text-xs leading-4 text-white/52">{description}</span>
    </button>
  );
}

function CheckOption({
  label,
  registration,
  onChange,
}: {
  label: string;
  registration: ReturnType<ReturnType<typeof useForm<PreviewDarkCalculatorValues>>["register"]>;
  onChange: () => void;
}) {
  return (
    <label className="group flex min-h-10 cursor-pointer items-center gap-2.5 rounded-2xl border border-white/[0.065] bg-white/[0.028] px-3 py-1.5 text-sm font-semibold text-white/70 transition hover:border-[#C8A96E]/[0.2] hover:bg-white/[0.055] hover:text-white">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-white/20 bg-[#061112] text-teal focus:ring-2 focus:ring-teal-glow focus:ring-offset-0"
        {...registration}
        onChange={(event) => {
          registration.onChange(event);
          onChange();
        }}
      />
      <span>{label}</span>
    </label>
  );
}

function DarkField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-white/78">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs font-normal text-red-200">{error}</span> : null}
    </label>
  );
}

function ResultBreakdown({ result, values }: { result: KitchenCalculatorResult; values: PreviewDarkCalculatorValues }) {
  const rows = [
    ["Размер", `${getLayoutLabel(values.layout)} · ${formatMeterRange(result.normalizedDimensions.effectiveMeters)} м`],
    ["Фасады", getFacadeLabel(values.facadeMaterial)],
    ["Столешница", getCountertopLabel(values.countertopMaterial)],
    ["Фурнитура", getFittingsLevelLabel(values.fittingsLevel)],
  ];

  return (
    <div className="mt-3.5 border-y border-white/[0.05] py-0.5">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-start justify-between gap-3 py-1.5 text-xs leading-5">
          <span className="shrink-0 text-white/42">{label}</span>
          <span className="min-w-0 text-right font-semibold text-white/68">{value}</span>
        </div>
      ))}
    </div>
  );
}

function buildCalculatorState(values: PreviewDarkCalculatorValues): CalculatorState {
  const input = buildCalculatorInput(values);
  const errors = validateKitchenCalculatorInput(input);

  if (errors.length) {
    return { input, result: null, errors };
  }

  try {
    return { input, result: calculateKitchenEstimate(input), errors: [] };
  } catch (error) {
    if (error instanceof Error && error.message) {
      return { input, result: null, errors: [error.message] };
    }

    return { input, result: null, errors: ["Не удалось рассчитать диапазон. Проверьте параметры кухни."] };
  }
}

function buildCalculatorInput(values: PreviewDarkCalculatorValues): KitchenCalculatorInput {
  const dimensions: KitchenCalculatorInput["dimensions"] = {
    wallACm: parseCm(values.wallACm),
  };

  if (values.layout === "corner" || values.layout === "uShape") {
    dimensions.wallBCm = parseCm(values.wallBCm);
  }

  if (values.layout === "uShape") {
    dimensions.wallCCm = parseCm(values.wallCCm);
  }

  if (values.layout === "island") {
    dimensions.islandLengthCm = parseCm(values.islandLengthCm);
  }

  return {
    layout: values.layout,
    dimensions,
    facadeMaterial: values.facadeMaterial,
    countertopMaterial: values.countertopMaterial,
    fittingsLevel: values.fittingsLevel,
    fittingsOptions: {
      softClose: Boolean(values.softClose),
      extraDrawers: Boolean(values.extraDrawers),
      cornerMechanism: Boolean(values.cornerMechanism),
      liftMechanisms: Boolean(values.liftMechanisms),
      cargoBottleRack: Boolean(values.cargoBottleRack),
      worktopLighting: Boolean(values.worktopLighting),
    },
    extraWork: {
      toCeiling: Boolean(values.toCeiling),
      dismantling: Boolean(values.dismantling),
      deliveryLift: Boolean(values.deliveryLift),
      sinkCutout: Boolean(values.sinkCutout),
      cooktopCutout: Boolean(values.cooktopCutout),
      complexInstallation: Boolean(values.complexInstallation),
      nonStandardSizes: Boolean(values.nonStandardSizes),
    },
  };
}

function buildQuizAnswers(values: PreviewDarkCalculatorValues, result: KitchenCalculatorResult) {
  const fittingsSummary = [
    getFittingsLevelLabel(values.fittingsLevel),
    ...fittingsOptionFields.filter((item) => Boolean(values[item.name])).map((item) => item.label.toLowerCase()),
  ].join(", ");
  const extraWorkSummary = extraWorkFields
    .filter((item) => Boolean(values[item.name]))
    .map((item) => item.label.toLowerCase())
    .join(", ");
  const budgetQualification = values.budgetQualification?.trim();
  const answers = [
    {
      step: 1,
      question: "Планировка и размеры",
      value: `${values.layout}; ${formatDimensionsForLead(values, result)}`,
      label: `${getLayoutLabel(values.layout)} · ${formatDimensionsForLead(values, result)}`,
    },
    { step: 2, question: "Фасады", value: values.facadeMaterial, label: getFacadeLabel(values.facadeMaterial) },
    { step: 3, question: "Столешница", value: values.countertopMaterial, label: getCountertopLabel(values.countertopMaterial) },
    { step: 4, question: "Фурнитура и наполнение", value: fittingsSummary, label: fittingsSummary },
    {
      step: 5,
      question: "Монтаж и дополнительные работы",
      value: extraWorkSummary || "без выбранных доп. работ",
      label: extraWorkSummary || "без выбранных доп. работ",
    },
    {
      step: 6,
      question: "Предварительный диапазон",
      value: `${result.minPrice}-${result.maxPrice}`,
      label: `от ${formatMoney(result.minPrice)} до ${formatMoney(result.maxPrice)} ₽`,
    },
  ];

  if (budgetQualification) {
    answers.push({
      step: 7,
      question: "Ориентир по бюджету",
      value: budgetQualification,
      label: `${budgetQualification} (не влияет на расчёт)`,
    });
  }

  return answers;
}

function getVisibleDimensionFields(layout: KitchenLayout) {
  const base = [{ name: "wallACm" as const, label: layout === "straight" ? "Длина стены" : "Первая стена", placeholder: "Например, 300" }];

  if (layout === "corner") {
    return [...base, { name: "wallBCm" as const, label: "Вторая стена", placeholder: "Например, 240" }];
  }

  if (layout === "uShape") {
    return [
      ...base,
      { name: "wallBCm" as const, label: "Вторая стена", placeholder: "Например, 180" },
      { name: "wallCCm" as const, label: "Третья стена", placeholder: "Например, 220" },
    ];
  }

  if (layout === "island") {
    return [...base, { name: "islandLengthCm" as const, label: "Длина острова", placeholder: "Например, 180" }];
  }

  return base;
}

function formatDimensionsForLead(values: PreviewDarkCalculatorValues, result: KitchenCalculatorResult) {
  const parts = [`стена A: ${values.wallACm || "не указано"} см`];

  if (values.layout === "corner" || values.layout === "uShape") {
    parts.push(`стена B: ${values.wallBCm || "не указано"} см`);
  }

  if (values.layout === "uShape") {
    parts.push(`стена C: ${values.wallCCm || "не указано"} см`);
  }

  if (values.layout === "island") {
    parts.push(`остров: ${values.islandLengthCm || "не указано"} см`);
  }

  parts.push(`расчётная длина: ${formatMeterRange(result.normalizedDimensions.effectiveMeters)} м`);

  return parts.join(", ");
}

function parseCm(value: string | undefined) {
  const normalized = value?.replace(",", ".").trim();
  if (!normalized) return Number.NaN;

  return Number(normalized);
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function formatMeterRange(range: Range) {
  if (range.min === range.max) return String(range.min);

  return `${range.min}–${range.max}`;
}

function getLayoutLabel(value: KitchenLayout) {
  return layoutOptions.find((item) => item.value === value)?.label ?? value;
}

function getFacadeLabel(value: FacadeMaterial) {
  return facadeOptions.find((item) => item.value === value)?.label ?? value;
}

function getCountertopLabel(value: CountertopMaterial) {
  return countertopOptions.find((item) => item.value === value)?.label ?? value;
}

function getFittingsLevelLabel(value: FittingsLevel) {
  return fittingsLevelOptions.find((item) => item.value === value)?.label ?? value;
}
