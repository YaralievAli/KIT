import Image from "next/image";
import Link from "next/link";
import { SocialIconButtons } from "@/components/ui/SocialIconButtons";
import { imageMap } from "@/content/images-map";
import { siteSettings } from "@/content/settings";

const shell = "mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10";

export function PreviewDarkFooter() {
  return (
    <footer id="contacts" className="bg-[#061112] pb-24 pt-8 text-white lg:pb-8">
      <div className={`${shell} grid gap-8 border-b border-white/10 pb-7 md:grid-cols-[1.1fr_0.8fr_0.8fr_1fr_0.9fr]`}>
        <div>
          <div className="flex items-center gap-4">
            <Image src={imageMap.logo.icon} alt={imageMap.logo.iconAlt} width={92} height={58} style={{ width: 92, height: "auto" }} />
            <span className="text-[2.5rem] font-extrabold leading-none tracking-[0.055em]">КИТ</span>
          </div>
          <div className="mt-4 max-w-sm">
            <p className="text-lg font-semibold leading-7 text-white">Кухни на заказ в СПб и ЛО</p>
            <p className="mt-2 text-sm leading-6 text-white/72">с практичным проектированием, производством и сборкой.</p>
          </div>
          <SocialIconButtons settings={siteSettings} include={["vk", "telegram", "max"]} className="mt-5" />
        </div>
        <FooterLinks title="Навигация" links={[["Кухни", "/#layouts"], ["Каталог", "/#projects"], ["Расчёт", "/#quiz"], ["Отзывы", "/#reviews"]]} />
        <FooterLinks title="Услуги" links={[["Дизайн-проект", "/#quiz"], ["Производство", "/#production"], ["Оплата частями", "/#callback"]]} />
        <div>
          <h3 className="font-semibold">Контакты</h3>
          <div className="mt-4 grid gap-2 text-sm text-white/72">
            <a href={siteSettings.phoneHref} className="transition hover:text-white">{siteSettings.phone}</a>
            <a href={`mailto:${siteSettings.email}`} className="transition hover:text-white">{siteSettings.email}</a>
            <span>{siteSettings.address}</span>
            <span>{siteSettings.workingHours}</span>
          </div>
        </div>
        <div className="md:text-right">
          <Link href="/#callback" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-champagne px-7 text-sm font-semibold text-champagne transition hover:bg-champagne hover:text-navy">
            Заказать звонок
          </Link>
          <p className="mt-3 text-xs text-white/66">Перезвоним в рабочее время</p>
        </div>
      </div>
      <div className={`${shell} mt-4 flex flex-col gap-3 text-xs text-white/66 md:flex-row md:items-center md:justify-between`}>
        <span>© 2026 КИТ — кухни на заказ в СПб и ЛО</span>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="transition hover:text-white">Политика конфиденциальности</Link>
          <Link href="/personal-data-consent" className="transition hover:text-white">Согласие на обработку данных</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm text-white/72">
        {links.map(([label, href]) => (
          <a key={label + href} href={href} className="transition hover:text-white">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
