import type { MetadataRoute } from "next";
import { siteOrigin } from "@/presentation/utils/seo-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/hizmetlerimiz", priority: 0.9 },
    { path: "/projeler", priority: 0.8 },
    { path: "/hakkimizda", priority: 0.7 },
  ];

  return pages.map(({ path, priority }) => ({
    url: new URL(path, siteOrigin).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
