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
    <aside className="fixed inset-x-3 bottom-24 z-[55] mx-auto max-w-[520px] rounded-xl border border-white/[0.1] bg-[rgba(12,29,30,0.72)] px-3 py-2.5 text-white shadow-[0_6px_18px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:bottom-5 sm:left-auto sm:right-5 sm:mx-0 sm:w-[min(520px,calc(100vw-2.5rem))]" aria-label="Согласие на аналитику">
      <div className="min-w-0">
        <p className="text-[12.5px] leading-5 text-white/88">
          Мы используем необходимые cookies для работы сайта. Яндекс Метрика включается только после вашего согласия, чтобы улучшать сайт. Данные из форм заявки в аналитику не передаются.
        </p>
        <Link className="mt-1 inline-flex text-[11px] font-medium leading-4 text-[#E0C88F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96E]" href="/privacy">
          Подробнее в политике обработки персональных данных
        </Link>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#0F9F92] px-3 text-xs font-semibold text-white transition hover:bg-[#14B8A6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96E]" type="button" onClick={() => chooseConsent("accepted")}>
          Принять аналитику
        </button>
        <button className="inline-flex min-h-9 items-center justify-center rounded-lg border border-white/28 bg-white/[0.1] px-3 text-xs font-semibold text-white transition hover:border-white/40 hover:bg-white/[0.15] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96E]" type="button" onClick={() => chooseConsent("rejected")}>
          Только необходимые
        </button>
      </div>
    </aside>
  );
}
