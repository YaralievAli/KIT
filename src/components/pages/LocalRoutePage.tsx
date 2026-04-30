import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { siteSettings } from "@/content/settings";
import type { DirectionPage, DistrictPage } from "@/types/content";

export function LocalRoutePage({ page }: { page: DistrictPage | DirectionPage }) {
  const related = projects.filter((project) => page.relatedProjectIds.includes(project.id)).slice(0, 3);

  return (
    <main className="bg-surface pt-28">
      <section className="section">
        <div className="container-page">
          <div className="rounded-3xl bg-white p-6 shadow-soft md:p-10">
            <h1 className="max-w-3xl text-4xl font-semibold text-navy md:text-5xl">{page.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{page.description}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {page.details.map((detail) => (
                <div key={detail} className="rounded-2xl border border-border bg-surface p-4 text-sm leading-6 text-muted">
                  {detail}
                </div>
              ))}
            </div>
            <Link className="btn-primary mt-8 inline-flex" href="/#quiz">
              {page.cta}
            </Link>
          </div>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-page">
          <h2 className="text-2xl font-semibold text-navy">Похожие примеры</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image src={project.image} alt={project.alt} fill sizes={project.sizes} className="object-cover" />
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">пример исполнения</span>
                  <h3 className="mt-3 text-lg font-semibold text-navy">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted">{project.district}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">Контакты для уточнения: {siteSettings.phone}</p>
        </div>
      </section>
    </main>
  );
}
