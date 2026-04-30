import { directusAssetUrl, readDirectusItems } from "@/lib/content/directus-client";
import { localContent } from "@/lib/content/local-content";
import type { Project } from "@/types/content";

type DirectusProject = Omit<Partial<Project>, "tags" | "image"> & {
  slug?: string;
  visible?: boolean;
  image?: unknown;
  images?: unknown[];
  tags?: string[] | string;
};

const budgetGroups = ["до 300 тыс.", "300-500 тыс.", "от 500 тыс."] as const;

export async function getProjects(): Promise<Project[]> {
  const items = await readDirectusItems<DirectusProject>("Projects", { sort: ["sort", "order"] });
  const projects = items
    ?.filter((item) => item.visible !== false && item.title)
    .map((item, index) => toProject(item, localContent.projects[index] ?? localContent.projects[0]));

  return projects?.length ? projects : localContent.projects;
}

function toProject(item: DirectusProject, fallback: Project): Project {
  const isRealProject = item.isRealProject === true;
  const budgetGroup = budgetGroups.includes(item.budgetGroup as Project["budgetGroup"])
    ? (item.budgetGroup as Project["budgetGroup"])
    : fallback.budgetGroup;

  return {
    ...fallback,
    id: item.id ?? item.slug ?? fallback.id,
    title: item.title ?? fallback.title,
    district: item.district ?? fallback.district,
    area: item.area ?? fallback.area,
    style: item.style ?? fallback.style,
    layout: item.layout ?? fallback.layout,
    materials: item.materials ?? fallback.materials,
    productionTime: item.productionTime ?? fallback.productionTime,
    priceFrom: item.priceFrom ?? fallback.priceFrom,
    description: item.description ?? fallback.description,
    tags: normalizeTags(item.tags) ?? fallback.tags,
    budgetGroup,
    isRealProject,
    label: isRealProject ? "реализованный проект" : "пример исполнения",
    image: directusAssetUrl(item.image ?? item.images?.[0], fallback.image),
    alt: item.alt ?? fallback.alt,
    sizes: item.sizes ?? fallback.sizes,
    loading: item.loading ?? "lazy",
  };
}

function normalizeTags(value: DirectusProject["tags"]) {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  if (typeof value === "string") return value.split(",").map((item: string) => item.trim()).filter(Boolean);
  return null;
}
