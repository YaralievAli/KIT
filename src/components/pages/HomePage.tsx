import Image from "next/image";
import { Award, Calculator, CheckCircle2, ClipboardCheck, Factory, Handshake, MapPin, Ruler, ShieldCheck, Sparkles, Timer, WalletCards } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { QuizSection } from "@/components/sections/QuizSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomePageContent } from "@/types/content";

const trustIcons = [Factory, ClipboardCheck, WalletCards, MapPin];
const factorIcons = [Ruler, Sparkles, Award, ShieldCheck, Calculator, Handshake];

export function HomePage({ content }: { content: HomePageContent }) {
  const visibleFaq = content.faq.filter((item) => item.visible).sort((a, b) => a.order - b.order);
  const visibleReviews = content.reviews.filter((review) => review.visible);

  return (
    <>
      <Header settings={content.settings} />
      <main>
        <section className="relative isolate overflow-hidden bg-navy pt-24 text-white">
          <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[58%]">
            <Image
              src={content.hero.image.image}
              alt={content.hero.image.alt}
              fill
              preload={content.hero.image.preload}
              sizes={content.hero.image.sizes}
              className="object-cover opacity-72"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/82 to-navy/24" />
          </div>
          <div className="container-page grid min-h-[640px] items-center gap-8 py-12 md:min-h-[720px] md:py-16 lg:grid-cols-[0.98fr_0.72fr]">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-semibold text-white/88 backdrop-blur">
                {content.hero.location}
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">{content.hero.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">{content.hero.subtitle}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a className="btn-primary" href="#quiz">{content.hero.primaryCta}</a>
                <a className="btn-ghost" href="#projects">{content.hero.secondaryCta}</a>
              </div>
              <div className="mt-7 hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
                {content.hero.trustCards.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/18 bg-white/14 p-4 text-sm font-semibold text-white shadow-glow backdrop-blur-sm">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-white/72">{content.hero.credibility}</p>
            </div>
            <aside className="hidden rounded-3xl border border-white/14 bg-white/12 p-6 shadow-glow backdrop-blur-sm lg:block">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal text-white">
                  <Calculator size={24} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-champagne">Предварительный расчёт</p>
                  <h2 className="text-xl font-semibold text-white">5 вопросов без телефона на старте</h2>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {["Планировка и стиль", "Ориентировочный бюджет", "Подбор похожих примеров"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-sm font-medium text-white/84">
                    <CheckCircle2 size={18} className="text-teal-glow" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
              <a href="#quiz" className="btn-primary mt-6 w-full">
                Начать расчёт
                <Timer size={18} aria-hidden="true" />
              </a>
              <p className="mt-4 text-xs leading-5 text-white/58">Телефон понадобится только на финальном шаге, чтобы отправить подборку.</p>
            </aside>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container-page grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {content.benefits.map((item, index) => {
              const Icon = trustIcons[index] ?? CheckCircle2;
              return (
                <article key={item.title} className="rounded-3xl border border-border bg-white p-6 shadow-sm">
                  <Icon className="text-teal" size={30} aria-hidden="true" />
                  <h2 className="mt-5 text-xl font-semibold text-navy">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section bg-surface">
          <div className="container-page">
            <SectionHeading
              title="Почему КИТ, а не типовые решения"
              description="Показываем честно, чем отличается кухня под заказ от салонных и модульных вариантов."
            />
            <div className="mt-8 overflow-x-auto rounded-3xl border border-border bg-white shadow-sm">
              <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                <thead className="bg-navy text-white">
                  <tr>
                    {["Критерий", "КИТ", "Мебельный салон", "Частный мастер", "Модульные кухни"].map((head) => (
                      <th key={head} className="px-5 py-4 font-semibold">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.comparison.map((row) => (
                    <tr key={row[0]} className="border-t border-border">
                      {row.map((cell, index) => (
                        <td key={cell} className={index === 1 ? "px-5 py-4 font-semibold text-teal" : "px-5 py-4 text-muted"}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <ProjectGallery projects={content.projects} />

        <section id="styles" className="section bg-surface">
          <div className="container-page">
            <SectionHeading title="Стили будущей кухни" description="Выберите визуальное направление, а мы адаптируем его под размер помещения, бюджет и привычки семьи." />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {content.styles.map((style) => (
                <article key={style.title} className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
                  <div className="relative aspect-[4/3]">
                    <Image src={style.image} alt={style.alt} fill sizes={style.sizes} loading="lazy" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-navy">{style.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{style.description}</p>
                    <a className="mt-4 inline-flex text-sm font-semibold text-teal" href="#projects">Смотреть проекты</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <QuizSection />

        <section className="section bg-white">
          <div className="container-page">
            <SectionHeading title="Что вы получите после расчёта" description="Не обещаем точную цену за минуту. Сначала готовим понятный ориентир и список следующих шагов." />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {content.resultBenefits.map((item) => (
                <div key={item} className="rounded-3xl border border-border bg-white p-5 shadow-sm">
                  <CheckCircle2 className="text-teal" size={24} aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold leading-6 text-navy">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="container-page">
            <SectionHeading title="От чего зависит стоимость кухни" description="На сайте указаны предварительные цены. Точная стоимость рассчитывается после замера, выбора материалов и подготовки проекта." />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {content.priceFactors.map((item, index) => {
                const Icon = factorIcons[index] ?? CheckCircle2;
                return (
                  <div key={item} className="rounded-3xl border border-border bg-white p-6 shadow-sm">
                    <Icon className="text-champagne" size={28} aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-semibold text-navy">{item}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container-page">
            <SectionHeading title="Материалы и фурнитура" description="Показываем основные группы материалов без обещаний, которые нужно подтвердить менеджером." />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {content.materials.map((material) => (
                <article key={material.title} className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
                  <div className="relative aspect-[4/3]">
                    <Image src={material.image} alt={material.alt} fill sizes={material.sizes} loading="lazy" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-navy">{material.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{material.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="container-page">
            <SectionHeading title="Как мы работаем" description="После заявки у клиента есть понятный маршрут: от задачи до установки кухни." />
            <div className="mt-8 grid gap-4 md:grid-cols-5">
              {content.process.map(([title, text], index) => (
                <article key={title} className="rounded-3xl border border-border bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">{index + 1}</span>
                  <h3 className="mt-5 text-lg font-semibold text-navy">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-navy text-white">
          <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading dark title="Собственное производство" description="Контролируем качество на каждом этапе — от проекта до установки. Условия и сроки фиксируются до запуска работ." />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {content.production.stats.map((stat) => (
                  <div key={stat} className="rounded-2xl border border-white/12 bg-white/8 p-4 text-sm font-semibold text-white/86">
                    {stat}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {content.production.images.map((item) => (
                <div key={item.title} className="overflow-hidden rounded-3xl border border-white/12 bg-white/8">
                  <div className="relative aspect-[4/5]">
                    <Image src={item.image} alt={item.alt} fill sizes={item.sizes} loading="lazy" className="object-cover" />
                  </div>
                  <p className="p-4 text-sm font-semibold text-white/80">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container-page">
            <SectionHeading title="Что мы гарантируем" description="Формулировки осторожные: конкретные условия фиксируются в договоре и могут редактироваться в контенте." />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {content.guarantees.map(([title, text]) => (
                <article key={title} className="rounded-3xl border border-border bg-white p-5 shadow-sm">
                  <ShieldCheck className="text-teal" size={26} aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-navy">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="section bg-surface">
          <div className="container-page">
            <SectionHeading title="Отзывы наших клиентов" description="Публикуем отзывы без неподтверждённых рейтингов и громких цифр. Подробности источника уточняются отдельно." />
            <div className="mt-8 flex flex-wrap gap-2">
              {["Яндекс.Карты", "2ГИС", "ВКонтакте"].map((source) => (
                <span key={source} className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-muted">{source}</span>
              ))}
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {visibleReviews.map((review) => (
                <article key={review.id} className="rounded-3xl border border-border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 font-semibold text-teal">К</div>
                    <div>
                      <h3 className="font-semibold text-navy">{review.name}</h3>
                      <p className="text-sm text-muted">{review.district}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-muted">{review.text}</p>
                  {review.verified ? (
                    <span className="mt-5 inline-flex rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
                      {review.source}
                    </span>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <FAQAccordion items={visibleFaq} />

        <section id="callback" className="section bg-teal text-white">
          <div className="container-page grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/75">Финальный шаг</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Рассчитаем стоимость вашей кухни бесплатно</h2>
              <div className="mt-6 grid gap-3 text-sm text-white/84 sm:grid-cols-2">
                {["Проектные рекомендации", "Подбор материалов и фурнитуры", "Предварительный расчёт без скрытых обещаний", "Ответ в рабочее время"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/12 p-4">{item}</div>
                ))}
              </div>
              <Image src={content.cta.image} alt={content.cta.alt} width={620} height={280} sizes={content.cta.sizes} loading="lazy" className="mt-8 opacity-70" />
            </div>
            <LeadForm sourcePage="final-cta" />
          </div>
        </section>
      </main>
      <Footer settings={content.settings} />
    </>
  );
}
