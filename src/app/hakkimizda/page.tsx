import type { Metadata } from "next";
import { Fragment } from "react";
import { PublicPageShell } from "@/features/site/components/public-page-shell";
import { serverApplication } from "@/composition/server-application";
import { createPageMetadata } from "@/presentation/utils/seo-metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await serverApplication.getPublicContent();
  return createPageMetadata("/hakkimizda", content.settings.seo.about);
}

export default async function AboutPage() {
  const content = await serverApplication.getPublicContent();
  const about = content.settings.pageContent.about;
  const heroTitleLines = about.heroTitle.split("\n");
  const sectionTitleLines = about.sectionTitle.split("\n");

  return (
    <PublicPageShell settings={content.settings}>
      <main>
        <section className="detail-hero about-hero">
          <div className="container">
            <div className="eyebrow"><span /> {about.heroEyebrow}</div>
            <h1>
              {heroTitleLines.map((line, index) => (
                <Fragment key={`${line}-${index}`}>
                  {index > 0 && <br />}
                  {index === heroTitleLines.length - 1 ? <em>{line}</em> : line}
                </Fragment>
              ))}
            </h1>
            <p>{about.heroDescription}</p>
          </div>
        </section>
        <section className="about-content">
          <div className="container about-grid">
            <div>
              <div className="eyebrow"><span /> {about.sectionEyebrow}</div>
              <h2>
                {sectionTitleLines.map((line, index) => (
                  <Fragment key={`${line}-${index}`}>
                    {index > 0 && <br />}
                    {index === sectionTitleLines.length - 1 ? <em>{line}</em> : line}
                  </Fragment>
                ))}
              </h2>
            </div>
            <div className="about-copy">
              {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <a className="text-link" href="/projeler">Projelerimizi inceleyin <span aria-hidden="true" className="arrow-icon">↗</span></a>
            </div>
          </div>
          <div className="container about-values">
            {about.values.map((value, index) => (
              <article key={`${value.title}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="detail-cta">
          <div className="container">
            <h2>Birlikte sağlam<br /><em>işler yapalım.</em></h2>
            <p>Bursa ve çevre illerdeki projeniz için bizimle iletişime geçin.</p>
            <a className="button button-primary" href="/#teklif-formu">Bize ulaşın <span aria-hidden="true" className="arrow-icon">↗</span></a>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}
