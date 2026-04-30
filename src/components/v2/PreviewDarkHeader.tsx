"use client";

import Image from "next/image";
import Link from "next/link";
import { Calculator, MessageCircle, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition",
          scrolled ? "border-white/10 bg-[#071314]/95 shadow-[0_18px_50px_rgba(0,0,0,0.28)]" : "border-white/10 bg-[#071314]/70"
        )}
      >
        <div className="mx-auto flex h-[76px] w-full max-w-[1760px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-10">
          <Link href="/preview-dark" className="flex items-center gap-3" aria-label="КИТ, главная версия preview-dark">
            <Image src={imageMap.logo.iconFramed} alt={imageMap.logo.iconFramedAlt} width={44} height={44} style={{ width: 44, height: 44 }} />
            <span className="text-2xl font-semibold text-white">КИТ</span>
          </Link>

          <nav className="hidden items-center gap-8 xl:flex" aria-label="Навигация preview">
            {nav.map(([label, href]) => (
              <Link key={label + href} href={href} className="text-sm font-medium text-white/75 transition hover:text-teal-glow">
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href={siteSettings.phoneHref} className="text-base font-semibold text-white">
              {siteSettings.phone}
            </a>
            <a
              href="#callback"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-champagne px-5 text-sm font-semibold text-champagne transition hover:bg-champagne hover:text-navy"
            >
              Заказать звонок
            </a>
          </div>

          <button
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white lg:hidden"
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
