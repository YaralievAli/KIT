import { readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";
import type { DistrictPage } from "@/types/content";

export async function getDistrictPage(slug: string): Promise<DistrictPage | null> {
  const items = await readDirectusItems<Partial<DistrictPage>>("DistrictPages", {
    limit: 1,
    filter: { slug: { _eq: slug } },
  });
  const page = items?.[0];

  if (page?.slug && page.title && page.description) {
    return {
      ...(localContent.districtPages.find((item) => item.slug === slug) ?? localContent.districtPages[0]),
      ...page,
      details: normalizeStringArray(page.details),
      relatedProjectIds: normalizeStringArray(page.relatedProjectIds),
      isDraft: page.isDraft ?? true,
      hasUniqueContent: page.hasUniqueContent ?? false,
      approved: page.approved ?? false,
      seoTitle: page.seoTitle ?? page.title,
      seoDescription: page.seoDescription ?? page.description,
    };
  }

  return localContent.districtPages.find((item) => item.slug === slug) ?? null;
}

function normalizeStringArray(value: unknown) {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  if (typeof value === "string") return value.split("\n").map((item) => item.trim()).filter(Boolean);
  return [];
}
