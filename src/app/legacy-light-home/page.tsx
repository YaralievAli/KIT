import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getHomePageContent } from "@/lib/content/get-home-page-content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Legacy light homepage — КИТ",
  description: "Внутренняя архивная версия светлой главной страницы КИТ.",
  alternates: {
    canonical: "/legacy-light-home",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LegacyLightHomePage() {
  const content = await getHomePageContent();

  return <HomePage content={content} />;
}
