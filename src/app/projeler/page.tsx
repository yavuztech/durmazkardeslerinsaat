import type { Metadata } from "next";
import { Fragment } from "react";
import { ProjectGrid } from "@/features/projects/components/project-grid";
import { PublicPageShell } from "@/features/site/components/public-page-shell";
import { serverApplication } from "@/composition/server-application";

export const metadata: Metadata = {
  title: "Projelerimiz | Durmaz Kardeşler Yapı İnşaat",
  description: "Durmaz Kardeşler Yapı İnşaat'ın tamamladığı zemin ve saha uygulamalarını inceleyin.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const content = await serverApplication.getPublicContent();
  const projects = content.projects;
  const pageContent = content.settings.pageContent.projects;
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
        <section className="detail-content">
          <div className="container">
            <ProjectGrid projects={projects} />
            {projects.length > 0 && <p className="portfolio-note">{pageContent.portfolioNote}</p>}
          </div>
        </section>
        <section className="detail-cta">
          <div className="container">
            <h2>Sıradaki proje<br /><em>sizin olabilir.</em></h2>
            <p>Projenizi paylaşın, ihtiyaçlarınıza uygun çözümü birlikte planlayalım.</p>
            <a className="button button-primary" href="/#teklif-formu">Projenizi konuşalım <span aria-hidden="true" className="arrow-icon">↗</span></a>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}
