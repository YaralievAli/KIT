import { readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";
import type { HomePageContent } from "@/types/content";

type DirectusProductionStat = {
  text?: string;
  title?: string;
  visible?: boolean;
};

export async function getProduction(): Promise<HomePageContent["production"]> {
  const items = await readDirectusItems<DirectusProductionStat>("ProductionStats", { sort: ["sort", "order"] });
  const stats = items
    ?.filter((item) => item.visible !== false && (item.text || item.title))
    .map((item) => item.text ?? item.title ?? "");

  return {
    stats: stats?.length ? stats : localContent.production.stats,
    images: localContent.production.images,
  };
}
