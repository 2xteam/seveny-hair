import type { MetadataRoute } from "next";
import { ROUTES, siteUrl } from "@/content/seo";

/** /sitemap.xml — 공개 라우트만. /api, /post(비어 있음)는 넣지 않는다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  return [
    ...Object.values(ROUTES).map((r) => ({
      url: `${base}${r.path === "/" ? "" : r.path}`,
      lastModified: now,
      changeFrequency: r.path === "/journal" ? ("weekly" as const) : ("monthly" as const),
      priority: r.priority,
    })),
    { url: `${base}/imprint`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
