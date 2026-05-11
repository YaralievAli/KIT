import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { PreviewDarkFooter } from "@/components/v2/PreviewDarkFooter";
import { PreviewDarkHeader } from "@/components/v2/PreviewDarkHeader";
import { privacyText } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: privacyText.title,
  description: privacyText.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PreviewDarkHeader />
      <LegalDocumentPage document={privacyText} />
      <PreviewDarkFooter />
    </>
  );
}
