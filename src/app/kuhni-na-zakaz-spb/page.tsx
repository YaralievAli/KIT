import { generateSeoLandingMetadata, SeoLandingRoute } from "@/lib/seo-landing-route";

const slug = "kuhni-na-zakaz-spb" as const;

export const metadata = generateSeoLandingMetadata(slug);

export default function Page() {
  return <SeoLandingRoute slug={slug} />;
}
