import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Calculator,
  CheckCircle2,
  Clock3,
  Factory,
  MapPin,
  Ruler,
  Wrench,
} from "lucide-react";
import type { SVGProps } from "react";
import { PreviewDarkCalculator } from "@/components/v2/PreviewDarkCalculator";
import { PreviewDarkFAQ } from "@/components/v2/PreviewDarkFAQ";
import { PreviewDarkFinalForm } from "@/components/v2/PreviewDarkFinalForm";
import { PreviewDarkHeader } from "@/components/v2/PreviewDarkHeader";
import { SocialIconButtons } from "@/components/ui/SocialIconButtons";
import { faqItems } from "@/content/faq";
import { imageMap } from "@/content/images-map";
import { processSteps, productionStats, styleDescriptions, trustItems } from "@/content/home";
import { projects, projectSectionTitle } from "@/content/projects";
import { reviews } from "@/content/reviews";
import { siteSettings } from "@/content/settings";
import { projectBadge } from "@/lib/helpers";
import type { FAQItem, Review } from "@/types/content";

const shell = "mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10";
const trustIcons = [Factory, Clock3, BadgePercent, MapPin];
const heroCards = [
  { icon: BadgePercent, title: "Оплата частями" },
  { icon: Calculator, title: "Расчёт онлайн" },
  { icon: Ruler, title: "Проектные решения" },
  { icon: Wrench, title: "Сборка под ключ" },
];
const layoutDescriptions = [
  "Оптимально для большинства помещений",
  "Эргономичное решение для вытянутых помещений",
  "Максимум хранения и цельный внешний вид",
  "Для просторных кухонь и зоны общения",
];
const materialDescriptions = [
  "Подбирается под бюджет, стиль и сценарии кухни.",
  "Практичная рабочая поверхность на каждый день.",
  "Петли, направляющие и механизмы под задачу.",
  "Корпусные материалы с понятными свойствами.",
];
const finalCtaBenefits = [
  "Проектные рекомендации",
  "Подбор материалов и фурнитуры",
  "Предварительный расчёт без скрытых обещаний",
  "Ответ в рабочее время",
];

export function PreviewDarkHomePage() {
  const visibleFaq = faqItems.filter((item) => item.visible).sort((a, b) => a.order - b.order);
  const visibleReviews = reviews.filter((review) => review.visible);
  const projectTitle = projectSectionTitle(projects);

  return (
    <>
      <PreviewDarkHeader />
      <main className="bg-[#f5f7f7] text-navy">
        <Hero />
        <TrustStrip />
        <TopCommercialBlock />
        <StylesShowcase />
        <ProjectsShowcase title={projectTitle} />
        <MaterialsShowcase />
        <ProcessStrip />
        <ProductionShowcase />
        <ReviewsAndFaq reviews={visibleReviews} faq={visibleFaq} />
        <FinalCta />
      </main>
      <PreviewDarkFooter />
    </>
  );
}

