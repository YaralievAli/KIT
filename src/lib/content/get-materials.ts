import { directusAssetUrl, readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";
import type { ImageCard } from "@/types/content";

type DirectusMaterial = Partial<ImageCard> & {
  visible?: boolean;
  image?: unknown;
};

export async function getMaterials(): Promise<ImageCard[]> {
  const items = await readDirectusItems<DirectusMaterial>("Materials", { sort: ["sort", "order"] });
  const materials = items
    ?.filter((item) => item.visible !== false && item.title)
    .map((item, index) => ({
      ...(localContent.materials[index] ?? localContent.materials[0]),
      title: item.title ?? localContent.materials[index]?.title ?? localContent.materials[0].title,
      description: item.description ?? localContent.materials[index]?.description,
      image: directusAssetUrl(item.image, localContent.materials[index]?.image ?? localContent.materials[0].image),
      alt: item.alt ?? localContent.materials[index]?.alt ?? localContent.materials[0].alt,
      sizes: item.sizes ?? localContent.materials[index]?.sizes ?? localContent.materials[0].sizes,
      loading: item.loading ?? "lazy",
    }));

  return materials?.length ? materials : localContent.materials;
}
