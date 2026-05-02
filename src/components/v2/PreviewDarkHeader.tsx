"use client";

import Image from "next/image";
import Link from "next/link";
import { Calculator, MessageCircle, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import type { SVGProps } from "react";
import { imageMap } from "@/content/images-map";
import { siteSettings } from "@/content/settings";
import { cn } from "@/lib/helpers";

const nav = [
  ["Кухни", "#layouts"],
  ["Каталог", "#projects"],
  ["Рассчитать стоимость", "#quiz"],
  ["Наши работы", "#projects"],
  ["Отзывы", "#reviews"],
  ["Контакты", "#contacts"],
] as const;

export function PreviewDarkHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(3,20,22,0.9)] shadow-[0_12px_36px_rgba(0,0,0,0.22)] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-[76px] w-full max-w-[1760px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="КИТ, главная">
            <Image src={imageMap.logo.iconFramed} alt={imageMap.logo.iconFramedAlt} width={44} height={44} style={{ width: 44, height: 44 }} />
            <span className="text-2xl font-semibold text-white">КИТ</span>
          </Link>

          <nav className="hidden items-center gap-8 xl:flex" aria-label="Навигация preview">
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
            >
              {siteSettings.phone}
            </a>
            <a
              href="#callback"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-champagne px-5 text-sm font-semibold text-champagne transition hover:bg-champagne hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              Заказать звонок
            </a>
            {siteSettings.vkHref ? (
              <a
                href={siteSettings.vkHref}
                className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/28 bg-white/[0.08] text-[#9CD7FF] transition hover:border-[#9CD7FF]/70 hover:bg-white/[0.12] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9CD7FF] lg:inline-flex"
                aria-label="ВКонтакте"
              >
                <HeaderVkIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            ) : null}
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
        <a className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-teal px-5 text-sm font-semibold text-white" href={siteSettings.phoneHref}>
          <Phone size={18} aria-hidden="true" />
          Позвонить
        </a>
      </aside>
      <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 gap-2 rounded-[22px] border border-white/16 bg-[#071314]/92 p-2 shadow-[0_18px_55px_rgba(0,0,0,0.28)] lg:hidden">
        <a className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-2xl bg-white/10 px-2 text-xs font-semibold text-white" href={siteSettings.phoneHref}>
          <Phone size={16} aria-hidden="true" />
          Позвонить
        </a>
        <a className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-2xl bg-white/10 px-2 text-xs font-semibold text-white" href={siteSettings.whatsappHref}>
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp
        </a>
        <a className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-2xl bg-teal px-2 text-xs font-semibold text-white" href="#quiz">
          <Calculator size={16} aria-hidden="true" />
          Расчёт
        </a>
      </div>
    </>
  );
}

function HeaderVkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.75 17.2h-1.08c-3.67 0-5.76-2.52-7.33-6.72L3.9 9.3h2.52c.45 0 .65.2.78.58.86 2.46 2.02 4.3 2.55 4.3.2 0 .29-.1.29-.62v-2.42c-.07-1.1-.64-1.2-.64-1.6 0-.2.17-.4.44-.4h3.96c.37 0 .5.2.5.64v3.27c0 .35.15.47.26.47.2 0 .38-.12.76-.5.94-1.05 1.62-2.66 1.62-2.66.09-.23.28-.43.72-.43h2.52c.76 0 .93.39.76.93-.32 1.01-3.4 4.78-3.4 4.78-.27.34-.38.5 0 .98.27.35 1.17 1.14 1.77 1.85.44.51.77.94.86 1.24.1.36-.18.55-.65.55h-2.81c-.42 0-.62-.13-.86-.42-.34-.4-1.12-1.4-1.86-1.4-.38 0-.48.26-.48.66v.75c0 .4-.13.62-.76.62Z" />
    </svg>
  );
}
