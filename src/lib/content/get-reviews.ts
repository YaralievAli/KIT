import { readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";
import type { Review } from "@/types/content";

type DirectusReview = Partial<Review> & {
  visible?: boolean;
};

const sources = ["Яндекс.Карты", "2ГИС", "ВКонтакте"] as const;

export async function getReviews(): Promise<Review[]> {
  const items = await readDirectusItems<DirectusReview>("Reviews", { sort: ["sort", "order"] });
  const reviews = items
    ?.filter((item) => item.visible !== false && item.name && item.text)
    .map((item, index) => {
      const fallback = localContent.reviews[index] ?? localContent.reviews[0];
      const source = sources.includes(item.source as Review["source"]) ? (item.source as Review["source"]) : fallback.source;

      return {
        ...fallback,
        id: item.id ?? fallback.id,
        name: item.name ?? fallback.name,
        district: item.district ?? fallback.district,
        text: item.text ?? fallback.text,
        source,
        sourceUrl: item.sourceUrl,
        verified: item.verified === true,
        visible: item.visible !== false,
      };
    });

  return reviews?.length ? reviews : localContent.reviews;
}
