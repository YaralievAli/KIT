import { faqItems } from "@/content/faq";
import {
  comparisonRows,
  guarantees,
  heroContent,
  priceFactors,
  processSteps,
  productionStats,
  resultBenefits,
  styleDescriptions,
  trustItems,
} from "@/content/home";
import { imageMap } from "@/content/images-map";
import { districtPages, directionPages } from "@/content/pages";
import { projects } from "@/content/projects";
import { reviews } from "@/content/reviews";
import { siteSettings } from "@/content/settings";
import type { HomePageContent, ImageCard } from "@/types/content";

const styles: ImageCard[] = imageMap.styles.map((style, index) => ({
  ...style,
  description: styleDescriptions[index],
}));

const layouts: ImageCard[] = imageMap.layouts.map((layout) => ({
  ...layout,
}));

const materials: ImageCard[] = imageMap.materials.map((material) => ({
  ...material,
  description: "Подбирается под бюджет, стиль и сценарии использования кухни.",
}));

const productionImages: ImageCard[] = imageMap.production.map((item) => ({
  ...item,
}));

const process: Array<[string, string]> = processSteps.map(([title, text]) => [title, text]);
const guaranteesList: Array<[string, string]> = guarantees.map(([title, text]) => [title, text]);
const cta = {
  image: imageMap.cta.illustration,
  alt: imageMap.cta.alt,
  sizes: imageMap.cta.sizes,
  loading: imageMap.cta.loading,
  fallback: imageMap.cta.fallback,
};

export const localContent = {
  settings: siteSettings,
  hero: heroContent,
  benefits: trustItems,
  comparison: comparisonRows,
  projects,
  styles,
  layouts,
  materials,
  process,
  production: {
    stats: productionStats,
    images: productionImages,
  },
  cta,
  guarantees: guaranteesList,
  reviews,
  faq: faqItems,
  resultBenefits,
  priceFactors,
  districtPages,
  directionPages,
} satisfies HomePageContent & {
  districtPages: typeof districtPages;
  directionPages: typeof directionPages;
};
