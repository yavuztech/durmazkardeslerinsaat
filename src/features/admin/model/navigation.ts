export type AdminSection =
  | "overview"
  | "projects"
  | "services"
  | "inquiries"
  | "settings";

export const adminSections: {
  id: AdminSection;
  label: string;
  icon: string;
}[] = [
  { id: "overview", label: "Genel Bakış", icon: "▦" },
  { id: "projects", label: "Projeler", icon: "▤" },
  { id: "services", label: "Hizmetler", icon: "⌂" },
  { id: "inquiries", label: "Teklif Talepleri", icon: "✉" },
  { id: "settings", label: "Site Ayarları", icon: "⚙" },
];

export const adminSectionContent: Record<
  AdminSection,
  { eyebrow: string; title: string; description: string }
> = {
  overview: {
    eyebrow: "YÖNETİM PANELİ",
    title: "Genel Bakış",
    description: "Web sitenizin içerik ve teklif performansı.",
  },
  projects: {
    eyebrow: "İÇERİK YÖNETİMİ",
    title: "Projeler",
    description: "Tamamlanan ve devam eden işlerinizi yönetin.",
  },
  services: {
    eyebrow: "İÇERİK YÖNETİMİ",
    title: "Hizmetler",
    description: "Sitenizde sunduğunuz hizmetleri düzenleyin.",
  },
  inquiries: {
    eyebrow: "MÜŞTERİ İLETİŞİMİ",
    title: "Teklif Talepleri",
    description: "Form üzerinden gelen müşteri taleplerini takip edin.",
  },
  settings: {
    eyebrow: "WEB SİTESİ",
    title: "Site Ayarları",
    description: "İletişim ve ana sayfa bilgilerinizi güncelleyin.",
  },
};
