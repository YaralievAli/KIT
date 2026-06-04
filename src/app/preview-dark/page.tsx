import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Preview dark homepage — КИТ",
  description: "Внутренняя preview-версия тёмной главной страницы КИТ.",
  alternates: {
    canonical: "/preview-dark",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreviewDarkRedirectPage() {
  permanentRedirect("/");
}
