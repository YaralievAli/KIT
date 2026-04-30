import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { LocalRoutePage } from "@/components/pages/LocalRoutePage";
import { getDirectionPage } from "@/lib/content/get-direction-page";
import { getDistrictPage } from "@/lib/content/get-district-page";
import { localContent } from "@/lib/content/local-content";
import { breadcrumbJsonLd, isApprovedSeoPage, pageMetadata } from "@/lib/seo";

const localPages = [...localContent.districtPages, ...localContent.directionPages];

export function generateStaticParams() {
  return localPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getRoutedPage(slug);

  if (!page) return {};
  const shouldIndex = isApprovedSeoPage(page);

  return pageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: `/${page.slug}`,
    index: shouldIndex,
    follow: shouldIndex,
  });
}

export default async function DynamicLocalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getRoutedPage(slug);

  if (!page) notFound();
  const shouldIndex = isApprovedSeoPage(page);

  return (
    <>
      <Header />
      {shouldIndex ? (
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: page.title, path: `/${page.slug}` },
          ])}
        />
      ) : null}
      <LocalRoutePage page={page} />
      <Footer />
    </>
  );
}

async function getRoutedPage(slug: string) {
  return (await getDistrictPage(slug)) ?? (await getDirectionPage(slug));
}
