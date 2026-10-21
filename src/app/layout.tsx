import type { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import "./site-design.css";
import "./site-overrides.css";
import StyledComponentsRegistry from "./styled-components-registry";
import { ClientApplicationProvider } from "@/composition/client-application-provider";
import { businessInfo } from "@/application/config/business-info";
import { siteOrigin } from "@/presentation/utils/seo-metadata";

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: {
    default: "Bursa Şap Betonu ve Saha Betonu | Durmaz Kardeşler Yapı İnşaat",
    template: `%s | ${businessInfo.name}`,
  },
  description:
    "Bursa ve çevresinde daire içi şap, saha betonu, fayans ve inşaat uygulamaları. Durmaz Kardeşler Yapı İnşaat'tan teklif alın.",
  alternates: {
    canonical: siteOrigin,
  },
  keywords: [
    "Bursa şap betonu",
    "saha betonu",
    "inşaat işleri",
    "Durmaz Kardeşler",
  ],
  openGraph: {
    title: businessInfo.name,
    description:
      "Bursa ve çevresinde daire içi şap, saha betonu, fayans ve inşaat uygulamaları.",
    locale: "tr_TR",
    type: "website",
    siteName: businessInfo.name,
    url: siteOrigin,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <StyledComponentsRegistry>
          <ClientApplicationProvider>{children}</ClientApplicationProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
