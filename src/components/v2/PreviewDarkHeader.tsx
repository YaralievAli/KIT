"use client";

import Image from "next/image";
import Link from "next/link";
import { Calculator, MessageCircle, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SocialIconButtons } from "@/components/ui/SocialIconButtons";
import { imageMap } from "@/content/images-map";
import { siteSettings } from "@/content/settings";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/helpers";

const nav = [
  ["Кухни", "/#layouts"],
  ["Расчёт", "/#quiz"],
  ["Проекты", "/#projects"],
  ["Отзывы", "/#reviews"],
  ["Контакты", "/#contacts"],
] as const;

export function PreviewDarkHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleSamePageHashClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      const rawHref = link?.getAttribute("href");

      if (!link || !rawHref || link.target || link.hasAttribute("download")) {
        return;
      }

      const lowerHref = rawHref.toLowerCase();
      if (lowerHref.startsWith("tel:") || lowerHref.startsWith("mailto:")) {
        return;
      }

      let url: URL;
      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
        return;
      }

      let targetId: string;
      try {
        targetId = decodeURIComponent(url.hash.slice(1));
      } catch {
        targetId = url.hash.slice(1);
      }

      const targetElement = document.getElementById(targetId);
      if (!targetElement) {
        return;
      }

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

      if (window.location.hash !== url.hash) {
        window.history.pushState(null, "", url.hash);
      }
    }

    document.addEventListener("click", handleSamePageHashClick, true);

    return () => {
      document.removeEventListener("click", handleSamePageHashClick, true);
    };
  }, []);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(3,20,22,0.9)] shadow-[0_12px_36px_rgba(0,0,0,0.22)] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-[76px] w-full max-w-[1760px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-4" aria-label="КИТ, главная">
            <Image src={imageMap.logo.icon} alt={imageMap.logo.iconAlt} width={70} height={44} style={{ width: 70, height: "auto" }} />
            <span className="text-[1.9rem] font-extrabold leading-none tracking-[0.055em] text-white">КИТ</span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Навигация preview">
            {nav.map(([label, href]) => (
              <Link
                key={label + href}
                href={href}
                className="text-sm font-semibold text-white transition hover:text-teal-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={siteSettings.phoneHref}
              className="text-base font-semibold text-white transition hover:text-teal-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              onClick={() => trackAnalyticsEvent("phone_click")}
            >
              {siteSettings.phone}
            </a>
            <Link
              href="/#callback"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-champagne px-5 text-sm font-semibold text-champagne transition hover:bg-champagne hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              onClick={() => trackAnalyticsEvent("header_callback_click", { sourceForm: "homepage-final-cta" })}
            >
              Заказать звонок
            </Link>
            <SocialIconButtons
              settings={siteSettings}
              include={["vk", "telegram", "max"]}
              className="hidden gap-2 lg:flex"
              size="sm"
            />
          </div>

          <button
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal lg:hidden"
            type="button"
            aria-label="Открыть меню"
            onClick={() => setOpen(true)}
          >
            <Menu size={23} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className={cn("fixed inset-0 z-[60] bg-black/70 transition lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")} onClick={() => setOpen(false)} />
      <aside
        className={cn(
          "fixed bottom-0 right-0 top-0 z-[70] w-full max-w-sm bg-[#071314] p-6 text-white shadow-soft transition-transform lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">Меню</span>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10" type="button" onClick={() => setOpen(false)} aria-label="Закрыть меню">
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <nav className="mt-8 grid gap-3" aria-label="Мобильное меню preview">
          {nav.map(([label, href]) => (
            <Link key={label + href} href={href} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base font-semibold text-white" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
        <a className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-teal px-5 text-sm font-semibold text-white" href={siteSettings.phoneHref} onClick={() => trackAnalyticsEvent("phone_click")}>
          <Phone size={18} aria-hidden="true" />
          Позвонить
        </a>
        <SocialIconButtons
          settings={siteSettings}
          include={["vk", "telegram", "max"]}
          className="mt-5 justify-center"
        />
      </aside>
      <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 gap-1.5 rounded-[22px] border border-white/10 bg-[#031416] p-1.5 shadow-[0_-16px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:hidden">
        <a className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-[#0B2528] px-2 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-[#103236] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96E]" href={siteSettings.phoneHref} onClick={() => {
          trackAnalyticsEvent("phone_click");
          trackAnalyticsEvent("mobile_sticky_cta_click");
        }}>
          <Phone size={16} aria-hidden="true" />
          Позвонить
        </a>
        <a className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-[#0B2528] px-2 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-[#103236] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96E]" href={siteSettings.whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackAnalyticsEvent("mobile_sticky_cta_click", { socialChannel: "whatsapp" })}>
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp
        </a>
        <Link className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-2xl bg-[#0F9F92] px-2 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(20,184,166,0.26)] transition hover:bg-[#14B8A6] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96E]" href="/#quiz" onClick={() => trackAnalyticsEvent("mobile_sticky_cta_click", { sourcePage: "homepage-calculator" })}>
          <Calculator size={16} aria-hidden="true" />
          Расчёт
        </Link>
      </div>
    </>
  );
}
