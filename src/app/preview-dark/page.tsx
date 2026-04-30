import type { Metadata } from "next";
import { PreviewDarkHomePage } from "@/components/v2/PreviewDarkHomePage";

export const metadata: Metadata = {
  title: "Кухни на заказ в СПб и ЛО — КИТ",
  description: "КИТ — кухни на заказ в Санкт-Петербурге и Ленинградской области. Предварительный расчёт, проектные решения, производство и сборка.",
};

export default function PreviewDarkPage() {
  return <PreviewDarkHomePage />;
}
