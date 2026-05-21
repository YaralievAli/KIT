import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  ChevronDown,
  CheckCircle2,
  Clock3,
  Factory,
  MapPin,
} from "lucide-react";
import type { SVGProps } from "react";
import { TrackedAnchor } from "@/components/analytics/TrackedAnchor";
import { PreviewDarkCalculator } from "@/components/v2/PreviewDarkCalculator";
import { PreviewDarkFinalForm } from "@/components/v2/PreviewDarkFinalForm";
import { PreviewDarkHeader } from "@/components/v2/PreviewDarkHeader";
import { PreviewDarkFooter } from "@/components/v2/PreviewDarkFooter";
import { faqItems } from "@/content/faq";
import { imageMap } from "@/content/images-map";
import { processSteps, styleDescriptions, trustItems } from "@/content/home";
import { projects, projectSectionTitle } from "@/content/projects";
import { reviews } from "@/content/reviews";
import { siteSettings } from "@/content/settings";
import type { AnalyticsReviewSource } from "@/lib/analytics";
import { projectBadge } from "@/lib/helpers";
import type { FAQItem, Review } from "@/types/content";

const shell = "mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10";
const trustIcons = [Factory, Clock3, BadgePercent, MapPin];
const heroTrustItems = ["Оплата частями", "проектные решения", "сборка под ключ"];
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
const productionProofItems = [
  {
    icon: CheckCircle2,
    title: "Контроль качества",
    text: "Проверяем размеры, сборку и готовность перед установкой.",
  },
  {
    icon: Clock3,
    title: "Сроки в договоре",
    text: "Фиксируем этапы и дату запуска работ.",
  },
  {
    icon: BadgePercent,
    title: "Гарантийные условия",
    text: "Прописываем обязательства и порядок обращения.",
  },
  {
    icon: MapPin,
    title: "СПБ и ЛО",
    text: "Работаем по Санкт-Петербургу и области.",
  },
];

