"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Project } from "@/types/content";
import { cn, projectBadge, projectCollectionTitle } from "@/lib/helpers";

const filters = ["Все", "Современные", "Скандинавские", "Неоклассика", "Лофт", "Угловые", "Прямые", "До потолка", "С островом", "до 300 тыс.", "300-500 тыс.", "от 500 тыс."];

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("Все");
  const visible = useMemo(
    () => (filter === "Все" ? projects : projects.filter((project) => project.tags.includes(filter) || project.budgetGroup === filter)),
    [filter, projects]
  );
  const title = projectCollectionTitle(visible.length ? visible : projects);

  return (
    <section id="projects" className="section bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Портфолио без преувеличений</p>
            <h2 className="section-title">{title}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Текущие изображения используются как примеры исполнения. Реальными проектами станут только карточки, отмеченные как подтверждённые.
            </p>
          </div>
          <a href="#quiz" className="btn-secondary self-start md:self-auto">Рассчитать похожий вариант</a>
        </div>
        <div className="scrollbar-hide mt-7 flex gap-2 overflow-x-auto pb-2" role="list" aria-label="Фильтры проектов">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
                filter === item ? "border-teal bg-teal text-white" : "border-border bg-white text-navy hover:border-teal"
              )}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => (
            <article key={project.id} className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes={project.sizes}
                  loading="lazy"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-navy shadow-sm">
                  {projectBadge(project)}
                </span>
              </div>
              <div className="grid gap-4 p-5">
                <div>
                  <h3 className="text-xl font-semibold text-navy">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted">{project.area} · {project.district}</p>
                </div>
                <p className="text-sm leading-6 text-muted">{project.description}</p>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <Info label="Стиль" value={project.style} />
                  <Info label="Планировка" value={project.layout} />
                  <Info label="Материалы" value={project.materials} />
                  <Info label="Срок" value={project.productionTime} />
                </dl>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-semibold text-teal">{project.priceFrom}</span>
                  <a className="btn-small" href={`#quiz?project=${project.id}`}>
                    Хочу похожую
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 font-medium text-navy">{value}</dd>
    </div>
  );
}
