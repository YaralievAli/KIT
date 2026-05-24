import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PreviewDarkFooter } from "@/components/v2/PreviewDarkFooter";
import { PreviewDarkHeader } from "@/components/v2/PreviewDarkHeader";
import type { SeoLandingPageContent } from "@/content/seo-pages";

const shell = "mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10";

export function SeoLandingPage({ page }: { page: SeoLandingPageContent }) {
  const visibleFaq = page.faq.filter((item) => item.visible).sort((a, b) => a.order - b.order);

  return (
    <>
      <PreviewDarkHeader />
      <main className="overflow-x-hidden bg-[#f5f7f7] text-navy">
        <section className="relative isolate overflow-hidden bg-[#061112] pt-[76px] text-white">
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <Image src={page.image.image} alt="" fill priority sizes="100vw" className="object-cover opacity-42" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,18,0.94)_0%,rgba(6,17,18,0.82)_48%,rgba(6,17,18,0.42)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#061112] to-transparent" />
          </div>

          <div className={`${shell} relative z-10 grid min-h-[520px] gap-8 py-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.58fr)] lg:items-center lg:py-14`}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-glow">{page.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl text-[42px] font-semibold leading-[0.98] text-white sm:text-6xl lg:text-[76px]">
                {page.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/76 sm:text-lg sm:leading-8">
                {page.lead}
              </p>
              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-teal px-6 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(13,148,136,0.3)] transition hover:bg-teal-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow" href="/#quiz">
                  {page.primaryCta}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/28 bg-white/[0.08] px-6 text-sm font-semibold text-white transition hover:bg-champagne hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne" href={page.secondaryHref}>
                  {page.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#031416]/58 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur md:p-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#0A2A2C]">
                <Image src={page.image.image} alt={page.image.alt} fill sizes={page.image.sizes} className="object-cover" />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {page.highlights.map((item) => (
                  <p key={item} className="flex min-h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-2 text-sm font-semibold text-white/82">
                    <CheckCircle2 size={16} className="shrink-0 text-teal-glow" aria-hidden="true" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-8">
          <div className={`${shell} grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(340px,0.28fr)] lg:items-start`}>
            <article className="rounded-[24px] bg-white p-4 shadow-[0_12px_34px_rgba(16,26,43,0.07)] md:p-6 lg:rounded-[28px]">
              <p className="max-w-4xl text-base leading-8 text-muted">{page.intro}</p>
              <div className="mt-6 grid gap-4">
                {page.sections.map((section) => (
                  <section key={section.title} className="rounded-2xl border border-border bg-surface p-4 md:p-5">
                    <h2 className="text-xl font-semibold text-navy">{section.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted">{section.text}</p>
                    {section.items?.length ? (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {section.items.map((item) => (
                          <p key={item} className="flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-sm leading-6 text-muted">
                            <CheckCircle2 size={16} className="mt-1 shrink-0 text-teal" aria-hidden="true" />
                            {item}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>
            </article>

            <aside className="rounded-[24px] bg-[#061112] p-4 text-white shadow-[0_16px_46px_rgba(16,26,43,0.16)] md:p-5">
              <h2 className="text-xl font-semibold">Связанные разделы</h2>
              <div className="mt-4 grid gap-3">
                {page.relatedLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="group rounded-2xl border border-white/10 bg-white/[0.06] p-3 transition hover:border-teal-glow/45 hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow">
                    <span className="flex items-center justify-between gap-3 text-sm font-semibold text-white">
                      {link.label}
                      <ArrowRight size={15} className="shrink-0 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-white/64">{link.text}</span>
                  </Link>
                ))}
              </div>
              <Link className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-teal px-4 text-sm font-semibold text-white transition hover:bg-teal-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow" href="/#quiz">
                Перейти к расчёту
              </Link>
            </aside>
          </div>
        </section>

        {visibleFaq.length ? (
          <section className="pb-8">
            <div className={shell}>
              <div className="rounded-[24px] bg-white p-4 shadow-[0_12px_34px_rgba(16,26,43,0.07)] md:p-6 lg:rounded-[28px]">
                <p className="text-sm font-semibold uppercase tracking-wide text-teal">FAQ</p>
                <h2 className="mt-1 text-2xl font-semibold text-navy sm:text-3xl">Частые вопросы</h2>
                <div className="mt-4 grid gap-3 lg:grid-cols-3">
                  {visibleFaq.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-border bg-surface p-4">
                      <h3 className="text-sm font-semibold leading-6 text-navy">{item.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <PreviewDarkFooter />
    </>
  );
}
