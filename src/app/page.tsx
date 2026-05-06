import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { PreviewDarkHomePage } from "@/components/v2/PreviewDarkHomePage";
import { getHomePageContent } from "@/lib/content/get-home-page-content";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "КИТ — кухни на заказ в СПб и ЛО",
    description: "Кухни на заказ в Санкт-Петербурге и Ленинградской области: предварительный расчёт, проектные решения, подбор материалов и сборка под ключ.",
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
      <PreviewDarkHomePage />
    </>
  );
}
