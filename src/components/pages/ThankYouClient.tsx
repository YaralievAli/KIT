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
    <main className="bg-surface pt-28">
      <section className="section">
        <div className="container-page">
          <div className="rounded-3xl bg-white p-6 shadow-soft md:p-10">
            <p className="eyebrow">Спасибо</p>
            <h1 className="mt-3 text-4xl font-semibold text-navy md:text-5xl">Заявка принята</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Мы свяжемся с вами в рабочее время и уточним детали проекта.
            </p>

            {summaryItems.length ? (
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {summaryItems.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-border bg-surface p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
                    <p className="mt-2 text-base font-semibold text-navy">{value}</p>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn-primary" href={settings.vkHref}>Перейти во ВКонтакте</a>
              <a className="btn-secondary" href={settings.whatsappHref}>Написать в WhatsApp</a>
              <Link className="btn-secondary" href="/">Вернуться на главную</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <h2 className="text-2xl font-semibold text-navy">Пока ждёте — посмотрите похожие примеры</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
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
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">{project.label}</span>
                  <h3 className="mt-3 text-lg font-semibold text-navy">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted">{project.district}</p>
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
