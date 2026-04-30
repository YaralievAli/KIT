import { directusAssetUrl, readDirectusSingleton } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";
import type { HeroContent } from "@/types/content";

type DirectusHero = Partial<Omit<HeroContent, "image" | "trustCards">> & {
  backgroundImage?: unknown;
  image?: unknown;
  imageAlt?: string;
  trustCards?: string[] | Array<{ title?: string; text?: string }>;
};

export async function getHero(): Promise<HeroContent> {
  const hero = await readDirectusSingleton<DirectusHero>("Hero");
  if (!hero) return localContent.hero;

  return {
    ...localContent.hero,
    location: hero.location ?? localContent.hero.location,
    title: hero.title ?? localContent.hero.title,
    subtitle: hero.subtitle ?? localContent.hero.subtitle,
    primaryCta: hero.primaryCta ?? localContent.hero.primaryCta,
    secondaryCta: hero.secondaryCta ?? localContent.hero.secondaryCta,
    credibility: hero.credibility ?? localContent.hero.credibility,
    trustCards: normalizeTrustCards(hero.trustCards) ?? localContent.hero.trustCards,
    image: {
      ...localContent.hero.image,
      image: directusAssetUrl(hero.backgroundImage ?? hero.image, localContent.hero.image.image),
      alt: hero.imageAlt ?? localContent.hero.image.alt,
    },
  };
}

function normalizeTrustCards(value: DirectusHero["trustCards"]) {
  if (!Array.isArray(value) || !value.length) return null;
  return value
    .map((item) => (typeof item === "string" ? item : item.title ?? item.text ?? ""))
    .filter(Boolean);
}
