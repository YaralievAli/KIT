import Image from "next/image";
import Link from "next/link";
import { imageMap } from "@/content/images-map";
import { siteSettings as fallbackSettings } from "@/content/settings";
import type { SiteSettings } from "@/types/content";

export function Footer({ settings = fallbackSettings }: { settings?: SiteSettings }) {
  return (
    <footer id="contacts" className="bg-navy pb-24 pt-14 text-white lg:pb-10">
      <div className="container-page grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src={imageMap.logo.iconFramed} alt={imageMap.logo.iconFramedAlt} width={46} height={46} style={{ width: 46, height: 46 }} />
            <span className="text-2xl font-semibold">КИТ</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">{settings.description}</p>
        </div>
        <FooterColumn title="Навигация" links={[["Главная", "/"], ["Примеры", "/#projects"], ["Расчёт", "/#quiz"], ["FAQ", "/#faq"]]} />
        <FooterColumn title="Услуги" links={[["Угловые кухни", "/uglovye-kuhni-spb"], ["Кухни до потолка", "/kuhni-do-potolka"], ["Кухни с островом", "/kuhni-s-ostrovom"]]} />
        <div>
          <h3 className="font-semibold">Контакты</h3>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <a href={settings.phoneHref}>{settings.phone}</a>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <span>{settings.address}</span>
            <span>{settings.workingHours}</span>
          </div>
          <div className="mt-5 flex gap-2">
            <a className="social-link" href={settings.vkHref}>VK</a>
            <a className="social-link" href={settings.telegramHref}>TG</a>
            <a className="social-link" href={settings.whatsappHref}>WA</a>
          </div>
        </div>
      </div>
      <div className="container-page mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
        <span>© 2026 КИТ. Кухни на заказ в Санкт-Петербурге и Ленинградской области.</span>
        <div className="flex gap-4">
          <Link href="/privacy">Политика конфиденциальности</Link>
          <Link href="/personal-data-consent">Согласие на обработку данных</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm text-white/70">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
