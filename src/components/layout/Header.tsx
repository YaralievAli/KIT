"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { imageMap } from "@/content/images-map";
import { siteSettings as fallbackSettings } from "@/content/settings";
import { cn } from "@/lib/helpers";
import type { SiteSettings } from "@/types/content";

type HeaderTheme = "dark-overlay" | "light-solid";

const nav = [
  ["Кухни", "#styles"],
  ["Каталог", "#projects"],
  ["Рассчитать стоимость", "#quiz"],
  ["Наши работы", "#projects"],
  ["Отзывы", "#reviews"],
  ["Контакты", "#contacts"],
] as const;

export function Header({ initialTheme = "dark-overlay", settings = fallbackSettings }: { initialTheme?: HeaderTheme; settings?: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLight = initialTheme === "light-solid" || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition",
          isLight ? "border-border bg-white shadow-sm" : "border-white/15 bg-[#071314]/78 shadow-[0_14px_40px_rgba(0,0,0,0.22)] backdrop-blur-sm"
        )}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="КИТ, на главную">
            <Image src={imageMap.logo.iconFramed} alt={imageMap.logo.iconFramedAlt} width={42} height={42} style={{ width: 42, height: 42 }} />
            <span className={cn("text-xl font-semibold", isLight ? "text-navy" : "text-white")}>КИТ</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Основное меню">
            {nav.map(([label, href]) => (
              <Link
                key={href + label}
                href={href}
                className={cn(
                  "text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
                  isLight ? "text-navy hover:text-teal" : "text-white hover:text-teal-glow"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={settings.phoneHref}
              className={cn(
                "text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
                isLight ? "text-navy hover:text-teal" : "text-white hover:text-teal-glow"
              )}
            >
              {settings.phone}
            </a>
            <a href="#callback" className="btn-header">Заказать звонок</a>
            <a href={settings.whatsappHref} className={isLight ? "icon-button-light" : "icon-button"} aria-label="Написать в WhatsApp">
              WA
            </a>
          </div>
          <button className={cn(isLight ? "icon-button-light" : "icon-button", "lg:hidden")} type="button" onClick={() => setOpen(true)} aria-label="Открыть меню">
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className={cn("fixed inset-0 z-[60] bg-navy/60 transition lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")} onClick={() => setOpen(false)} />
      <aside
        className={cn(
          "fixed bottom-0 right-0 top-0 z-[70] w-full max-w-sm bg-white p-6 shadow-soft transition-transform lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-navy">Меню</span>
          <button className="icon-button-light" type="button" onClick={() => setOpen(false)} aria-label="Закрыть меню">
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <nav className="mt-8 grid gap-3" aria-label="Мобильное меню">
          {nav.map(([label, href]) => (
            <Link key={href + label} href={href} className="rounded-2xl px-4 py-3 text-base font-semibold text-navy hover:bg-surface" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
        <a className="btn-primary mt-8 w-full justify-center" href={settings.phoneHref}>
          <Phone size={18} aria-hidden="true" />
          Позвонить
        </a>
      </aside>

      <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-white/95 p-2 shadow-soft backdrop-blur lg:hidden">
        <a className="mobile-cta" href={settings.phoneHref}>Позвонить</a>
        <a className="mobile-cta" href={settings.whatsappHref}>WhatsApp</a>
        <a className="mobile-cta bg-teal text-white" href="#quiz">Рассчитать</a>
      </div>
    </>
  );
}
