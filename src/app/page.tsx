import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomePageContent } from "@/lib/content/get-home-page-content";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Кухни на заказ в СПб и ЛО — КИТ",
    description: "КИТ — кухни на заказ в Санкт-Петербурге и Ленинградской области. Бесплатный дизайн-проект, предварительный расчёт, производство и сборка.",
    path: "/",
  }),
};

export default async function Page() {
  const content = await getHomePageContent();

  return (
    <>
      <JsonLd
        data={[
          localBusinessJsonLd(content.settings),
          serviceJsonLd(content.settings),
          faqPageJsonLd(content.faq),
          breadcrumbJsonLd([{ name: "Главная", path: "/" }]),
        ]}
      />
      <HomePage content={content} />
    </>
  );
}
