import type { Metadata } from "next";
import { ThankYouClient } from "@/components/pages/ThankYouClient";
import { PreviewDarkFooter } from "@/components/v2/PreviewDarkFooter";
import { PreviewDarkHeader } from "@/components/v2/PreviewDarkHeader";
import { getProjects } from "@/lib/content/get-projects";
import { getSiteSettings } from "@/lib/content/get-site-settings";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Заявка принята",
  description: "Спасибо за заявку. Команда КИТ свяжется с вами в рабочее время.",
  path: "/thank-you",
  index: false,
  follow: false,
});

export const revalidate = 300;

export default async function ThankYouPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);

  return (
    <>
      <PreviewDarkHeader />
      <ThankYouClient projects={projects} settings={settings} />
      <PreviewDarkFooter />
    </>
  );
}
