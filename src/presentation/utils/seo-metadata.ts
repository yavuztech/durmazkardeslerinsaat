import type { Metadata } from "next";
import type { PageSeo } from "@/domain/entities/cms-content";

export const siteOrigin = new URL("https://durmazkardeslerinsaat.com");

export function createPageMetadata(path: string, seo: PageSeo): Metadata {
  const url = new URL(path, siteOrigin);
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: "Durmaz Kardeşler Yapı İnşaat",
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description,
    },
  };
}
