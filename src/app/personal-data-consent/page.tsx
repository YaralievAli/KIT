import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { PreviewDarkFooter } from "@/components/v2/PreviewDarkFooter";
import { PreviewDarkHeader } from "@/components/v2/PreviewDarkHeader";
import { consentText } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: consentText.title,
  description: consentText.description,
  path: "/personal-data-consent",
});

export default function ConsentPage() {
  return (
    <>
      <PreviewDarkHeader />
      <LegalDocumentPage document={consentText} />
      <PreviewDarkFooter />
    </>
  );
}
