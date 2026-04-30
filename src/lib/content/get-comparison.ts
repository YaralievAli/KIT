import { readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";

type DirectusComparisonItem = {
  criterion?: string;
  kit?: string;
  salon?: string;
  privateMaster?: string;
  modular?: string;
  visible?: boolean;
};

export async function getComparison(): Promise<string[][]> {
  const items = await readDirectusItems<DirectusComparisonItem>("ComparisonItems", { sort: ["sort", "order"] });
  const rows = items
    ?.filter((item) => item.visible !== false && item.criterion)
    .map((item) => [
      item.criterion ?? "",
      item.kit ?? "",
      item.salon ?? "",
      item.privateMaster ?? "",
      item.modular ?? "",
    ]);

  return rows?.length ? rows : localContent.comparison;
}
