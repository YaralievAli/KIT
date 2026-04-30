import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThankYouClient } from "@/components/pages/ThankYouClient";
import { getProjects } from "@/lib/content/get-projects";
import { getSiteSettings } from "@/lib/content/get-site-settings";

export const metadata: Metadata = {
  title: "Заявка принята",
  description: "Спасибо за заявку. Команда КИТ свяжется с вами в рабочее время.",
};

export const revalidate = 300;

export default async function ThankYouPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);

  return (
    <>
      <Header />
      <ThankYouClient projects={projects} settings={settings} />
      <Footer />
    </>
  );
}
