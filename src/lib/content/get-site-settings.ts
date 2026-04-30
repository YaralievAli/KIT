import { localContent } from "@/lib/content/local-content";
import { readDirectusSingleton } from "@/lib/content/directus-client";
import type { SiteSettings } from "@/types/content";

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await readDirectusSingleton<Partial<SiteSettings>>("SiteSettings");

  return {
    ...localContent.settings,
    ...removeEmpty(settings),
  };
}

function removeEmpty<T extends Record<string, unknown> | null>(value: T) {
  if (!value) return {};
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== null && item !== undefined && item !== ""));
}
