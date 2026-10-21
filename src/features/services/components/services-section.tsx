import { Fragment } from "react";
import type { Service, SitePageContent } from "@/domain/entities/cms-content";

export function ServicesSection({
  services,
  pageContent,
}: {
  services: Service[];
  pageContent: SitePageContent["services"];
}) {
  const titleLines = pageContent.sectionTitle.split("\n");

  return (
    <section className="services section-pad" id="uzmanlik">
      <div className="services-inner">
        <div className="section-heading">
          <div>
            <div className="eyebrow eyebrow-dark"><span className="eyebrow-rule" /> {pageContent.sectionEyebrow}</div>
            <h2>
              {titleLines.map((line, index) => (
                <Fragment key={`${line}-${index}`}>
                  {index > 0 && <br />}
                  {index === titleLines.length - 1 ? <span>{line}</span> : line}
                </Fragment>
              ))}
            </h2>
          </div>
          <p>
            {pageContent.sectionDescription}
            {" "}<a className="section-more" href="/hizmetlerimiz">Tüm hizmetler <span aria-hidden="true">↗</span></a>
          </p>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <article className="service-row" id={`hizmet-${service.id}`} key={service.id}>
              <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="service-icon" aria-hidden="true">{service.icon}</span>
              <div className="service-copy">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
