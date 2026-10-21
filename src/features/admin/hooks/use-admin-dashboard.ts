"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { clearAdminState } from "@/features/admin/model/admin-slice";
import {
  loadAdminContent,
  persistProjects,
  persistServices,
  persistSiteSettings,
  removeInquiry,
  uploadAdminImage,
  updateInquiryStatus,
} from "@/features/admin/model/admin-thunks";
import { useAppDispatch, useAppSelector } from "@/features/admin/hooks/admin-store-hooks";
import { createEditorValues, validateCmsImageFile } from "@/features/admin/model/validation";
import { getAdminActionError, getInquiryWeekSeries } from "@/features/admin/model/utils";
import type { AdminEditorType, AdminEditorValues, AdminSettingsValues } from "@/features/admin/model/type";
import type { AdminSection } from "@/features/admin/model/navigation";
import type { Inquiry, Project, Service } from "@/domain/entities/cms-content";
import { useApplication } from "@/presentation/context/application-context";

export function useAdminDashboard() {
  const application = useApplication();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { content, loading, error, uploading } = useAppSelector((state) => state.admin);
  const [section, setSection] = useState<AdminSection>("overview");
  const [editor, setEditor] = useState<{ type: AdminEditorType; id?: string } | null>(null);
  const [feedback, setFeedback] = useState("");
  const editorForm = useForm<AdminEditorValues>({
    defaultValues: createEditorValues(),
  });
  const settingsForm = useForm<AdminSettingsValues>({
    defaultValues: content?.settings ?? {
      logo: "",
      phone: "",
      whatsapp: "",
      email: "",
      serviceArea: "",
      heroTitle: "",
      heroDescription: "",
      seo: {
        home: { title: "", description: "" },
        services: { title: "", description: "" },
        projects: { title: "", description: "" },
        about: { title: "", description: "" },
      },
      pageContent: {
        services: {
          sectionEyebrow: "",
          sectionTitle: "",
          sectionDescription: "",
          pageTitle: "",
          pageDescription: "",
        },
        projects: {
          sectionEyebrow: "",
          sectionTitle: "",
          sectionDescription: "",
          pageTitle: "",
          pageDescription: "",
          portfolioNote: "",
        },
        about: {
          landingEyebrow: "",
          landingTitle: "",
          landingLead: "",
          landingDescription: "",
          heroEyebrow: "",
          heroTitle: "",
          heroDescription: "",
          sectionEyebrow: "",
          sectionTitle: "",
          paragraphs: ["", ""],
          values: [
            { title: "", description: "" },
            { title: "", description: "" },
            { title: "", description: "" },
          ],
        },
      },
    },
  });

  const inquiries = content?.inquiries ?? [];
  const recentInquiries = useMemo(() => inquiries.slice(0, 5), [inquiries]);
  const weekCounts = useMemo(() => getInquiryWeekSeries(inquiries), [inquiries]);
  const newInquiryCount = inquiries.filter((item) => item.status === "new").length;

  async function refreshContent() {
    setFeedback("");
    try {
      const nextContent = await dispatch(loadAdminContent()).unwrap();
      settingsForm.reset(nextContent.settings);
    } catch {
      setFeedback("İçerik yüklenemedi. Lütfen tekrar deneyin.");
    }
  }

  async function logout() {
    try {
      await application.logoutAdmin();
      dispatch(clearAdminState());
      router.push("/admin/login");
    } catch {
      setFeedback("Güvenli çıkış yapılamadı. Lütfen tekrar deneyin.");
    }
  }

  function openEditor(type: AdminEditorType, item?: Project | Service) {
    setFeedback("");
    setEditor({ type, id: item?.id });
    editorForm.reset(createEditorValues(item));
  }

  async function saveEditor(values: AdminEditorValues) {
    if (!editor || !content) return;
    setFeedback("");
    try {
      const id = editor.id ?? crypto.randomUUID();
      if (editor.type === "projects") {
        if (values.images.length === 0) {
          setFeedback("Projeye en az bir görsel ekleyin.");
          return;
        }
        const project: Project = {
          id,
          title: values.title.trim(),
          category: values.category.trim(),
          location: values.location.trim(),
          image: values.images[0]?.trim() ?? values.image.trim(),
          images: values.images.map((image) => image.trim()),
          description: values.description.trim(),
          status: values.status,
          active: values.active,
        };
        const projects = editor.id
          ? content.projects.map((item) => item.id === id ? project : item)
          : [project, ...content.projects];
        await dispatch(persistProjects(projects)).unwrap();
      } else {
        const service: Service = {
          id,
          title: values.title.trim(),
          description: values.description.trim(),
          icon: values.icon.trim() || "◉",
          active: values.active,
        };
        const services = editor.id
          ? content.services.map((item) => item.id === id ? service : item)
          : [service, ...content.services];
        await dispatch(persistServices(services)).unwrap();
      }
      setEditor(null);
    } catch (requestError) {
      setFeedback(getAdminActionError(requestError, "Değişiklikler kaydedilemedi."));
    }
  }

  async function deleteItem(type: AdminEditorType, id: string) {
    if (!content || !window.confirm("Bu içerik kalıcı olarak silinsin mi?")) return;
    const save = type === "projects"
      ? dispatch(persistProjects(content.projects.filter((item) => item.id !== id)))
      : dispatch(persistServices(content.services.filter((item) => item.id !== id)));
    try {
      await save.unwrap();
    } catch (requestError) {
      setFeedback(getAdminActionError(requestError, "İçerik silinemedi. Lütfen tekrar deneyin."));
    }
  }

  async function uploadImage(file: File | undefined, target: "image" | "logo" = "image") {
    if (!file) return;
    if (!validateCmsImageFile(file)) {
      setFeedback("JPG, PNG veya WebP biçiminde 4 MB'a kadar bir görsel seçin.");
      return;
    }
    setFeedback("");
    try {
      const imageUrl = await dispatch(uploadAdminImage(file)).unwrap();
      if (target === "image") {
        editorForm.setValue("image", imageUrl, { shouldValidate: true });
      } else {
        settingsForm.setValue("logo", imageUrl, { shouldValidate: true });
      }
    } catch (requestError) {
      setFeedback(getAdminActionError(requestError, "Görsel yüklenemedi."));
    }
  }

  async function uploadProjectImages(files: FileList | null) {
    if (!files?.length) return;
    const selectedFiles = Array.from(files);
    const existingImages = editorForm.getValues("images");
    if (selectedFiles.some((file) => !validateCmsImageFile(file))) {
      setFeedback("Her görsel JPG, PNG veya WebP biçiminde ve en fazla 4 MB olmalıdır.");
      return;
    }
    if (existingImages.length + selectedFiles.length > 10) {
      setFeedback("Bir projeye en fazla 10 görsel ekleyebilirsiniz.");
      return;
    }

    setFeedback("");
    try {
      const uploadedImages: string[] = [];
      for (const file of selectedFiles) {
        uploadedImages.push(await dispatch(uploadAdminImage(file)).unwrap());
      }
      const images = [...existingImages, ...uploadedImages];
      editorForm.setValue("images", images, { shouldValidate: true });
      editorForm.setValue("image", images[0] ?? "", { shouldValidate: true });
    } catch (requestError) {
      setFeedback(getAdminActionError(requestError, "Görseller yüklenemedi."));
    }
  }

  async function updateInquiry(inquiry: Inquiry, status: Inquiry["status"]) {
    if (!content) return;
    try {
      await dispatch(updateInquiryStatus({ id: inquiry.id, status })).unwrap();
    } catch (requestError) {
      setFeedback(getAdminActionError(requestError, "Teklif durumu güncellenemedi."));
    }
  }

  async function deleteInquiry(inquiry: Inquiry) {
    if (!content || !window.confirm(`${inquiry.name} adlı müşterinin talebini silmek istiyor musunuz?`)) return;
    try {
      await dispatch(removeInquiry(inquiry.id)).unwrap();
    } catch (requestError) {
      setFeedback(getAdminActionError(requestError, "Teklif talebi silinemedi."));
    }
  }

  async function saveSettings(values: AdminSettingsValues) {
    setFeedback("");
    try {
      await dispatch(persistSiteSettings(values)).unwrap();
      setFeedback("Site ayarları kaydedildi.");
    } catch (requestError) {
      setFeedback(getAdminActionError(requestError, "Ayarlar kaydedilemedi."));
    }
  }

  return {
    content,
    error,
    loading,
    uploading,
    section,
    setSection,
    editor,
    setEditor,
    feedback,
    setFeedback,
    editorForm,
    settingsForm,
    inquiries,
    recentInquiries,
    weekCounts,
    newInquiryCount,
    refreshContent,
    logout,
    openEditor,
    saveEditor,
    deleteItem,
    uploadImage,
    uploadProjectImages,
    updateInquiry,
    deleteInquiry,
    saveSettings,
  };
}
