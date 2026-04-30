import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { projects } from "@/content/projects";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = {
  title: "Заявка принята",
  description: "Спасибо за заявку. Команда КИТ свяжется с вами в рабочее время.",
};

export default function ThankYouPage() {
  const related = projects.slice(0, 3);

  return (
    <>
      <Header />
      <main className="bg-surface pt-28">
        <section className="section">
          <div className="container-page">
            <div className="rounded-3xl bg-white p-6 shadow-soft md:p-10">
              <p className="eyebrow">Спасибо</p>
              <h1 className="mt-3 text-4xl font-semibold text-navy md:text-5xl">Заявка принята</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                Мы свяжемся с вами в рабочее время и уточним детали проекта.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="btn-primary" href={siteSettings.vkHref}>Перейти во ВКонтакте</a>
                <a className="btn-secondary" href={siteSettings.whatsappHref}>Написать в WhatsApp</a>
                <Link className="btn-secondary" href="/">Вернуться на главную</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section pt-0">
          <div className="container-page">
            <h2 className="text-2xl font-semibold text-navy">Пока ждёте — посмотрите похожие примеры</h2>
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
