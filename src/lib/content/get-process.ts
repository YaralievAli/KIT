import { readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";

type DirectusProcessStep = {
  title?: string;
  text?: string;
  visible?: boolean;
};

export async function getProcess(): Promise<Array<[string, string]>> {
  const items = await readDirectusItems<DirectusProcessStep>("ProcessSteps", { sort: ["sort", "order"] });
  const steps = items
    ?.filter((item) => item.visible !== false && item.title && item.text)
    .map((item) => [item.title ?? "", item.text ?? ""] as [string, string]);

  return steps?.length ? steps : localContent.process;
}
