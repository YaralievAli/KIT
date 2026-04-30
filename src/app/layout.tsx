import type { Metadata } from "next";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Кухни на заказ в СПб и ЛО — КИТ",
    template: "%s — КИТ",
  },
  description: "КИТ — кухни на заказ в Санкт-Петербурге и Ленинградской области. Предварительный расчёт, проектные решения, производство и сборка.",
  openGraph: {
    title: "Кухни на заказ в СПб и ЛО — КИТ",
    description: "Предварительный расчёт кухни, проектные решения и консультация.",
    url: siteUrl,
    siteName: "КИТ",
    locale: "ru_RU",
    type: "website",
  },
  icons: {
    icon: "/images/logo/kit-icon-framed.svg",
    shortcut: "/images/logo/kit-icon-framed.svg",
    apple: "/images/logo/kit-icon-framed.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
