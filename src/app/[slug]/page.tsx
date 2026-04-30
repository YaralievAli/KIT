import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocalRoutePage } from "@/components/pages/LocalRoutePage";
import { getDirectionPage } from "@/lib/content/get-direction-page";
import { getDistrictPage } from "@/lib/content/get-district-page";
import { localContent } from "@/lib/content/local-content";

const localPages = [...localContent.districtPages, ...localContent.directionPages];

export function generateStaticParams() {
  return localPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getRoutedPage(slug);

  if (!page) return {};
  const shouldIndex = page.approved && page.hasUniqueContent && !page.isDraft;

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    robots: shouldIndex ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
    },
  };
}

export default async function DynamicLocalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getRoutedPage(slug);

  if (!page) notFound();

  return (
    <>
      <Header />
      <LocalRoutePage page={page} />
      <Footer />
    </>
  );
}

async function getRoutedPage(slug: string) {
  return (await getDistrictPage(slug)) ?? (await getDirectionPage(slug));
}
