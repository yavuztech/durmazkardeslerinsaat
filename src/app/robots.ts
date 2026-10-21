import type { MetadataRoute } from "next";
import { siteOrigin } from "@/presentation/utils/seo-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: new URL("/sitemap.xml", siteOrigin).toString(),
    host: siteOrigin.toString(),
  };
}
