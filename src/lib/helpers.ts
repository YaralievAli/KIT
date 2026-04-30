import type { Claim, Project } from "@/types/content";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function claimDisplay(claim: Claim) {
  if (!claim.visible) return null;
  return claim.verified ? claim.text : claim.cautiousText ?? null;
}

export function projectBadge(project: Pick<Project, "isRealProject" | "label">) {
  return project.isRealProject ? "реализованный проект" : project.label || "пример исполнения";
}

export function projectCollectionTitle(projects: Project[]) {
  return projects.some((project) => project.isRealProject) ? "Реализованные проекты" : "Примеры кухонь";
}
