"use client";

import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Fragment } from "react";
import type { PublicSiteContent } from "@/domain/entities/cms-content";
import { useHomeContent } from "@/features/home/hooks/use-home-content";
import { CraneScene } from "@/features/home/components/crane-scene";
import { Reveal } from "@/features/home/components/reveal";
import { QuoteSection } from "@/features/inquiries/components/quote-section";
import { ProjectCarousel } from "@/features/projects/components/project-carousel";
import { ServicesSection } from "@/features/services/components/services-section";
import { SiteFooter } from "@/features/site/components/site-footer";
import { SiteHeader } from "@/features/site/components/site-header";
import { getWhatsAppUrl } from "@/presentation/utils/whatsapp";

export default function HomePage({
  initialContent,
}: {
  initialContent: PublicSiteContent;
}) {
  const content = useHomeContent(initialContent);
  const whatsappUrl = getWhatsAppUrl(
    "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.",
    content.settings.whatsapp,
  );
  const titleParts = content.settings.heroTitle.split(/(sağlam)/i);
  const about = content.settings.pageContent.about;
  const aboutTitleLines = about.landingTitle.split("\n");
  const projectTitleLines = content.settings.pageContent.projects.sectionTitle.split("\n");

  return (
    <>
      <SiteHeader logo={content.settings.logo} />
      <main id="top">
        <section className="hero" id="anasayfa">
          <div className="hero-copy">
            <Reveal>
              <div className="eyebrow">
                <span className="eyebrow-rule" />
                BURSA’DA SAĞLAM İŞ, SAĞLAM ZEMİN
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1>
                {titleParts.map((part, index) => (
                  <span key={`${part}-${index}`}>
                    {part.toLocaleLowerCase("tr-TR") === "sağlam"
                      ? <em>{part}</em>
                      : part}
                  </span>
                ))}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="hero-description">{content.settings.heroDescription}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="hero-actions">
                <a className="button button-light" href="/projeler">
                  Projelerimizi keşfet <ArrowUpRight size={17} />
                </a>
                {whatsappUrl ? (
                  <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">
                    WhatsApp’tan yazın <ArrowRight size={16} />
                  </a>
                ) : (
                  <a className="text-link" href="/hakkimizda">
                    Bizi tanıyın <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </Reveal>
            <div className="hero-bottom-note">
              <span>01 / 04</span>
              <span className="note-divider" />
              <span>ŞAP • SAHA BETONU • İNŞAAT</span>
            </div>
          </div>
          <CraneScene />
          <div className="hero-watermark" aria-hidden="true">DK</div>
          <a className="scroll-cue" href="#hakkimizda">
            <span>KEŞFETMEK İÇİN KAYDIR</span><ArrowDown size={15} />
          </a>
        </section>

        <section className="intro section-pad" id="hakkimizda">
          <Reveal className="intro-kicker">
            <span className="section-number">01</span>
            <span>{about.landingEyebrow}</span>
          </Reveal>
          <div className="intro-content">
            <Reveal>
              <h2>
                {aboutTitleLines.map((line, index) => (
                  <Fragment key={`${line}-${index}`}>
                    {index > 0 && <br />}
                    {index === aboutTitleLines.length - 1 ? <em>{line}</em> : line}
                  </Fragment>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="intro-body">
                <p className="lead">{about.landingLead}</p>
                <p>{about.landingDescription}</p>
                <a className="underlined-link" href="/hakkimizda">
                  Hikâyemizi keşfedin <ArrowUpRight size={17} />
                </a>
              </div>
            </Reveal>
          </div>
          <div className="intro-stats">
            <div><strong>01<span>—</span></strong><span>İŞİNİZE ÖZEL PLANLAMA</span></div>
            <div><strong>360<span>°</span></strong><span>UÇTAN UCA UYGULAMA</span></div>
            <div><strong>∞</strong><span>KALICI DEĞER ANLAYIŞI</span></div>
          </div>
        </section>

        <ServicesSection
          services={content.services}
          pageContent={content.settings.pageContent.services}
        />

        <section className="projects section-pad" id="projeler">
          <div className="projects-heading">
            <Reveal>
              <div className="eyebrow">
                <span className="eyebrow-rule" /> {content.settings.pageContent.projects.sectionEyebrow}
              </div>
              <h2>
                {projectTitleLines.map((line, index) => (
                  <Fragment key={`${line}-${index}`}>
                    {index > 0 && <br />}
                    {index === projectTitleLines.length - 1 ? <span>{line}</span> : line}
                  </Fragment>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <a href="/projeler" className="text-link">
                Tüm projeler <ArrowUpRight size={17} />
              </a>
            </Reveal>
          </div>
          <p className="project-disclaimer">{content.settings.pageContent.projects.sectionDescription}</p>
          {content.projects.length > 0
            ? <ProjectCarousel projects={content.projects} />
            : <p className="detail-empty">Gösterilecek proje bulunmuyor.</p>}
          <p className="project-disclaimer">{content.settings.pageContent.projects.portfolioNote}</p>
        </section>

        <section className="process-section">
          <div className="container process-inner">
            <Reveal>
              <div className="eyebrow eyebrow-light">
                <span className="eyebrow-rule" /> NASIL ÇALIŞIYORUZ?
              </div>
              <h2>İlk görüşmeden son<br />dokunuşa <em>kadar.</em></h2>
            </Reveal>
            <div className="process-steps">
              <Reveal>
                <div><span>01</span><h3>İhtiyacınızı dinliyoruz</h3><p>Projenizi ve beklentilerinizi tanıyoruz.</p></div>
              </Reveal>
              <Reveal delay={0.08}>
                <div><span>02</span><h3>Yerinde değerlendiriyoruz</h3><p>Uygulama alanına uygun çözümü planlıyoruz.</p></div>
              </Reveal>
              <Reveal delay={0.16}>
                <div><span>03</span><h3>İşimize güveniyoruz</h3><p>Uygulamayı özenle tamamlayıp teslim ediyoruz.</p></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="manifesto">
          <div className="manifesto-grid" />
          <Reveal>
            <span className="manifesto-label">BİR SONRAKİ ADIMINIZ</span>
            <h2>Hayalinizdeki yapı<br /><em>sağlam zeminde başlar.</em></h2>
            <p>Yeni bir proje mi planlıyorsunuz? Gelin, sağlam bir başlangıcı birlikte yapalım.</p>
            <a className="button button-blue" href="/#teklif-formu">
              Projenizi konuşalım <ArrowUpRight size={17} />
            </a>
          </Reveal>
          <span className="manifesto-mark" aria-hidden="true">DK</span>
        </section>

        <QuoteSection
          phone={content.settings.phone}
          whatsapp={content.settings.whatsapp}
          services={content.services}
        />
      </main>
      <SiteFooter settings={content.settings} />
    </>
  );
}
