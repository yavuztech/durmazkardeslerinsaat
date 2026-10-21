"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { adminSectionContent, adminSections, type AdminSection } from "@/features/admin/model/navigation";
import { useAdminDashboard } from "@/features/admin/hooks/use-admin-dashboard";
import { ProjectList } from "@/features/projects/components/project-list";
import { InquiryTable } from "@/features/inquiries/components/inquiry-table";
import { ServiceList } from "@/features/services/components/service-list";
import {
  BrandImage,
  Button,
  ChartBox,
  ChartGrid,
  ErrorMessage,
  Eyebrow,
  Field,
  FormGrid,
  GalleryImage,
  GlobalStyle,
  Heading,
  ImageGallery,
  InlineActions,
  Layout,
  Main,
  Modal,
  ModalActions,
  MobileMenuBackdrop,
  MobileMenuButton,
  DrawerLogout,
  Navigation,
  Overlay,
  Panel,
  SettingGrid,
  SettingsForm,
  Shell,
  SideLogo,
  Sidebar,
  SidebarBottom,
  StatCard,
  StatGrid,
  TablePanel,
  Topbar,
} from "@/features/admin/styles/admin-dashboard.styles";

ChartJS.register(
  ArcElement,
  CategoryScale,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
);

type Section = AdminSection;

