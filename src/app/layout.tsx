import type { Metadata } from "next";
import { AnalyticsConsentBanner } from "@/components/analytics/AnalyticsConsentBanner";
import { YandexMetrika } from "@/components/analytics/YandexMetrika";
import { absoluteUrl, defaultSeoImageAlt, defaultSeoImagePath, siteUrl } from "@/lib/seo";
import "./globals.css";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const yandexWebmasterVerification = process.env.YANDEX_WEBMASTER_VERIFICATION?.trim();
const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();
const verification = {
  ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
  ...(yandexWebmasterVerification ? { yandex: yandexWebmasterVerification } : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Кухни на заказ в СПб и ЛО — КИТ",
    template: "%s — КИТ",
  },
  description: "КИТ — кухни на заказ в Санкт-Петербурге и Ленинградской области. Предварительный расчёт, проектные решения, производство и сборка.",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Кухни на заказ в СПб и ЛО — КИТ",
    description: "Предварительный расчёт кухни, проектные решения и консультация.",
    url: siteUrl,
    siteName: "КИТ",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: absoluteUrl(defaultSeoImagePath),
        width: 1200,
        height: 630,
        alt: defaultSeoImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Кухни на заказ в СПб и ЛО — КИТ",
    description: "Предварительный расчёт кухни, проектные решения и консультация.",
    images: [absoluteUrl(defaultSeoImagePath)],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: [{ url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" }],
  },
  ...(Object.keys(verification).length ? { verification } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <YandexMetrika counterId={yandexMetrikaId} />
        {children}
        <AnalyticsConsentBanner />
      </body>
    </html>
  );
}