function Hero() {
  const heroBackground = imageMap.previewDark.heroBackground;

  return (
    <section id="preview-dark-hero" className="relative isolate overflow-hidden bg-[#061112] pt-[76px] text-white">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={heroBackground.image}
          alt=""
          fill
          preload={heroBackground.preload}
          sizes={heroBackground.sizes}
          aria-hidden="true"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,18,0.18)_0%,rgba(6,17,18,0.1)_46%,rgba(6,17,18,0.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#061112]/82 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#061112]/38 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_25%_35%,rgba(20,184,166,0.18),transparent_32%)]" aria-hidden="true" />

      <div className={`${shell} relative z-10 grid min-h-[610px] items-center gap-8 pb-12 pt-6 sm:pb-14 lg:grid-cols-12 lg:pb-16 lg:pt-7 xl:min-h-[650px]`}>
        <div className="max-w-[670px] lg:col-span-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal/35 bg-teal/10 px-4 py-2 text-sm font-semibold text-teal-glow">
            <MapPin size={16} aria-hidden="true" />
            Санкт-Петербург и Ленинградская область
          </p>
          <h1 className="mt-5 text-[42px] font-semibold leading-[0.98] tracking-tight sm:text-6xl xl:text-[74px]">
            Кухни на заказ
            <span className="block text-teal-glow">в СПБ и ЛО</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-7 text-white/76">
            Подберём планировку, материалы и ориентировочный бюджет. Точная стоимость формируется после замера и проекта.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-teal px-7 text-sm font-semibold text-white shadow-[0_16px_44px_rgba(13,148,136,0.34)] transition hover:bg-teal-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow" href="#quiz">
              Рассчитать стоимость
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl border border-champagne/80 bg-[#101a2b]/36 px-7 text-sm font-semibold text-white transition hover:bg-champagne hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne" href="#layouts">
              Смотреть каталог
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-4 max-w-xl rounded-2xl border border-white/10 bg-[#071314]/42 px-4 py-3 text-sm leading-5 text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-2 font-semibold text-white/82">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-glow" aria-hidden="true" />
              <span>Предварительный расчёт · 5 вопросов без телефона на первом шаге</span>
            </div>
            <div className="mt-1 pl-3.5 text-xs font-semibold uppercase tracking-wide text-white/48">
              Планировка · Стиль · Бюджет · контакт только в конце
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-[620px]">
            {heroCards.map(({ icon: Icon, title }) => (
              <div key={title} className="min-h-[90px] rounded-2xl border border-white/14 bg-white/[0.075] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <Icon className="text-champagne" size={28} aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold leading-5 text-white">{title}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 flex max-w-[650px] flex-wrap gap-x-4 gap-y-1 text-sm leading-6 text-white/70">
            <span>Гарантийные условия по договору</span>
            <span className="text-champagne">•</span>
            <span>Прозрачный договор</span>
            <span className="text-champagne">•</span>
            <span>Стоимость после проекта</span>
          </p>
        </div>

        <div className="relative hidden min-h-[340px] lg:col-span-7 lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="relative z-10 bg-[#f5f7f7] pb-5 pt-5 lg:-mt-8">
      <div className={`${shell} grid gap-4 md:grid-cols-2 xl:grid-cols-4`}>
        {trustItems.map((item, index) => {
          const Icon = trustIcons[index] ?? CheckCircle2;
          return (
            <article key={item.title} className="rounded-[22px] border border-white bg-white p-5 shadow-[0_18px_45px_rgba(16,26,43,0.11)]">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal/8 text-teal">
                  <Icon size={32} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-navy">{item.title}</h2>
                  <p className="mt-1 text-sm leading-5 text-muted">{item.text}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TopCommercialBlock() {
  return (
    <section id="quiz" className="pb-8 pt-3">
      <div className={`${shell} grid gap-6 xl:grid-cols-12`}>
        <div className="xl:col-span-6">
        <PreviewDarkCalculator />
        </div>

        <article id="layouts" className="rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(16,26,43,0.08)] md:p-6 xl:col-span-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal">Каталог</p>
              <h2 className="mt-1 text-3xl font-semibold text-navy">Выберите планировку кухни</h2>
            </div>
            <Link href="#projects" className="hidden items-center gap-2 text-sm font-semibold text-teal sm:inline-flex">
              Смотреть варианты
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {imageMap.layouts.map((layout, index) => (
              <article key={layout.title} className="overflow-hidden rounded-[18px] border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(16,26,43,0.12)]">
                <div className="relative aspect-[4/3]">
                  <Image src={layout.image} alt={layout.alt} fill sizes={layout.sizes} loading="lazy" className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-navy">{layout.title}</h3>
                  <p className="mt-1 min-h-10 text-sm leading-5 text-muted">{layoutDescriptions[index]}</p>
                  <a href="#quiz" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal">
                    Смотреть варианты
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function StylesShowcase() {
  return (
    <section className="pb-7">
      <div className={shell}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal">Подбор образа</p>
            <h2 className="mt-1 text-3xl font-semibold text-navy">Стили будущей кухни</h2>
          </div>
          <a href="#quiz" className="hidden items-center gap-2 text-sm font-semibold text-teal sm:inline-flex">
            Подобрать стиль
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {imageMap.styles.map((style, index) => (
            <article key={style.title} className="group relative min-h-[154px] overflow-hidden rounded-[22px] bg-navy shadow-sm">
              <Image src={style.image} alt={style.alt} fill sizes={style.sizes} loading="lazy" className="object-cover opacity-82 transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-white">
                <div>
                  <h3 className="text-lg font-semibold">{style.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/70">{styleDescriptions[index]}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-teal">
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsShowcase({ title }: { title: string }) {
  return (
    <section id="projects" className="pb-7">
      <div className={shell}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal">Примеры под разные задачи</p>
            <h2 className="mt-1 text-3xl font-semibold text-navy">{title}</h2>
          </div>
          <a href="#quiz" className="inline-flex items-center gap-2 text-sm font-semibold text-teal">
            Рассчитать похожий вариант
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
          Смотрите сочетания планировок, материалов и настроения кухни. Для каждой карточки можно запросить похожий предварительный расчёт.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {projects.map((project) => (
            <article key={project.id} className="overflow-hidden rounded-[18px] border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(16,26,43,0.12)]">
              <div className="relative aspect-[4/3]">
                <Image src={project.image} alt={project.alt} fill sizes={project.sizes} loading="lazy" className="object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-navy">{projectBadge(project)}</span>
              </div>
              <div className="p-3.5">
                <h3 className="text-sm font-semibold text-navy">{project.title}</h3>
                <p className="mt-1 text-xs leading-5 text-muted">{project.area} · {project.district}</p>
                <p className="mt-2 text-sm font-semibold text-teal">{project.priceFrom}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MaterialsShowcase() {
  return (
    <section className="pb-7">
      <div className={shell}>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal">Практичные решения</p>
          <h2 className="mt-1 text-3xl font-semibold text-navy">Материалы и фурнитура</h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {imageMap.materials.map((item, index) => (
            <article key={item.title} className="relative min-h-[148px] overflow-hidden rounded-[22px] bg-navy p-4 text-white shadow-sm">
              <Image src={item.image} alt={item.alt} fill sizes={item.sizes} loading="lazy" className="object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
              <div className="relative">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 max-w-[16rem] text-sm leading-5 text-white/75">{materialDescriptions[index]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStrip() {
  return (
    <section className="pb-7">
      <div className={shell}>
        <p className="text-sm font-semibold uppercase tracking-wide text-teal">Понятный маршрут</p>
        <h2 className="mt-1 text-3xl font-semibold text-navy">Как мы работаем</h2>
        <div className="mt-4 rounded-[24px] bg-white px-5 py-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-5">
            {processSteps.map(([title, text], index) => (
              <article key={title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal/30 bg-teal/8 text-sm font-semibold text-teal">
                    {index + 1}
                  </span>
                  {index < processSteps.length - 1 ? <span className="hidden h-px flex-1 border-t border-dashed border-teal/35 md:block" /> : null}
                </div>
                <h3 className="mt-2 text-sm font-semibold text-navy">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductionShowcase() {
  return (
    <section id="production" className="bg-[#062e30] py-10 text-white">
      <div className={`${shell} grid gap-8 lg:grid-cols-12 lg:items-center`}>
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-glow">Производственная база</p>
          <h2 className="text-3xl font-semibold md:text-4xl">Собственное производство</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">
            Контролируем качество на каждом этапе — от проекта до установки. Условия и сроки фиксируются до запуска работ.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {productionStats.map((item) => (
              <div key={item} className="rounded-xl border border-white/15 bg-white/8 p-5 text-center">
                <p className="text-lg font-semibold text-teal-glow">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:col-span-7">
          {imageMap.production.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[20px] border border-white/15 bg-white/8 shadow-[0_18px_55px_rgba(0,0,0,0.22)]">
              <div className="relative aspect-[16/10]">
                <Image src={item.image} alt={item.alt} fill sizes={item.sizes} loading="lazy" className="object-cover" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsAndFaq({ reviews, faq }: { reviews: Review[]; faq: FAQItem[] }) {
  return (
    <section id="reviews" className="bg-white py-9">
      <div className={`${shell} grid gap-8 2xl:grid-cols-12`}>
        <div className="2xl:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal">Обратная связь</p>
          <h2 className="text-3xl font-semibold text-navy">Отзывы наших клиентов</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Публикуем отзывы без неподтверждённых рейтингов и громких цифр.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
            {reviews.map((review) => {
              const SourceIcon = getReviewSourceIcon(review.source);

              return (
                <article key={review.id} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-sm font-semibold text-teal">{review.name.slice(0, 1)}</span>
                    <div>
                      <h3 className="font-semibold text-navy">{review.name}</h3>
                      <p className="text-xs text-muted">{review.district}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{review.text}</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-semibold text-muted">
                      <SourceIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {review.source}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="2xl:col-span-7">
        <PreviewDarkFAQ items={faq} />
        </div>
      </div>
    </section>
  );
}

function getReviewSourceIcon(source: Review["source"]) {
  switch (source) {
    case "Яндекс.Карты":
      return YandexMapsSourceIcon;
    case "2ГИС":
      return TwoGisSourceIcon;
    case "ВКонтакте":
      return VkSourceIcon;
  }

  return VkSourceIcon;
}

function YandexMapsSourceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="7" fill="#FDE8E8" />
      <path d="M8 3.4a3.2 3.2 0 0 0-3.2 3.2c0 2.22 3.2 5.98 3.2 5.98s3.2-3.76 3.2-5.98A3.2 3.2 0 0 0 8 3.4Zm0 4.38A1.18 1.18 0 1 1 8 5.42a1.18 1.18 0 0 1 0 2.36Z" fill="#E53935" />
    </svg>
  );
}

function TwoGisSourceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="7" fill="#E8F7EF" />
      <path d="M4.7 5.1h6.6v2.1H6.9v1.15h3.56v2.1H4.7V8.64l2.97-1.45H4.7V5.1Z" fill="#1EA363" />
      <path d="M10.45 8.35h.85v2.1h-.85V8.35Z" fill="#2487C7" />
    </svg>
  );
}

function VkSourceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="7" fill="#E8F1FF" />
      <path d="M8.52 11.15H7.8c-2.45 0-3.84-1.68-4.89-4.48l-.29-.79H4.3c.3 0 .43.14.52.39.57 1.64 1.35 2.87 1.7 2.87.14 0 .2-.06.2-.41V7.12c-.05-.73-.42-.8-.42-1.07 0-.14.11-.27.29-.27h2.64c.25 0 .34.14.34.43v2.18c0 .24.1.32.17.32.14 0 .26-.08.51-.34.63-.7 1.08-1.77 1.08-1.77.06-.15.19-.29.48-.29h1.68c.51 0 .62.26.51.62-.21.67-2.27 3.19-2.27 3.19-.18.22-.25.33 0 .65.18.23.78.76 1.18 1.23.29.34.51.63.57.83.07.24-.12.37-.43.37h-1.87c-.28 0-.41-.09-.57-.28-.23-.27-.75-.94-1.24-.94-.25 0-.32.17-.32.44v.5c0 .27-.09.42-.51.42Z" fill="#2787F5" />
    </svg>
  );
}

function FinalCta() {
  return (
    <section id="callback" className="relative isolate min-h-[540px] overflow-hidden bg-[#062e30] py-12 text-white lg:py-14">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={imageMap.cta.background}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          aria-hidden="true"
          className="object-cover object-left opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,46,48,0.26)_0%,rgba(6,46,48,0.68)_48%,rgba(6,46,48,0.94)_78%,rgba(6,46,48,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,46,48,0.18)_0%,rgba(6,46,48,0.78)_100%)] md:bg-[linear-gradient(180deg,rgba(6,46,48,0.08)_0%,rgba(6,46,48,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_44%,rgba(20,184,166,0.18),transparent_34%)]" />
      </div>
      <div className={`${shell} relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center`}>
        <div className="lg:col-span-6 lg:pl-52 xl:pl-60">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-glow drop-shadow">Финальный шаг</p>
          <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.05] drop-shadow-[0_3px_16px_rgba(0,0,0,0.24)] md:text-[42px]">
            <span className="block">Рассчитаем стоимость</span>
            <span className="block text-white/78">вашей кухни бесплатно</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/78">
            Подберём понятный ориентир по бюджету и материалам без громких обещаний до замера и проекта.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-white/88 sm:grid-cols-2">
            {finalCtaBenefits.map((item) => (
              <p key={item} className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/12 bg-[#031b1c]/34 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[2px]">
                <CheckCircle2 size={18} className="shrink-0 text-teal-glow" aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6">
          <PreviewDarkFinalForm />
        </div>
      </div>
    </section>
  );
}

function PreviewDarkFooter() {
  return (
    <footer id="contacts" className="bg-[#061112] pb-24 pt-8 text-white lg:pb-8">
      <div className={`${shell} grid gap-8 border-b border-white/10 pb-7 md:grid-cols-[1.1fr_0.8fr_0.8fr_1fr_0.9fr]`}>
        <div>
          <div className="flex items-center gap-3">
            <Image src={imageMap.logo.iconFramed} alt={imageMap.logo.iconFramedAlt} width={60} height={60} style={{ width: 60, height: 60 }} />
            <span className="text-3xl font-semibold tracking-wide">КИТ</span>
          </div>
          <div className="mt-4 max-w-sm">
            <p className="text-lg font-semibold leading-7 text-white">Кухни на заказ в СПб и ЛО</p>
            <p className="mt-2 text-sm leading-6 text-white/60">с практичным проектированием, производством и сборкой.</p>
          </div>
          <SocialIconButtons settings={siteSettings} className="mt-5" />
        </div>
        <FooterLinks title="Навигация" links={[["Кухни", "#layouts"], ["Каталог", "#projects"], ["Расчёт", "#quiz"], ["Отзывы", "#reviews"]]} />
        <FooterLinks title="Услуги" links={[["Дизайн-проект", "#quiz"], ["Производство", "#production"], ["Оплата частями", "#callback"]]} />
        <div>
          <h3 className="font-semibold">Контакты</h3>
          <div className="mt-4 grid gap-2 text-sm text-white/60">
            <a href={siteSettings.phoneHref}>{siteSettings.phone}</a>
            <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
            <span>{siteSettings.address}</span>
            <span>{siteSettings.workingHours}</span>
          </div>
        </div>
        <div className="md:text-right">
          <a href="#callback" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-champagne px-7 text-sm font-semibold text-champagne transition hover:bg-champagne hover:text-navy">
            Заказать звонок
          </a>
          <p className="mt-3 text-xs text-white/50">Перезвоним в рабочее время</p>
        </div>
      </div>
      <div className={`${shell} mt-4 flex flex-col gap-3 text-xs text-white/50 md:flex-row md:items-center md:justify-between`}>
        <span>© 2026 КИТ — кухни на заказ в СПб и ЛО</span>
        <div className="flex gap-4">
          <Link href="/privacy">Политика конфиденциальности</Link>
          <Link href="/personal-data-consent">Согласие на обработку данных</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm text-white/60">
        {links.map(([label, href]) => (
          <a key={label + href} href={href} className="hover:text-white">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
