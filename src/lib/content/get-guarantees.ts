import { readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";

type DirectusGuarantee = {
  title?: string;
  text?: string;
  visible?: boolean;
};

export async function getGuarantees(): Promise<Array<[string, string]>> {
  const items = await readDirectusItems<DirectusGuarantee>("Guarantees", { sort: ["sort", "order"] });
  const guarantees = items
    ?.filter((item) => item.visible !== false && item.title && item.text)
    .map((item) => [item.title ?? "", item.text ?? ""] as [string, string]);

  return guarantees?.length ? guarantees : localContent.guarantees;
}
