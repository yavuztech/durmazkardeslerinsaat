import type { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import "./site-design.css";
import "./site-overrides.css";
import StyledComponentsRegistry from "./styled-components-registry";
import { ClientApplicationProvider } from "@/composition/client-application-provider";
import { businessInfo } from "@/application/config/business-info";

export const metadata: Metadata = {
  title: `${businessInfo.name} | Bursa Şap ve Saha Betonu`,
  description: businessInfo.description,
  keywords: [
    "Bursa şap betonu",
    "saha betonu",
    "inşaat işleri",
    "Durmaz Kardeşler",
  ],
  openGraph: {
    title: businessInfo.name,
    description: businessInfo.description,
    locale: "tr_TR",
    type: "website",
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
