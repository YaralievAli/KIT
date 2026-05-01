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
  return (
    <section className="relative isolate overflow-hidden bg-[#061112] pt-[76px] text-white">
      <div className="absolute inset-y-[76px] right-0 -z-10 hidden w-[61%] lg:block">
        <Image
          src={imageMap.hero.image}
          alt={imageMap.hero.alt}
          fill
          preload={imageMap.hero.preload}
          sizes="(max-width: 1280px) 61vw, 1080px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061112] via-[#061112]/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#061112]/72 to-transparent" />
      </div>
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_25%_35%,rgba(20,184,166,0.24),transparent_34%)]" />

      <div className={`${shell} grid min-h-[610px] items-center gap-8 py-7 lg:grid-cols-12 xl:min-h-[650px]`}>
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
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a className="v2-primary" href="#quiz">
              Рассчитать стоимость
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="v2-secondary-dark" href="#layouts">
              Смотреть каталог
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-[620px]">
            {heroCards.map(({ icon: Icon, title }) => (
              <div key={title} className="min-h-[96px] rounded-2xl border border-white/14 bg-white/[0.075] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <Icon className="text-champagne" size={28} aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold leading-5 text-white">{title}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/70">
            <span>Гарантийные условия по договору</span>
            <span className="text-champagne">•</span>
            <span>Прозрачный договор</span>
            <span className="text-champagne">•</span>
            <span>Стоимость после проекта</span>
          </p>
        </div>

        <div className="relative min-h-[340px] lg:col-span-7">
          <div className="relative min-h-[340px] overflow-hidden rounded-[28px] border border-white/10 lg:hidden">
            <Image src={imageMap.hero.image} alt={imageMap.hero.alt} fill sizes="100vw" preload={false} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061112] via-transparent to-transparent" />
          </div>
          <div className="hidden lg:absolute lg:bottom-6 lg:right-0 lg:block lg:w-[380px] xl:w-[430px]">
            <div className="rounded-[28px] border border-white/14 bg-[#071314]/86 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)]">
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-glow">Предварительный расчёт</p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight">5 вопросов без телефона на первом шаге</h2>
              <p className="mt-3 text-sm leading-6 text-white/68">
                Сначала выбираете планировку, стиль и бюджет. Контакт нужен только для отправки подборки.
              </p>
              <a href="#quiz" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-teal px-5 text-sm font-semibold text-white shadow-glow transition hover:bg-teal-glow">
                Начать расчёт
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
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
            {reviews.map((review) => (
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
                  <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-teal">
                    {review.source}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="2xl:col-span-7">
        <PreviewDarkFAQ items={faq} />
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="callback" className="relative isolate overflow-hidden bg-[#062e30] py-12 text-white lg:py-14">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_28%_45%,rgba(20,184,166,0.18),transparent_34%)]" />
      <div className="absolute inset-y-0 left-0 -z-10 w-full opacity-28 lg:w-[56%]" aria-hidden="true">
        <Image src={imageMap.cta.illustration} alt="" fill sizes="(max-width: 1024px) 100vw, 980px" loading="lazy" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062e30]/30 via-[#062e30]/70 to-[#062e30]" />
      </div>
      <div className={`${shell} relative grid gap-8 lg:grid-cols-12 lg:items-center`}>
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#061112]/20 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-8 lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-glow">Финальный шаг</p>
          <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.05] md:text-5xl">
            <span className="block">Рассчитаем стоимость</span>
            <span className="block text-white/72">вашей кухни бесплатно</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
            Подберём понятный ориентир по бюджету и материалам без громких обещаний до замера и проекта.
          </p>
          <div className="mt-7 grid gap-3 text-sm text-white/84 sm:grid-cols-2">
            {finalCtaBenefits.map((item) => (
              <p key={item} className="flex min-h-16 items-center gap-3 rounded-2xl border border-white/10 bg-white/9 px-4 py-3">
                <CheckCircle2 size={18} className="shrink-0 text-teal-glow" aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
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
