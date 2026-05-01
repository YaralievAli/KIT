"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ContactFields } from "@/components/ui/FormFields";
import { quizSteps } from "@/content/quiz";
import { quizLeadSchema, type QuizLeadValues } from "@/lib/form-schemas";
import { cn } from "@/lib/helpers";
import { collectLeadClientMeta, sendLead } from "@/lib/lead-client";
import { normalizeRussianPhone } from "@/lib/phone";
import { redirectToThankYou } from "@/lib/thank-you-summary";

const defaultValues: QuizLeadValues = {
  task: "",
  layout: "",
  style: "",
  budget: "",
  name: "",
  phone: "",
  communicationMethod: "whatsapp",
  comment: "",
  consent: false,
  honeypot: "",
};

export function QuizSection() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Не удалось отправить заявку. Попробуйте ещё раз или напишите в WhatsApp.");
  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<QuizLeadValues>({
    resolver: zodResolver(quizLeadSchema),
    defaultValues,
    mode: "onBlur",
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const totalSteps = quizSteps.length + 1;
  const current = quizSteps[step];
  const progress = useMemo(() => Math.round(((step + 1) / totalSteps) * 100), [step, totalSteps]);

  async function next() {
    if (!current) return;
    const valid = await trigger(current.field as keyof QuizLeadValues);
    if (valid) setStep((value) => Math.min(value + 1, totalSteps - 1));
  }

  async function onSubmit(values: QuizLeadValues) {
    setStatus("loading");
    setErrorMessage("Не удалось отправить заявку. Попробуйте ещё раз или напишите в WhatsApp.");

    const quizAnswers = quizSteps.map((quizStep, index) => {
      const value = values[quizStep.field as keyof QuizLeadValues] as string;

      return {
        step: index + 1,
        question: quizStep.question,
        value,
        label: value,
      };
    });

    try {
      await sendLead({
        name: values.name,
        phone: normalizeRussianPhone(values.phone) ?? values.phone,
        communicationMethod: values.communicationMethod,
        comment: values.comment,
        consent: values.consent,
        honeypot: values.honeypot,
        selectedProjectId: values.selectedProjectId,
        sourcePage: "quiz",
        quizAnswers,
        ...collectLeadClientMeta(),
      });
      setStatus("success");
      redirectToThankYou({
        selectedProjectId: values.selectedProjectId,
        style: values.style,
        layout: values.layout,
        budget: values.budget,
        sourceForm: "quiz",
      });
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      }
      setStatus("error");
    }
  }

  return (
    <section id="quiz" className="section bg-surface">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">Предварительный расчёт</p>
            <h2 className="section-title">Подберём кухню и рассчитаем предварительную стоимость</h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Ответьте на 5 вопросов. Подготовим ориентировочный расчёт и рекомендации по материалам. Телефон нужен только на последнем шаге.
            </p>
            <p className="mt-5 rounded-2xl border border-border bg-white p-4 text-sm leading-6 text-muted">
              Это предварительный расчёт. Точная стоимость зависит от замера, материалов, фурнитуры и проекта.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-border bg-white p-5 shadow-soft md:p-8">
            <div className="sticky top-0 z-10 -mx-5 -mt-5 mb-6 rounded-t-3xl bg-white/95 px-5 pt-5 backdrop-blur md:static md:m-0 md:mb-6 md:p-0">
              <div className="mb-3 flex items-center justify-between text-sm font-semibold text-navy">
                <span>Шаг {step + 1} из {totalSteps}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-surface">
                <div className="h-2 rounded-full bg-teal transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {current ? (
              <div className="grid gap-5">
                <h3 className="text-2xl font-semibold text-navy">{current.question}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {current.options.map((option) => {
                    const selected = answers[current.field] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        className={cn(
                          "min-h-16 rounded-2xl border p-4 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
                          selected ? "border-teal bg-teal text-white shadow-glow" : "border-border bg-white text-navy hover:border-teal"
                        )}
                        onClick={() => {
                          setAnswers((value) => ({ ...value, [current.field]: option }));
                          setValue(current.field as keyof QuizLeadValues, option, { shouldValidate: true });
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {errors[current.field as keyof QuizLeadValues]?.message ? (
                  <p className="text-sm text-red-600">{errors[current.field as keyof QuizLeadValues]?.message as string}</p>
                ) : null}
              </div>
            ) : (
              <div className="grid gap-5">
                <h3 className="text-2xl font-semibold text-navy">Куда отправить подборку и расчёт?</h3>
                <ContactFields control={control} register={register} errors={errors} idPrefix="quiz" />
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                className="btn-secondary"
                disabled={step === 0 || status === "loading"}
                type="button"
                onClick={() => setStep((value) => Math.max(value - 1, 0))}
              >
                <ArrowLeft size={18} aria-hidden="true" />
                Назад
              </button>
              {current ? (
                <button className="btn-primary" type="button" onClick={next}>
                  Далее
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              ) : (
                <button className="btn-primary" disabled={status === "loading"} type="submit">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  {status === "loading" ? "Отправляем..." : "Получить подборку и предварительный расчёт"}
                </button>
              )}
            </div>

            {status === "success" ? (
              <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                Спасибо! Мы получили заявку. Дизайнер свяжется с вами в рабочее время.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                {errorMessage}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
