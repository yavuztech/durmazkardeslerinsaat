import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SiteSettings } from "@/domain/entities/cms-content";
import { getWhatsAppUrl } from "@/presentation/utils/whatsapp";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const phoneHref = settings.phone.replace(/[^\d+]/g, "");
  const whatsappUrl = getWhatsAppUrl(
    "Merhaba, projem hakkında bilgi almak istiyorum.",
    settings.whatsapp,
  );

  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <Link href="/" className="brand brand-footer">
            <img className="brand-image" src={settings.logo || "/logo.svg"} alt="" />
            <span className="brand-copy">
              <strong>DURMAZ KARDEŞLER</strong>
              <small>YAPI İNŞAAT</small>
            </span>
          </Link>
          <p className="footer-pitch">Bursa ve çevresinde sağlam zeminler.<br />Güvenilir yapı çözümleri.</p>
        </div>
        <div className="footer-contact">
          <span className="footer-label">YENİ BİR PROJE Mİ VAR?</span>
          <Link className="footer-email" href="/#teklif-formu">
            Projenizi konuşalım <ArrowUpRight size={21} />
          </Link>
          <div className="footer-contact-links">
            {settings.phone && <a href={`tel:${phoneHref}`}>Telefon: {settings.phone}</a>}
            {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
            {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp’tan yazın <ArrowUpRight size={14} /></a>}
          </div>
        </div>
        <nav className="footer-links" aria-label="Alt menü">
          <span className="footer-label">KEŞFEDİN</span>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/hizmetlerimiz">Hizmetlerimiz</Link>
          <Link href="/projeler">Projeler</Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Durmaz Kardeşler Yapı İnşaat</span>
        <span>{settings.serviceArea} · GÜVENLE İNŞA EDİLEN YAPILAR</span>
        <Link href="/">ANA SAYFA ↑</Link>
      </div>
    </footer>
  );
}