export function PreviewDarkHomePage() {
  const visibleFaq = faqItems.filter((item) => item.visible).sort((a, b) => a.order - b.order);
  const visibleReviews = reviews.filter((review) => review.visible);
  const projectTitle = projectSectionTitle(projects);

  return (
    <>
      <PreviewDarkHeader />
      <main className="overflow-x-hidden bg-[#f5f7f7] text-navy">
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

      <div className={`${shell} relative z-10 grid min-h-[520px] items-stretch gap-5 pb-7 pt-8 sm:min-h-[590px] sm:gap-8 sm:pb-12 sm:pt-9 lg:grid-cols-12 lg:pb-14 lg:pt-10 xl:min-h-[630px]`}>
        <div className="flex max-w-[720px] flex-col lg:col-span-6 lg:min-h-[440px] xl:min-h-[490px]">
          <div className="shrink-0">
            <h1 className="max-w-3xl">
              <span className="block text-[52px] font-semibold leading-[0.92] tracking-tight text-white sm:text-7xl xl:text-[90px]">
                Кухни на заказ
              </span>
              <span className="mt-3 block max-w-[13rem] text-[24px] font-semibold leading-[1.08] text-teal-glow sm:hidden">
                в СПБ и ЛО
              </span>
              <span className="mt-4 hidden max-w-[27rem] text-[27px] font-medium leading-[1.1] text-teal-glow sm:block lg:max-w-[30rem] lg:text-[30px] xl:text-[34px]">
                <span className="block">в Санкт-Петербурге</span>
                <span className="block">и Ленинградской области</span>
              </span>
            </h1>
            <div className="mt-4 h-px w-[72%] max-w-[280px] bg-gradient-to-r from-champagne/70 via-champagne/35 to-transparent sm:mt-5 sm:w-[78%] sm:max-w-[500px] lg:w-[540px] lg:max-w-full" aria-hidden="true" />
            <p className="mt-5 max-w-xl text-[17px] leading-7 text-white/78 sm:text-lg sm:leading-7">
              Спроектируем кухню под ваши размеры и рассчитаем предварительную стоимость. Стоимость уточняется после замера, проекта и выбора материалов.
            </p>
          </div>
          <div className="mt-7 sm:mt-10 lg:mt-0 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:py-8 xl:py-9">
            <div>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <TrackedAnchor className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-teal px-6 text-base font-semibold text-white shadow-[0_14px_34px_rgba(13,148,136,0.3)] transition hover:bg-teal-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow sm:w-auto sm:px-7 sm:text-sm" href="#quiz" eventName="hero_calculate_click" eventParams={{ sourcePage: "homepage-calculator" }}>
                  Рассчитать стоимость
                  <ArrowRight size={18} aria-hidden="true" />
                </TrackedAnchor>
                <TrackedAnchor className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-white/36 bg-[#061112]/18 px-6 text-base font-semibold text-white transition hover:bg-champagne hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne sm:min-h-[54px] sm:w-auto sm:border-champagne/80 sm:bg-[#101a2b]/36 sm:px-7 sm:text-sm" href="#layouts" eventName="hero_catalog_click">
                  Смотреть каталог
                  <ArrowRight size={18} aria-hidden="true" />
                </TrackedAnchor>
              </div>
              <p className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/[0.08] bg-[#071314]/24 px-3.5 py-2 text-xs font-semibold leading-5 text-white/72 backdrop-blur-sm sm:text-sm">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-glow" aria-hidden="true" />
                <span>Расчёт в 5 шагов · телефон — только в конце</span>
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 pb-1 sm:mt-7 lg:mt-0">
            {heroTrustItems.map((item) => (
              <span key={item} className="rounded-full border border-white/[0.08] bg-[#071314]/28 px-3 py-1.5 text-xs font-semibold leading-5 text-white/62 backdrop-blur-sm sm:text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[320px] lg:col-span-6 lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="relative z-10 bg-[#f5f7f7] pb-2.5 pt-2 sm:pb-3.5 sm:pt-3 lg:-mt-6 lg:pt-2.5">
      <div className={`${shell} -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-0.5 sm:-mx-6 sm:px-6 md:mx-auto md:grid md:grid-cols-2 md:gap-2.5 md:overflow-visible md:px-6 lg:px-10 xl:grid-cols-4`}>
        {trustItems.map((item, index) => {
          const Icon = trustIcons[index] ?? CheckCircle2;
          return (
            <article key={item.title} className="w-[68vw] max-w-[238px] shrink-0 snap-start rounded-xl border border-white/75 bg-white/86 p-2 shadow-[0_6px_16px_rgba(16,26,43,0.045)] md:w-auto md:max-w-none lg:rounded-2xl lg:p-2.5 lg:shadow-[0_8px_20px_rgba(16,26,43,0.052)]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal/9 text-teal lg:h-8 lg:w-8">
                  <Icon className="h-[15px] w-[15px] lg:h-4 lg:w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-xs font-semibold text-navy sm:text-[13px]">{item.title}</h2>
                  <p className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-muted">{item.text}</p>
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
      <div className={`${shell} grid gap-4 lg:gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start 2xl:grid-cols-[minmax(0,1fr)_400px]`}>
        <div className="min-w-0">
          <PreviewDarkCalculator />
        </div>

        <article id="layouts" className="min-w-0 overflow-hidden rounded-[20px] bg-white p-3 shadow-[0_10px_28px_rgba(16,26,43,0.055)] md:p-4 lg:rounded-[24px] lg:shadow-[0_14px_32px_rgba(16,26,43,0.06)]">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">Каталог</p>
              <h2 className="mt-1 text-xl font-semibold text-navy sm:text-2xl xl:text-xl 2xl:text-2xl">Планировки кухни</h2>
            </div>
            <Link href="#projects" className="hidden items-center gap-1.5 text-xs font-semibold text-teal sm:inline-flex">
              Смотреть все варианты
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="-mx-3 mt-3 flex snap-x gap-2.5 overflow-x-auto px-3 pb-0 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-2.5 sm:overflow-visible sm:px-0 sm:pb-0 2xl:gap-3">
            {imageMap.layouts.map((layout, index) => (
              <article key={layout.title} className="w-[68vw] max-w-[250px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_6px_18px_rgba(16,26,43,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(16,26,43,0.08)] sm:w-auto sm:max-w-none">
                <div className="relative h-[112px] sm:h-[92px] xl:h-[68px] 2xl:h-[78px]">
                  <Image src={layout.image} alt={layout.alt} fill sizes={layout.sizes} loading="lazy" className="object-cover" />
                </div>
                <div className="p-2 2xl:p-2.5">
                  <h3 className="line-clamp-1 text-[13px] font-semibold leading-tight text-navy 2xl:text-sm">{layout.title}</h3>
                  <p className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-muted 2xl:text-xs">{layoutDescriptions[index]}</p>
                  <a href="#quiz" className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-teal 2xl:text-xs">
                    Смотреть
                    <ArrowRight size={13} aria-hidden="true" />
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
          <div className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-3 lg:mt-6">
            {productionProofItems.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-white/12 bg-white/[0.06] p-3.5 shadow-[0_14px_36px_rgba(0,0,0,0.12)] sm:p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal-glow">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold leading-5 text-white">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-white/64">{text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="-mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:px-0 lg:col-span-7 lg:gap-4">
          {imageMap.production.map((item, index) => (
            <article
              key={item.title}
              className="w-[68vw] max-w-[250px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] shadow-sm md:w-auto md:max-w-none md:rounded-[20px] md:shadow-[0_16px_44px_rgba(0,0,0,0.2)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0A3A3B]">
                <Image src={item.image} alt={item.alt} fill sizes={item.sizes} loading="lazy" className="object-cover transition duration-500 hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062e30]/45 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/14 text-[10px] font-semibold text-teal-glow">
                  {index + 1}
                </span>
                <p className="text-xs font-semibold leading-4 text-white/78">{item.title}</p>
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
            {visibleReviews.map((review) => {
              const SourceIcon = getReviewSourceIcon(review.source);
              const sourceChipClass =
                "inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-semibold text-muted shadow-[0_6px_18px_rgba(16,26,43,0.04)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

              return (
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
                    {review.sourceUrl ? (
                      <TrackedAnchor href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className={sourceChipClass} eventName="review_source_click" eventParams={{ reviewSource: getReviewSourceAnalyticsValue(review.source) }}>
                        <SourceIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        {review.source}
                      </TrackedAnchor>
                    ) : (
                      <span className={sourceChipClass}>
                        <SourceIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        {review.source}
                      </span>
                    )}
                    {!review.verified ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-semibold text-muted">
                        без рейтинга
                      </span>
                    ) : null}
                  </div>
                </article>
              );
            })}
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

function getReviewSourceIcon(source: Review["source"]) {
  switch (source) {
    case "Яндекс.Карты":
      return YandexMapsSourceIcon;
    case "2ГИС":
      return TwoGisSourceIcon;
    case "ВКонтакте":
      return VkSourceIcon;
  }
}

function getReviewSourceAnalyticsValue(source: Review["source"]): AnalyticsReviewSource {
  switch (source) {
    case "Яндекс.Карты":
      return "yandex";
    case "2ГИС":
      return "2gis";
    case "ВКонтакте":
      return "vk";
  }
}

function YandexMapsSourceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="7" fill="#F7ECE4" />
      <path d="M8 3.4a3.2 3.2 0 0 0-3.2 3.2c0 2.22 3.2 5.98 3.2 5.98s3.2-3.76 3.2-5.98A3.2 3.2 0 0 0 8 3.4Zm0 4.38A1.18 1.18 0 1 1 8 5.42a1.18 1.18 0 0 1 0 2.36Z" fill="#C24A3A" />
    </svg>
  );
}

function TwoGisSourceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="7" fill="#E8F3ED" />
      <path d="M4.7 5.1h6.6v2.1H6.9v1.15h3.56v2.1H4.7V8.64l2.97-1.45H4.7V5.1Z" fill="#2D875B" />
      <path d="M10.45 8.35h.85v2.1h-.85V8.35Z" fill="#397AA6" />
    </svg>
  );
}

function VkSourceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="7" fill="#EAF0F7" />
      <path d="M8.52 11.15H7.8c-2.45 0-3.84-1.68-4.89-4.48l-.29-.79H4.3c.3 0 .43.14.52.39.57 1.64 1.35 2.87 1.7 2.87.14 0 .2-.06.2-.41V7.12c-.05-.73-.42-.8-.42-1.07 0-.14.11-.27.29-.27h2.64c.25 0 .34.14.34.43v2.18c0 .24.1.32.17.32.14 0 .26-.08.51-.34.63-.7 1.08-1.77 1.08-1.77.06-.15.19-.29.48-.29h1.68c.51 0 .62.26.51.62-.21.67-2.27 3.19-2.27 3.19-.18.22-.25.33 0 .65.18.23.78.76 1.18 1.23.29.34.51.63.57.83.07.24-.12.37-.43.37h-1.87c-.28 0-.41-.09-.57-.28-.23-.27-.75-.94-1.24-.94-.25 0-.32.17-.32.44v.5c0 .27-.09.42-.51.42Z" fill="#3E6F9F" />
    </svg>
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
