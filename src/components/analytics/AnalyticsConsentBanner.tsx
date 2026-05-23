"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getAnalyticsConsentSnapshot, getServerAnalyticsConsentSnapshot, subscribeAnalyticsConsent, writeAnalyticsConsent, type AnalyticsConsentValue } from "@/lib/analytics";

export function AnalyticsConsentBanner() {
  const consent = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsentSnapshot, getServerAnalyticsConsentSnapshot);

  const chooseConsent = (value: AnalyticsConsentValue) => {
    writeAnalyticsConsent(value);
  };

  if (consent !== null) {
    return null;
  }

  return (
    <aside className="fixed inset-x-3 bottom-24 z-[55] mx-auto max-w-xl rounded-2xl border border-white/15 bg-[rgba(12,29,30,0.88)] p-3.5 text-white shadow-[0_12px_34px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-6 sm:mx-0 sm:w-[min(430px,calc(100vw-3rem))] sm:p-4" aria-label="Согласие на аналитику">
      <p className="text-sm leading-5 text-white/90 sm:leading-6">
        Мы используем cookies и Яндекс Метрику, чтобы понимать посещаемость и улучшать сайт. Метрика включается только после вашего согласия. Данные из форм заявки в аналитику не передаются.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#0F9F92] px-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(15,159,146,0.22)] transition hover:bg-[#14B8A6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96E]" type="button" onClick={() => chooseConsent("accepted")}>
          Принять аналитику
        </button>
        <button className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-white/28 bg-white/[0.12] px-4 text-sm font-semibold text-white transition hover:border-white/36 hover:bg-white/[0.17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96E]" type="button" onClick={() => chooseConsent("rejected")}>
          Только необходимые
        </button>
      </div>
      <Link className="mt-3 inline-flex text-xs font-medium text-[#E0C88F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96E]" href="/privacy">
        Подробнее в политике обработки персональных данных
      </Link>
    </aside>
  );
}
