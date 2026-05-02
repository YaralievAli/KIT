import type { Metadata } from "next";
import type { FAQItem, SiteSettings } from "@/types/content";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://kit-kuhni.ru").replace(/\/$/, "");

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  follow?: boolean;
};

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export function pageMetadata({ title, description, path, index = true, follow = true }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots: {
      index,
      follow,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: "КИТ",
      locale: "ru_RU",
      type: "website",
    },
  };
}

export function isApprovedSeoPage(page: { approved: boolean; hasUniqueContent: boolean; isDraft: boolean }) {
  return page.approved && page.hasUniqueContent && !page.isDraft;
}

export function localBusinessJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: settings.companyName,
    url: absoluteUrl("/"),
    telephone: settings.phone,
    email: settings.email,
    image: absoluteUrl("/images/hero/preview-dark-hero-wide-bg.png"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Санкт-Петербург",
      addressRegion: "Ленинградская область",
      addressCountry: "RU",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Санкт-Петербург",
      },
      {
        "@type": "AdministrativeArea",
        name: "Ленинградская область",
      },
    ],
    openingHours: settings.workingHours,
  };
}

export function serviceJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#service`,
    name: "Кухни на заказ в Санкт-Петербурге и Ленинградской области",
    serviceType: "Изготовление кухонь на заказ",
    provider: {
      "@id": `${siteUrl}/#localbusiness`,
      name: settings.companyName,
    },
    areaServed: ["Санкт-Петербург", "Ленинградская область"],
    url: absoluteUrl("/"),
  };
}

export function faqPageJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      .filter((item) => item.visible)
      .sort((a, b) => a.order - b.order)
      .map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
