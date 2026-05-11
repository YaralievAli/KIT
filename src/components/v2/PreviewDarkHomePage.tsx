import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Calculator,
  ChevronDown,
  CheckCircle2,
  Clock3,
  Factory,
  MapPin,
  Ruler,
  Wrench,
} from "lucide-react";
import type { SVGProps } from "react";
import { PreviewDarkCalculator } from "@/components/v2/PreviewDarkCalculator";
import { PreviewDarkFinalForm } from "@/components/v2/PreviewDarkFinalForm";
import { PreviewDarkHeader } from "@/components/v2/PreviewDarkHeader";
import { PreviewDarkFooter } from "@/components/v2/PreviewDarkFooter";
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
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_26%_32%,rgba(20,184,166,0.11),transparent_34%)]" aria-hidden="true" />

      <div className={`${shell} relative z-10 grid min-h-[560px] items-center gap-5 pb-7 pt-5 sm:min-h-[610px] sm:gap-8 sm:pb-14 sm:pt-6 lg:grid-cols-12 lg:pb-16 lg:pt-7 xl:min-h-[650px]`}>
        <div className="max-w-[670px] lg:col-span-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-[#061112]/46 px-3.5 py-2 text-xs font-semibold text-teal-glow backdrop-blur sm:px-4 sm:text-sm">
            <MapPin size={16} aria-hidden="true" />
            Санкт-Петербург и Ленинградская область
          </p>
          <h1 className="mt-4 text-[42px] font-semibold leading-[0.94] tracking-tight sm:mt-5 sm:text-6xl xl:text-[74px]">
            Кухни на заказ
            <span className="block text-teal-glow">в СПБ и ЛО</span>
          </h1>
          <p className="mt-3 max-w-xl text-[17px] leading-7 text-white/78 sm:mt-5 sm:text-lg sm:leading-7">
            Подберём планировку, материалы и ориентировочный бюджет. Точная стоимость формируется после замера и проекта.
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <a className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-teal px-6 text-base font-semibold text-white shadow-[0_14px_34px_rgba(13,148,136,0.3)] transition hover:bg-teal-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow sm:w-auto sm:px-7 sm:text-sm" href="#quiz">
              Рассчитать стоимость
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-white/36 bg-[#061112]/18 px-6 text-base font-semibold text-white transition hover:bg-champagne hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne sm:min-h-[54px] sm:w-auto sm:border-champagne/80 sm:bg-[#101a2b]/36 sm:px-7 sm:text-sm" href="#layouts">
              Смотреть каталог
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-2.5 max-w-xl rounded-lg border border-white/[0.08] bg-[#071314]/28 px-3 py-2 text-[11px] leading-4 text-white/66 backdrop-blur-sm sm:mt-4 sm:rounded-2xl sm:border-white/10 sm:bg-[#071314]/38 sm:px-4 sm:py-3 sm:text-sm sm:leading-5">
            <div className="flex items-center gap-2 font-semibold text-white/76 sm:text-white/80">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-glow" aria-hidden="true" />
              <span>Предварительный расчёт · 5 вопросов без телефона на первом шаге</span>
            </div>
            <div className="mt-1 hidden pl-3.5 text-xs font-semibold uppercase leading-4 tracking-wide text-white/48 sm:block">
              Планировка · Стиль · Бюджет · контакт только в конце
            </div>
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:mt-4 sm:grid-cols-4 sm:gap-3 lg:max-w-[620px]">
            {heroCards.map(({ icon: Icon, title }) => (
              <div key={title} className="min-h-[50px] rounded-lg border border-white/[0.08] bg-white/[0.035] p-2 backdrop-blur-sm sm:min-h-[90px] sm:rounded-2xl sm:border-white/10 sm:bg-white/[0.055] sm:p-3.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal/8 text-champagne sm:h-auto sm:w-auto sm:bg-transparent">
                  <Icon className="h-4 w-4 sm:h-7 sm:w-7" aria-hidden="true" />
                </span>
                <p className="mt-1 text-[11px] font-semibold leading-4 text-white/88 sm:mt-2 sm:text-sm sm:leading-5 sm:text-white">{title}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 flex max-w-[650px] flex-wrap gap-x-2 gap-y-1 text-xs leading-5 text-white/70 sm:mt-4 sm:gap-x-4 sm:text-sm sm:leading-6">
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
    <section className="relative z-10 hidden bg-[#f5f7f7] pb-4 pt-3 sm:pb-5 sm:pt-5 lg:-mt-8 lg:block">
      <div className={`${shell} grid gap-2.5 md:grid-cols-2 md:gap-4 xl:grid-cols-4`}>
        {trustItems.map((item, index) => {
          const Icon = trustIcons[index] ?? CheckCircle2;
          return (
            <article key={item.title} className="rounded-2xl border border-white bg-white p-3 shadow-[0_10px_30px_rgba(16,26,43,0.07)] sm:rounded-[22px] sm:p-5 sm:shadow-[0_18px_45px_rgba(16,26,43,0.11)]">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/8 text-teal sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 sm:h-8 sm:w-8" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-navy sm:text-base">{item.title}</h2>
                  <p className="mt-0.5 text-xs leading-4 text-muted sm:mt-1 sm:text-sm sm:leading-5">{item.text}</p>
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
    <section id="quiz" className="pb-6 pt-2 lg:pb-8 lg:pt-3">
      <div className={`${shell} grid gap-4 lg:gap-6 xl:grid-cols-12`}>
        <div className="min-w-0 xl:col-span-6">
        <PreviewDarkCalculator />
        </div>

        <article id="layouts" className="min-w-0 overflow-hidden rounded-[22px] bg-white p-4 shadow-[0_12px_34px_rgba(16,26,43,0.07)] md:p-6 lg:rounded-[28px] lg:shadow-[0_18px_45px_rgba(16,26,43,0.08)] xl:col-span-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal">Каталог</p>
              <h2 className="mt-1 text-2xl font-semibold text-navy sm:text-3xl">Выберите планировку кухни</h2>
            </div>
            <Link href="#projects" className="hidden items-center gap-2 text-sm font-semibold text-teal sm:inline-flex">
              Смотреть варианты
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="-mx-4 mt-4 flex snap-x gap-3 overflow-x-auto px-4 pb-0 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 2xl:grid-cols-4">
            {imageMap.layouts.map((layout, index) => (
              <article key={layout.title} className="w-[76vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-[18px] border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(16,26,43,0.12)] sm:w-auto sm:max-w-none">
                <div className="relative aspect-[16/10] sm:aspect-[4/3]">
                  <Image src={layout.image} alt={layout.alt} fill sizes={layout.sizes} loading="lazy" className="object-cover" />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold leading-tight text-navy">{layout.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted sm:min-h-10">{layoutDescriptions[index]}</p>
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
    <section className="pb-6 sm:pb-7">
      <div className={shell}>
        <div className="rounded-[24px] bg-[#061112] p-3.5 text-white md:rounded-none md:bg-transparent md:p-0 md:text-inherit md:shadow-none">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-glow md:text-teal">Подбор образа</p>
            <h2 className="mt-1 text-3xl font-semibold text-white md:text-navy">Стили будущей кухни</h2>
          </div>
          <a href="#quiz" className="hidden items-center gap-2 text-sm font-semibold text-teal sm:inline-flex">
            Подобрать стиль
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="mt-2 flex items-center justify-between text-xs font-semibold text-white/58 md:hidden">
          <span>Листайте вправо</span>
          <ArrowRight size={18} className="text-teal-glow" aria-hidden="true" />
        </p>
        <div className="relative">
          <div className="-mx-3.5 mt-3 flex snap-x gap-3 overflow-x-auto px-3.5 pb-0 md:mx-0 md:mt-4 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4">
            {imageMap.styles.map((style, index) => (
              <article key={style.title} className="group relative min-h-[158px] w-[72vw] max-w-[290px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-navy shadow-sm md:min-h-[154px] md:w-auto md:max-w-none md:rounded-[22px]">
                <Image src={style.image} alt={style.alt} fill sizes={style.sizes} loading="lazy" className="object-cover opacity-82 transition group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-white md:gap-4 md:p-4">
                  <div>
                    <h3 className="text-base font-semibold md:text-lg">{style.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/70">{styleDescriptions[index]}</p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-teal md:h-9 md:w-9">
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </article>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#061112] to-transparent md:hidden" aria-hidden="true" />
        </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsShowcase({ title }: { title: string }) {
  return (
    <section id="projects" className="pb-6 sm:pb-7">
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
        <div className="-mx-4 mt-4 flex snap-x gap-3 overflow-x-auto px-4 pb-0 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 2xl:grid-cols-6">
          {projects.map((project) => (
            <article key={project.id} className="w-[74vw] max-w-[290px] shrink-0 snap-start overflow-hidden rounded-[18px] border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(16,26,43,0.12)] sm:w-auto sm:max-w-none">
              <div className="relative aspect-[16/10] sm:aspect-[4/3]">
                <Image src={project.image} alt={project.alt} fill sizes={project.sizes} loading="lazy" className="object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-navy">{projectBadge(project)}</span>
              </div>
              <div className="p-3 sm:p-3.5">
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
    <section className="pb-6 sm:pb-7">
      <div className={shell}>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal">Практичные решения</p>
          <h2 className="mt-1 text-2xl font-semibold text-navy sm:text-3xl">Материалы и фурнитура</h2>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-4 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
          {imageMap.materials.map((item, index) => (
            <article key={item.title} className="relative min-h-[118px] overflow-hidden rounded-2xl bg-navy p-3 text-white shadow-sm sm:min-h-[148px] sm:rounded-[22px] sm:p-4">
              <Image src={item.image} alt={item.alt} fill sizes={item.sizes} loading="lazy" className="object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
              <div className="relative">
                <h3 className="text-sm font-semibold leading-tight sm:text-lg">{item.title}</h3>
                <p className="mt-1 line-clamp-2 max-w-[16rem] text-xs leading-4 text-white/75 sm:mt-2 sm:text-sm sm:leading-5">{materialDescriptions[index]}</p>
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
    <section className="pb-6 sm:pb-7">
      <div className={shell}>
        <p className="text-sm font-semibold uppercase tracking-wide text-teal">Понятный маршрут</p>
        <h2 className="mt-1 text-2xl font-semibold text-navy sm:text-3xl">Как мы работаем</h2>
        <div className="mt-3 rounded-[20px] bg-white px-4 py-3 shadow-sm sm:mt-4 sm:rounded-[24px] sm:px-5 sm:py-4">
          <div className="grid gap-2.5 md:grid-cols-5 md:gap-4">
            {processSteps.map(([title, text], index) => (
              <article key={title} className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-3 md:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-teal/25 bg-teal/8 text-xs font-semibold text-teal md:h-12 md:w-12 md:text-sm">
                    {index + 1}
                  </span>
                  {index < processSteps.length - 1 ? <span className="hidden h-px flex-1 border-t border-dashed border-teal/35 md:block" /> : null}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy md:mt-2">{title}</h3>
                  <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-muted md:mt-1 md:line-clamp-none">{text}</p>
                </div>
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
    <section id="production" className="bg-[#062e30] py-6 text-white sm:py-10">
      <div className={`${shell} grid gap-5 lg:grid-cols-12 lg:items-center lg:gap-8`}>
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-glow">Производственная база</p>
          <h2 className="text-2xl font-semibold md:text-4xl">Собственное производство</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/72 sm:mt-3 sm:leading-7">
            Контролируем качество на каждом этапе — от проекта до установки. Условия и сроки фиксируются до запуска работ.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-1.5 md:mt-6 md:grid-cols-4 md:gap-3">
            {productionStats.map((item) => (
              <div key={item} className="rounded-lg bg-white/[0.06] px-2 py-2 text-center sm:rounded-xl sm:border sm:border-white/15 sm:p-5">
                <p className="text-xs font-semibold leading-4 text-teal-glow sm:text-lg sm:leading-normal">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="-mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-0 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 lg:col-span-7">
          {imageMap.production.map((item) => (
            <article key={item.title} className="w-[70vw] max-w-[270px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white/[0.07] shadow-sm md:w-auto md:max-w-none md:rounded-[20px] md:border md:border-white/15 md:shadow-[0_18px_55px_rgba(0,0,0,0.22)]">
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
  const visibleFaq = faq.slice(0, 8);
  const visibleReviews = reviews.slice(0, 3);

  return (
    <section id="reviews" className="pb-6 sm:pb-7">
      <div className={`${shell} grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)] lg:items-start`}>
        <article className="rounded-[24px] bg-white p-4 shadow-[0_12px_34px_rgba(16,26,43,0.07)] md:p-6 lg:rounded-[28px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal">Обратная связь</p>
              <h2 className="mt-1 text-2xl font-semibold text-navy sm:text-3xl">Отзывы наших клиентов</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Публикуем отзывы без неподтверждённых рейтингов и громких цифр. Источник указан как ориентир, подтверждение отзывов уточняется отдельно.
              </p>
            </div>
            <a href="#contacts" className="inline-flex items-center gap-2 text-sm font-semibold text-teal">
              Связаться
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {visibleReviews.map((review) => (
              <article key={review.id} className="rounded-2xl border border-border bg-surface p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-sm font-semibold text-teal sm:h-11 sm:w-11">
                    {review.name.slice(0, 1)}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-navy">{review.name}</h3>
                    <p className="text-xs leading-5 text-muted">{review.district}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{review.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-semibold text-muted">
                    {review.source}
                  </span>
                  {!review.verified ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-semibold text-muted">
                      без рейтинга
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </article>

        <aside id="faq" className="rounded-[24px] bg-white p-4 shadow-[0_12px_34px_rgba(16,26,43,0.07)] md:p-6 lg:rounded-[28px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal">FAQ</p>
            <h2 className="mt-1 text-2xl font-semibold text-navy sm:text-3xl">Часто задаваемые вопросы</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Собрали основные вопросы о расчёте, замере, сроках, материалах и договоре.
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            {visibleFaq.map((item, index) => (
              <details key={item.id} className="group rounded-2xl border border-border bg-surface">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-navy marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs font-semibold text-teal">
                      {index + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown className="shrink-0 transition group-open:rotate-180" size={18} aria-hidden="true" />
                </summary>
                <p className="px-4 pb-4 pl-14 text-sm leading-6 text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    // Extra mobile bottom padding keeps the submit button clear of the fixed bottom CTA.
    <section id="callback" className="relative isolate min-h-[540px] overflow-hidden bg-[#062e30] pb-36 pt-12 text-white lg:py-14">
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
