import { localContent } from "@/lib/content/local-content";
import type { DirectionPage } from "@/types/content";

export async function getDirectionPage(slug: string): Promise<DirectionPage | null> {
  return localContent.directionPages.find((item) => item.slug === slug) ?? null;
}
