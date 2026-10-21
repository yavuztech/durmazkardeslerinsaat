import type { Metadata } from "next";
import HomePage from "@/features/home/components/home-page";
import { serverApplication } from "@/composition/server-application";
import { createPageMetadata } from "@/presentation/utils/seo-metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await serverApplication.getPublicContent();
  return createPageMetadata("/", content.settings.seo.home);
}

export default async function HomeRoute() {
  const content = await serverApplication.getPublicContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "Durmaz Kardeşler Yapı İnşaat",
    url: "https://durmazkardeslerinsaat.com",
    logo: "https://durmazkardeslerinsaat.com/logo.svg",
    description: content.settings.seo.home.description,
    telephone: content.settings.phone || undefined,
    areaServed: {
      "@type": "AdministrativeArea",
      name: content.settings.serviceArea,
    },
  };
  const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />
      <HomePage
        initialContent={{
          services: content.services,
          projects: content.projects,
          settings: content.settings,
        }}
      />
    </>
  );
}
