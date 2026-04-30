import { readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";
import type { TextCard } from "@/types/content";

type DirectusBenefit = TextCard & {
  visible?: boolean;
  order?: number;
  sort?: number;
};

export async function getBenefits(): Promise<TextCard[]> {
  const items = await readDirectusItems<DirectusBenefit>("Benefits", { sort: ["sort", "order"] });
  const visible = items?.filter((item) => item.visible !== false && item.title && item.text);

  return visible?.length ? visible.map(({ title, text }) => ({ title, text })) : localContent.benefits;
}
