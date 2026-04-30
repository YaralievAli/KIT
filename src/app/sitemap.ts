import type { MetadataRoute } from "next";
import { districtPages, directionPages } from "@/content/pages";
import { absoluteUrl, isApprovedSeoPage } from "@/lib/seo";

const staticRoutes = [
  {
    path: "/",
    priority: 1,
  },
  {
    path: "/privacy",
    priority: 0.3,
  },
  {
    path: "/personal-data-consent",
    priority: 0.3,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const approvedContentRoutes = [...districtPages, ...directionPages]
    .filter(isApprovedSeoPage)
    .map((page) => ({
      path: `/${page.slug}`,
      priority: 0.6,
    }));

  return [...staticRoutes, ...approvedContentRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
