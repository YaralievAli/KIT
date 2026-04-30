import { directusAssetUrl, readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";
import type { ImageCard } from "@/types/content";

type DirectusLayout = Partial<ImageCard> & {
  visible?: boolean;
  image?: unknown;
};

export async function getLayouts(): Promise<ImageCard[]> {
  const items = await readDirectusItems<DirectusLayout>("LayoutTypes", { sort: ["sort", "order"] });
  const layouts = items
    ?.filter((item) => item.visible !== false && item.title)
    .map((item, index) => ({
      ...(localContent.layouts[index] ?? localContent.layouts[0]),
      title: item.title ?? localContent.layouts[index]?.title ?? localContent.layouts[0].title,
      description: item.description ?? localContent.layouts[index]?.description,
      image: directusAssetUrl(item.image, localContent.layouts[index]?.image ?? localContent.layouts[0].image),
      alt: item.alt ?? localContent.layouts[index]?.alt ?? localContent.layouts[0].alt,
      sizes: item.sizes ?? localContent.layouts[index]?.sizes ?? localContent.layouts[0].sizes,
      loading: item.loading ?? "lazy",
    }));

  return layouts?.length ? layouts : localContent.layouts;
}
