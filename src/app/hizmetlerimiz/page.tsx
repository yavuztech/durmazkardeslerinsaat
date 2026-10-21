import type { Metadata } from "next";
import { Fragment } from "react";
import { serverApplication } from "@/composition/server-application";
import { PublicPageShell } from "@/features/site/components/public-page-shell";
import { ServicesSection } from "@/features/services/components/services-section";
import { createPageMetadata } from "@/presentation/utils/seo-metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await serverApplication.getPublicContent();
  return createPageMetadata("/hizmetlerimiz", content.settings.seo.services);
}

export default async function ServicesPage() {
  const content = await serverApplication.getPublicContent();
  const services = content.services;
  const pageContent = content.settings.pageContent.services;
  const titleLines = pageContent.pageTitle.split("\n");

  return (
    <PublicPageShell settings={content.settings}>
      <main>
        <section className="detail-hero">
          <div className="container">
            <div className="eyebrow"><span /> {pageContent.sectionEyebrow}</div>
            <h1>
              {titleLines.map((line, index) => (
                <Fragment key={`${line}-${index}`}>
                  {index > 0 && <br />}
                  {index === titleLines.length - 1 ? <em>{line}</em> : line}
                </Fragment>
              ))}
            </h1>
            <p>{pageContent.pageDescription}</p>
          </div>
        </section>
        <ServicesSection services={services} pageContent={pageContent} />
        <section className="detail-cta">
          <div className="container">
            <h2>Projenizin ihtiyacını<br /><em>birlikte belirleyelim.</em></h2>
            <p>Uygulama alanınız ve beklentileriniz hakkında konuşmak için bize ulaşın.</p>
            <a className="button button-primary" href="/#teklif-formu">Teklif isteyin <span aria-hidden="true" className="arrow-icon">↗</span></a>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}
