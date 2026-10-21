import type { ReactNode } from "react";
import type { SiteSettings } from "@/domain/entities/cms-content";
import { SiteFooter } from "@/features/site/components/site-footer";
import { SiteHeader } from "@/features/site/components/site-header";

export function PublicPageShell({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader logo={settings.logo} />
      {children}
      <SiteFooter settings={settings} />
    </>
  );
}