export default function AdminDashboard() {
  const {
    content, error, loading, uploading, section, setSection, editor, setEditor,
    feedback, setFeedback, editorForm, settingsForm, inquiries, recentInquiries,
    weekCounts, newInquiryCount, refreshContent, logout, openEditor, saveEditor,
    deleteItem, uploadImage, uploadProjectImages, updateInquiry, deleteInquiry, saveSettings,
  } = useAdminDashboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectImageUrl, setProjectImageUrl] = useState("");
  const projectImages = editorForm.watch("images") ?? [];
  const current = adminSectionContent[section];
  const newInquiries = newInquiryCount;
  const projectCount = content?.projects.length ?? 0;
  const serviceCount = content?.services.length ?? 0;
  const doughnutData = {
    labels: ["Tamamlanan", "Devam eden"],
    datasets: [{
      data: [
        content?.projects.filter((item) => item.status === "completed").length ?? 0,
        content?.projects.filter((item) => item.status === "ongoing").length ?? 0,
      ],
      backgroundColor: ["#087bff", "#cfe3fb"],
      borderWidth: 0,
      cutout: "75%",
    }],
  };
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { usePointStyle: true, boxWidth: 7, font: { size: 10 } },
      },
    },
  };

  function openContentEditor(type: "projects" | "services", item?: Parameters<typeof openEditor>[1]) {
    setProjectImageUrl("");
    openEditor(type, item);
  }

  function setProjectGallery(images: string[]) {
    editorForm.setValue("images", images, { shouldValidate: true });
    editorForm.setValue("image", images[0] ?? "", { shouldValidate: true });
  }

  function addProjectImageUrl() {
    const imageUrl = projectImageUrl.trim();
    try {
      if (imageUrl.length > 2048) {
        throw new Error("Image URL is too long");
      }
      if (!/^\/uploads\/[a-z\d-]+\.(?:jpg|png|webp)$/i.test(imageUrl)) {
        const parsedUrl = new URL(imageUrl);
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
          throw new Error("Unsupported image URL protocol");
        }
      }
      if (projectImages.length >= 10) {
        setFeedback("Bir projeye en fazla 10 görsel ekleyebilirsiniz.");
        return;
      }
      if (projectImages.includes(imageUrl)) {
        setFeedback("Bu görsel galeriye zaten eklenmiş.");
        return;
      }
      setProjectGallery([...projectImages, imageUrl]);
      setProjectImageUrl("");
      setFeedback("");
    } catch {
      setFeedback("Geçerli bir https:// veya http:// görsel adresi girin.");
    }
  }

  return (
    <>
      <GlobalStyle />
      <Shell>
        <Layout>
          <Sidebar>
            <SideLogo>
              <BrandImage src={content?.settings.logo || "/logo.svg"} alt="" />
              <span>DURMAZ KARDEŞLER<small>İÇERİK YÖNETİMİ</small></span>
              <MobileMenuButton
                type="button"
                aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                aria-expanded={mobileMenuOpen}
                aria-controls="admin-navigation"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
              </MobileMenuButton>
            </SideLogo>
            {mobileMenuOpen && (
              <MobileMenuBackdrop
                type="button"
                aria-label="Menüyü kapat"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
            <Navigation id="admin-navigation" $open={mobileMenuOpen} aria-label="Yönetim menüsü">
              {adminSections.map((item) => (
                <button key={item.id} type="button" aria-current={section === item.id ? "page" : undefined} onClick={() => { setSection(item.id); setFeedback(""); setMobileMenuOpen(false); }}>
                  <i>{item.icon}</i>{item.label}{item.id === "inquiries" && newInquiries > 0 ? ` · ${newInquiries}` : ""}
                </button>
              ))}
              <DrawerLogout type="button" onClick={() => void logout()}>
                Güvenli çıkış <span aria-hidden="true">↗</span>
              </DrawerLogout>
            </Navigation>
            <SidebarBottom>İçeriklerinizi yönetin.<br />Her değişiklik anında siteye yansır.</SidebarBottom>
          </Sidebar>

          <Main>
            <Topbar><span>Durmaz Kardeşler Yapı İnşaat　/　{current.title}</span><Button $quiet type="button" onClick={() => void logout()}>Güvenli çıkış ↗</Button></Topbar>
            <Heading>
              <div><h1>{current.title}</h1><p>{current.description}</p></div>
              {(section === "projects" || section === "services") && <Button type="button" onClick={() => openContentEditor(section)}>＋ Yeni {section === "projects" ? "proje" : "hizmet"} ekle</Button>}
              {section === "inquiries" && <Button $quiet type="button" disabled={loading} onClick={() => void refreshContent()}>{loading ? "Yükleniyor…" : "↻ Yenile"}</Button>}
            </Heading>
            {(error || feedback) && <ErrorMessage role="status">{feedback || error}</ErrorMessage>}

            {section === "overview" && (
              <>
                <StatGrid>
                  <StatCard><span>Toplam proje</span><strong>{projectCount}</strong><small>Portföydeki tüm projeler</small></StatCard>
                  <StatCard><span>Aktif hizmet</span><strong>{content?.services.filter((item) => item.active).length ?? 0}</strong><small>{serviceCount} hizmet tanımlı</small></StatCard>
                  <StatCard><span>Toplam teklif</span><strong>{inquiries.length}</strong><small>Web formu üzerinden gelen</small></StatCard>
                  <StatCard><span>Yeni teklifler</span><strong>{newInquiries}</strong><small>İletişim bekleyen talepler</small></StatCard>
                </StatGrid>
                <ChartGrid>
                  <Panel><header><h2>Teklif hareketleri</h2><span>Son 7 gün</span></header><ChartBox><Line data={{
                    labels: weekCounts.labels,
                    datasets: [{ label: "Teklif", data: weekCounts.values, fill: true, tension: .35, borderColor: "#0056b3", backgroundColor: "rgba(8,123,255,.15)", pointBackgroundColor: "#0056b3", pointRadius: 3 }],
                  }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#dce3e8" } }, x: { grid: { display: false } } } }} /></ChartBox></Panel>
                  <Panel><header><h2>Proje durumu</h2><span>{projectCount} proje</span></header><ChartBox><Doughnut data={doughnutData} options={doughnutOptions} /></ChartBox></Panel>
                </ChartGrid>
                <TablePanel><header><h2>Son teklif talepleri</h2><Button $quiet type="button" onClick={() => setSection("inquiries")}>Tümünü gör →</Button></header><InquiryTable inquiries={recentInquiries} onUpdate={updateInquiry} onDelete={deleteInquiry} /></TablePanel>
              </>
            )}

            {section === "projects" && (
              <ProjectList
                projects={content?.projects ?? []}
                onEdit={(project) => openContentEditor("projects", project)}
                onDelete={(id) => void deleteItem("projects", id)}
              />
            )}

            {section === "services" && (
              <ServiceList
                services={content?.services ?? []}
                onEdit={(service) => openContentEditor("services", service)}
                onDelete={(id) => void deleteItem("services", id)}
              />
            )}

            {section === "inquiries" && <TablePanel><header><h2>Müşteri talepleri</h2><span>{inquiries.length} kayıt · {newInquiries} yeni</span></header><InquiryTable inquiries={inquiries} onUpdate={updateInquiry} onDelete={deleteInquiry} /></TablePanel>}

            {section === "settings" && content && (
              <SettingsForm onSubmit={settingsForm.handleSubmit(saveSettings)}>
                <SettingGrid>
                  <Panel><header><h2>İletişim bilgileri</h2></header>
                    <Field $full>Firma logosu <span>(JPG, PNG veya WebP · en fazla 4 MB)</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void uploadImage(event.target.files?.[0], "logo")} /><input type="url" placeholder="Logo görsel URL'si veya yüklediğiniz dosya" {...settingsForm.register("logo")} /></Field>
                    <Field>Telefon<input {...settingsForm.register("phone", { required: "Telefon zorunludur." })} placeholder="+90 5__ ___ __ __" /></Field>
                    <Field>WhatsApp numarası <span>(ülke kodu ve rakamlar)</span><input {...settingsForm.register("whatsapp", { required: "WhatsApp numarası zorunludur." })} placeholder="905356801489" /></Field>
                    <Field>E-posta<input type="email" {...settingsForm.register("email")} placeholder="info@firmaniz.com" /></Field>
                    <Field>Hizmet bölgesi<input {...settingsForm.register("serviceArea")} /></Field>
                  </Panel>
                  <Panel><header><h2>Ana sayfa içeriği</h2></header>
                    <Field $full>Ana başlık<input {...settingsForm.register("heroTitle", { required: true })} /></Field>
                    <Field $full>Açıklama<textarea rows={4} {...settingsForm.register("heroDescription", { required: true })} /></Field>
                  </Panel>
                </SettingGrid>
                <SettingGrid>
                  {([
                    ["home", "Ana sayfa"],
                    ["services", "Hizmetlerimiz"],
                    ["projects", "Projeler"],
                    ["about", "Hakkımızda"],
                  ] as const).map(([page, label]) => (
                    <Panel key={page}><header><h2>{label} SEO</h2></header>
                      <Field $full>Google başlığı <span>(en fazla 70 karakter)</span><input maxLength={70} {...settingsForm.register(`seo.${page}.title`, { required: true, maxLength: 70 })} /></Field>
                      <Field $full>Arama açıklaması <span>(en fazla 170 karakter)</span><textarea rows={3} maxLength={170} {...settingsForm.register(`seo.${page}.description`, { required: true, maxLength: 170 })} /></Field>
                    </Panel>
                  ))}
                </SettingGrid>
                <SettingGrid>
                  <Panel><header><h2>Hizmetlerimiz bölümü</h2></header>
                    <Field $full>Bölüm üst başlığı<input maxLength={60} {...settingsForm.register("pageContent.services.sectionEyebrow", { required: true, maxLength: 60 })} /></Field>
                    <Field $full>Bölüm başlığı <span>(satırları ayırmak için alt satır kullanın)</span><textarea rows={2} maxLength={180} {...settingsForm.register("pageContent.services.sectionTitle", { required: true, maxLength: 180 })} /></Field>
                    <Field $full>Bölüm açıklaması<textarea rows={3} maxLength={500} {...settingsForm.register("pageContent.services.sectionDescription", { required: true, maxLength: 500 })} /></Field>
                    <Field $full>Hizmetler sayfası başlığı<textarea rows={2} maxLength={180} {...settingsForm.register("pageContent.services.pageTitle", { required: true, maxLength: 180 })} /></Field>
                    <Field $full>Hizmetler sayfası açıklaması<textarea rows={3} maxLength={500} {...settingsForm.register("pageContent.services.pageDescription", { required: true, maxLength: 500 })} /></Field>
                  </Panel>
                  <Panel><header><h2>Projeler bölümü</h2></header>
                    <Field $full>Bölüm üst başlığı<input maxLength={60} {...settingsForm.register("pageContent.projects.sectionEyebrow", { required: true, maxLength: 60 })} /></Field>
                    <Field $full>Bölüm başlığı <span>(satırları ayırmak için alt satır kullanın)</span><textarea rows={2} maxLength={180} {...settingsForm.register("pageContent.projects.sectionTitle", { required: true, maxLength: 180 })} /></Field>
                    <Field $full>Bölüm açıklaması<textarea rows={3} maxLength={500} {...settingsForm.register("pageContent.projects.sectionDescription", { required: true, maxLength: 500 })} /></Field>
                    <Field $full>Projeler sayfası başlığı<textarea rows={2} maxLength={180} {...settingsForm.register("pageContent.projects.pageTitle", { required: true, maxLength: 180 })} /></Field>
                    <Field $full>Projeler sayfası açıklaması<textarea rows={3} maxLength={500} {...settingsForm.register("pageContent.projects.pageDescription", { required: true, maxLength: 500 })} /></Field>
                    <Field $full>Portföy alt notu<textarea rows={2} maxLength={300} {...settingsForm.register("pageContent.projects.portfolioNote", { required: true, maxLength: 300 })} /></Field>
                  </Panel>
                </SettingGrid>
                <SettingGrid>
                  <Panel><header><h2>Ana sayfa Hakkımızda bölümü</h2></header>
                    <Field $full>Bölüm üst başlığı<input maxLength={60} {...settingsForm.register("pageContent.about.landingEyebrow", { required: true, maxLength: 60 })} /></Field>
                    <Field $full>Bölüm başlığı <span>(satırları ayırmak için alt satır kullanın)</span><textarea rows={3} maxLength={180} {...settingsForm.register("pageContent.about.landingTitle", { required: true, maxLength: 180 })} /></Field>
                    <Field $full>Kısa vurgu metni<textarea rows={2} maxLength={300} {...settingsForm.register("pageContent.about.landingLead", { required: true, maxLength: 300 })} /></Field>
                    <Field $full>Açıklama<textarea rows={4} maxLength={700} {...settingsForm.register("pageContent.about.landingDescription", { required: true, maxLength: 700 })} /></Field>
                  </Panel>
                  <Panel><header><h2>Hakkımızda sayfası</h2></header>
                    <Field $full>Üst başlık<input maxLength={60} {...settingsForm.register("pageContent.about.heroEyebrow", { required: true, maxLength: 60 })} /></Field>
                    <Field $full>Ana başlık<textarea rows={2} maxLength={180} {...settingsForm.register("pageContent.about.heroTitle", { required: true, maxLength: 180 })} /></Field>
                    <Field $full>Giriş açıklaması<textarea rows={3} maxLength={500} {...settingsForm.register("pageContent.about.heroDescription", { required: true, maxLength: 500 })} /></Field>
                    <Field $full>İçerik üst başlığı<input maxLength={60} {...settingsForm.register("pageContent.about.sectionEyebrow", { required: true, maxLength: 60 })} /></Field>
                    <Field $full>İçerik başlığı<textarea rows={2} maxLength={180} {...settingsForm.register("pageContent.about.sectionTitle", { required: true, maxLength: 180 })} /></Field>
                    <Field $full>Birinci paragraf<textarea rows={4} maxLength={700} {...settingsForm.register("pageContent.about.paragraphs.0", { required: true, maxLength: 700 })} /></Field>
                    <Field $full>İkinci paragraf<textarea rows={4} maxLength={700} {...settingsForm.register("pageContent.about.paragraphs.1", { required: true, maxLength: 700 })} /></Field>
                  </Panel>
                </SettingGrid>
                <SettingGrid>
                  {([0, 1, 2] as const).map((index) => (
                    <Panel key={index}><header><h2>Hakkımızda değer kartı {index + 1}</h2></header>
                      <Field $full>Başlık<input maxLength={100} {...settingsForm.register(`pageContent.about.values.${index}.title`, { required: true, maxLength: 100 })} /></Field>
                      <Field $full>Açıklama<textarea rows={3} maxLength={250} {...settingsForm.register(`pageContent.about.values.${index}.description`, { required: true, maxLength: 250 })} /></Field>
                    </Panel>
                  ))}
                </SettingGrid>
                <InlineActions><Button type="submit" disabled={settingsForm.formState.isSubmitting}>Ayarları kaydet →</Button></InlineActions>
              </SettingsForm>
            )}
          </Main>
        </Layout>

        {editor && (
          <Overlay onMouseDown={(event) => { if (event.target === event.currentTarget) setEditor(null); }}>
            <Modal onSubmit={editorForm.handleSubmit(saveEditor)}>
              <h2>{editor.id ? "İçeriği düzenle" : `Yeni ${editor.type === "projects" ? "proje" : "hizmet"}`}</h2>
              <p>Kaydettiğiniz bilgiler web sitenizde hemen yayınlanır.</p>
              <FormGrid>
                <Field $full>Başlık<input {...editorForm.register("title", { required: "Başlık zorunludur.", maxLength: 120 })} /></Field>
                {editor.type === "projects" ? (
                  <>
                    <Field>Kategori<select {...editorForm.register("category", { required: "Hizmet kategorisi seçin." })}>
                      <option value="">Hizmet seçin</option>
                      {editor.id && !content?.services.some((service) => service.title === editorForm.getValues("category")) && (
                        <option value={editorForm.getValues("category")}>{editorForm.getValues("category")} (mevcut kategori)</option>
                      )}
                      {content?.services.map((service) => (
                        <option key={service.id} value={service.title}>{service.title}</option>
                      ))}
                    </select></Field>
                    <Field>Konum<input {...editorForm.register("location", { required: true, maxLength: 100 })} placeholder="Bursa" /></Field>
                    <Field $full>Görsel ekle <span>(JPG, PNG veya WebP · görsel başına en fazla 4 MB, toplam 10 görsel)</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={uploading || projectImages.length >= 10} onChange={(event) => { void uploadProjectImages(event.target.files); event.currentTarget.value = ""; }} />{uploading && <span>Görseller yükleniyor…</span>}</Field>
                    <Field $full>Görsel URL’si<input type="url" value={projectImageUrl} onChange={(event) => setProjectImageUrl(event.target.value)} placeholder="https://..." /><Button type="button" $quiet disabled={!projectImageUrl.trim()} onClick={addProjectImageUrl}>URL’yi galeriye ekle</Button></Field>
                    <ImageGallery role="group" aria-label="Proje görsel galerisi">
                      {projectImages.map((image, index) => (
                        <GalleryImage key={`${image}-${index}`}>
                          <img src={image} alt={`${editorForm.getValues("title") || "Proje"} görseli ${index + 1}`} />
                          {index === 0 && <small>Kapak görseli</small>}
                          <div>
                            {index > 0 && <button type="button" onClick={() => setProjectGallery([image, ...projectImages.filter((_, imageIndex) => imageIndex !== index)])}>Kapak yap</button>}
                            {projectImages.length > 1 && <button type="button" aria-label={`${index + 1}. görseli kaldır`} onClick={() => setProjectGallery(projectImages.filter((_, imageIndex) => imageIndex !== index))}>Kaldır</button>}
                          </div>
                        </GalleryImage>
                      ))}
                    </ImageGallery>
                    <Field>Durum<select {...editorForm.register("status")}><option value="completed">Tamamlandı</option><option value="ongoing">Devam ediyor</option></select></Field>
                  </>
                ) : <Field>Simge <span>(kısa metin ya da sembol)</span><input {...editorForm.register("icon", { maxLength: 5 })} /></Field>}
                <Field $full>Açıklama<textarea rows={4} {...editorForm.register("description", { required: true, maxLength: 800 })} /></Field>
                <Field><input type="checkbox" {...editorForm.register("active")} /> Web sitesinde yayınla</Field>
              </FormGrid>
              {feedback && <ErrorMessage role="alert">{feedback}</ErrorMessage>}
              <ModalActions><Button $quiet type="button" onClick={() => setEditor(null)}>Vazgeç</Button><Button type="submit" disabled={editorForm.formState.isSubmitting || uploading}>{editorForm.formState.isSubmitting ? "Kaydediliyor…" : "Değişiklikleri kaydet"}</Button></ModalActions>
            </Modal>
          </Overlay>
        )}
      </Shell>
    </>
  );
}
