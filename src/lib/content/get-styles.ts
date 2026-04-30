import { directusAssetUrl, readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";
import type { ImageCard } from "@/types/content";

type DirectusImageCard = Partial<ImageCard> & {
  visible?: boolean;
  image?: unknown;
};

export async function getStyles(): Promise<ImageCard[]> {
  const items = await readDirectusItems<DirectusImageCard>("KitchenStyles", { sort: ["sort", "order"] });
  const styles = items
    ?.filter((item) => item.visible !== false && item.title)
    .map((item, index) => toImageCard(item, localContent.styles[index] ?? localContent.styles[0]));

  return styles?.length ? styles : localContent.styles;
}

function toImageCard(item: DirectusImageCard, fallback: ImageCard): ImageCard {
  return {
    ...fallback,
    title: item.title ?? fallback.title,
    description: item.description ?? fallback.description,
    image: directusAssetUrl(item.image, fallback.image),
    alt: item.alt ?? fallback.alt,
    sizes: item.sizes ?? fallback.sizes,
    loading: item.loading ?? "lazy",
  };
}
