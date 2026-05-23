"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import {
  getThankYouRecommendations,
  parseThankYouSummarySnapshot,
  readThankYouSummarySnapshot,
} from "@/lib/thank-you-summary";
import type { Project, SiteSettings } from "@/types/content";

type ThankYouClientProps = {
  projects: Project[];
  settings: SiteSettings;
};

export function ThankYouClient({ projects, settings }: ThankYouClientProps) {
  const summarySnapshot = useSyncExternalStore(subscribeToSummaryStorage, readThankYouSummarySnapshot, () => "");
  const summary = useMemo(() => parseThankYouSummarySnapshot(summarySnapshot), [summarySnapshot]);

  const related = useMemo(() => getThankYouRecommendations(projects, summary, 3), [projects, summary]);
  const summaryItems = [
    summary?.style ? ["Стиль", summary.style] : null,
    summary?.layout ? ["Планировка", summary.layout] : null,
    summary?.budget ? ["Бюджет", summary.budget] : null,
  ].filter((item): item is [string, string] => Boolean(item));

  return (
    <main className="overflow-x-hidden bg-[#031416] pt-[76px] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(20,184,166,0.18),transparent_34%),linear-gradient(135deg,#031416_0%,#072B2C_54%,#041719_100%)] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1760px] gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div className="rounded-[28px] border border-[#C8A96E]/[0.18] bg-[#062426]/92 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-glow">Спасибо</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">Заявка принята</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 md:text-lg md:leading-8">
              Мы свяжемся с вами в рабочее время и уточним детали проекта.
            </p>

            {summaryItems.length ? (
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {summaryItems.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#C8A96E]/[0.16] bg-white/[0.04] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">{label}</p>
                    <p className="mt-2 text-base font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-teal px-6 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(13,148,136,0.28)] transition hover:bg-teal-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow"
                href={settings.vkHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Перейти во ВКонтакте
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C8A96E]/60 px-6 text-sm font-semibold text-[#E2C98E] transition hover:bg-[#C8A96E] hover:text-[#031416] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96E]"
                href={settings.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Написать в Telegram
              </a>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 px-6 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96E]"
                href="/"
              >
                Вернуться на главную
              </Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-6">
            <p className="text-sm font-semibold text-white">Что дальше</p>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-white/72">
              <p className="rounded-2xl border border-white/10 bg-[#061C1E] p-4">Дизайнер проверит параметры и уточнит детали проекта.</p>
              <p className="rounded-2xl border border-white/10 bg-[#061C1E] p-4">Если нужно, подберём материалы и предложим ближайший следующий шаг.</p>
              <p className="rounded-2xl border border-white/10 bg-[#061C1E] p-4">Предварительный расчёт не является финальной стоимостью до замера и проекта.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="mx-auto w-full max-w-[1760px]">
          <h2 className="text-2xl font-semibold text-white">Пока ждёте — посмотрите похожие примеры</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-[24px] border border-[#C8A96E]/[0.14] bg-[#062426] shadow-[0_18px_48px_rgba(0,0,0,0.2)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes={project.sizes}
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal-glow">{project.label}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-1 text-sm text-white/62">{project.district}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function subscribeToSummaryStorage(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}
