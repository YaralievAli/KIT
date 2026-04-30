import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getHomePageContent } from "@/lib/content/get-home-page-content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Кухни на заказ в СПб и ЛО — КИТ",
  description: "КИТ — кухни на заказ в Санкт-Петербурге и Ленинградской области. Бесплатный дизайн-проект, предварительный расчёт, производство и сборка.",
  openGraph: {
    title: "Кухни на заказ в СПб и ЛО — КИТ",
    description: "Предварительный расчёт кухни, проектные решения и консультация.",
  },
};

export default async function Page() {
  const content = await getHomePageContent();

  return <HomePage content={content} />;
}
