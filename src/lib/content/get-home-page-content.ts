import { getBenefits } from "@/lib/content/get-benefits";
import { getComparison } from "@/lib/content/get-comparison";
import { getFAQ } from "@/lib/content/get-faq";
import { getGuarantees } from "@/lib/content/get-guarantees";
import { getHero } from "@/lib/content/get-hero";
import { getLayouts } from "@/lib/content/get-layouts";
import { getMaterials } from "@/lib/content/get-materials";
import { getProcess } from "@/lib/content/get-process";
import { getProduction } from "@/lib/content/get-production";
import { getProjects } from "@/lib/content/get-projects";
import { getReviews } from "@/lib/content/get-reviews";
import { getSiteSettings } from "@/lib/content/get-site-settings";
import { getStyles } from "@/lib/content/get-styles";
import { localContent } from "@/lib/content/local-content";
import type { HomePageContent } from "@/types/content";

export async function getHomePageContent(): Promise<HomePageContent> {
  const [
    settings,
    hero,
    benefits,
    comparison,
    projects,
    styles,
    layouts,
    materials,
    process,
    production,
    guarantees,
    reviews,
    faq,
  ] = await Promise.all([
    getSiteSettings(),
    getHero(),
    getBenefits(),
    getComparison(),
    getProjects(),
    getStyles(),
    getLayouts(),
    getMaterials(),
    getProcess(),
    getProduction(),
    getGuarantees(),
    getReviews(),
    getFAQ(),
  ]);

  return {
    settings,
    hero,
    benefits,
    comparison,
    projects,
    styles,
    layouts,
    materials,
    process,
    production,
    cta: localContent.cta,
    guarantees,
    reviews,
    faq,
    resultBenefits: localContent.resultBenefits,
    priceFactors: localContent.priceFactors,
  };
}
