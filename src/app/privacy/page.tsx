import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
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
      <Header />
      <main className="bg-surface pt-28">
        <section className="section">
          <div className="container-page max-w-4xl">
            <div className="rounded-3xl bg-white p-6 shadow-soft md:p-10">
              <h1 className="text-4xl font-semibold text-navy">{privacyText.title}</h1>
              <p className="mt-4 text-lg leading-8 text-muted">{privacyText.description}</p>
              <div className="mt-8 grid gap-5 text-base leading-8 text-muted">
                {privacyText.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
