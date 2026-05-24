import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/pages/SeoLandingPage";
import { getSeoLandingPage, type SeoLandingPageSlug } from "@/content/seo-pages";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqPageJsonLd, pageMetadata } from "@/lib/seo";

export function generateSeoLandingMetadata(slug: SeoLandingPageSlug): Metadata {
  const page = getSeoLandingPage(slug);

  if (!page) return {};

  return pageMetadata({
    title: page.metadataTitle,
    description: page.metadataDescription,
    path: page.path,
  });
}

export function SeoLandingRoute({ slug }: { slug: SeoLandingPageSlug }) {
  const page = getSeoLandingPage(slug);

  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: page.breadcrumbLabel, path: page.path },
          ]),
          faqPageJsonLd(page.faq),
        ]}
      />
      <SeoLandingPage page={page} />
    </>
  );
}
