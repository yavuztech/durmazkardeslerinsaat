"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useApplication } from "@/presentation/context/application-context";
import { getWhatsAppUrl } from "@/presentation/utils/whatsapp";
import type { Service } from "@/domain/entities/cms-content";

type QuoteFormValues = {
  name: string;
  phone: string;
  service: string;
  details: string;
};

export function QuoteSection({
  phone,
  whatsapp,
  services,
}: {
  phone: string;
  whatsapp: string;
  services: Service[];
}) {
  const application = useApplication();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuoteFormValues>();

  async function onSubmit(values: QuoteFormValues) {
    setMessage("");
    setSending(true);
    const whatsappWindow = window.open("about:blank", "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;

    try {
      await application.submitInquiry(values);
      const whatsappMessage = `Merhaba, teklif almak istiyorum.\n\nAd Soyad: ${values.name}\nTelefon: ${values.phone}\nHizmet: ${values.service}\nProje detayı: ${values.details || "Belirtilmedi"}`;
      const whatsappUrl = getWhatsAppUrl(whatsappMessage, whatsapp);
      setMessage(whatsappUrl
        ? "Talebiniz kaydedildi; WhatsApp mesajı yeni sekmede hazırlandı."
        : "Talebiniz alındı. WhatsApp bağlantısı şu anda yapılandırılmamış.");
      reset();
      if (whatsappWindow) {
        if (whatsappUrl) whatsappWindow.location.replace(whatsappUrl);
        else whatsappWindow.close();
      }
    } catch {
      whatsappWindow?.close();
      setMessage("Talebiniz gönderilemedi. Lütfen telefonla bize ulaşın ve tekrar deneyin.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="quote-section" id="iletisim">
      <div className="container quote-grid">
        <div className="quote-copy">
          <div className="eyebrow"><span /> BİZE ULAŞIN</div>
          <h2>Projenizi<br /><em>konuşalım.</em></h2>
          <p>İhtiyacınızı kısaca anlatın, size en kısa sürede dönüş yapalım.</p>
          <div className="contact-links">
            {phone ? (
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}><span className="contact-icon">↗</span><span><small>TELEFONLA ARAYIN</small><strong>{phone}</strong></span></a>
            ) : (
              <div><span className="contact-icon">↗</span><span><small>TELEFONLA ARAYIN</small><strong>Telefon bilgisi eklenecek</strong></span></div>
            )}
            {whatsapp ? (
              <a href={getWhatsAppUrl("Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.", whatsapp)} target="_blank" rel="noreferrer"><span className="contact-icon">◌</span><span><small>WHATSAPP&apos;TAN YAZIN</small><strong>Hızlıca iletişime geçin</strong></span></a>
            ) : (
              <div><span className="contact-icon">◌</span><span><small>WHATSAPP&apos;TAN YAZIN</small><strong>WhatsApp bilgisi eklenecek</strong></span></div>
            )}
          </div>
        </div>
        <form className="quote-form" id="teklif-formu" onSubmit={handleSubmit(onSubmit, () => setMessage("Lütfen adınızı, geçerli telefon numaranızı ve hizmet seçiminizi kontrol edin."))}>
          <h3>Ücretsiz teklif isteyin</h3>
          <p>Formu doldurun, projeniz için size ulaşalım.</p>
          <label htmlFor="name">Adınız soyadınız</label>
          <input id="name" placeholder="Örn. Ahmet Yılmaz" autoComplete="name" {...register("name", { required: true, minLength: 2, maxLength: 100 })} aria-invalid={Boolean(errors.name)} />
          <label htmlFor="phone">Telefon numaranız</label>
          <input id="phone" type="tel" placeholder="05__ ___ __ __" autoComplete="tel" {...register("phone", { required: true, pattern: /^[+\d\s()-]{7,40}$/ })} aria-invalid={Boolean(errors.phone)} />
          <label htmlFor="service">İlgilendiğiniz hizmet</label>
          <select id="service" defaultValue="" {...register("service", { required: true })} aria-invalid={Boolean(errors.service)}>
            <option value="" disabled>Hizmet seçin</option>
            {services.map((service) => <option key={service.id}>{service.title}</option>)}
          </select>
          <label htmlFor="details">Projeniz hakkında <span>(isteğe bağlı)</span></label>
          <textarea id="details" rows={3} placeholder="Proje konumu, yaklaşık alan..." {...register("details", { maxLength: 2000 })} />
          <button className="button button-blue form-submit" type="submit" disabled={sending}>{sending ? "Gönderiliyor…" : <>Teklif talebini gönder <span aria-hidden="true" className="arrow-icon">↗</span></>}</button>
          {message && <p className="form-message" role="status">{message}</p>}
          <small className="form-privacy">Formu göndererek sizinle iletişime geçilmesini kabul etmiş olursunuz.</small>
        </form>
      </div>
    </section>
  );
}
