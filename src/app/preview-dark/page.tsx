import type { Metadata } from "next";
import { PreviewDarkHomePage } from "@/components/v2/PreviewDarkHomePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Кухни на заказ в СПб и ЛО — КИТ",
  description: "КИТ — кухни на заказ в Санкт-Петербурге и Ленинградской области. Предварительный расчёт, проектные решения, производство и сборка.",
  path: "/preview-dark",
  index: false,
  follow: false,
});

export default function PreviewDarkPage() {
  return <PreviewDarkHomePage />;
}
