import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CmsContent, Inquiry, Project, Service } from "@/domain/entities/cms-content";
import type { CmsApplication } from "@/application/services/cms-application";
type RejectableThunkConfig = { rejectValue: string; extra: CmsApplication };

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export const loadAdminContent = createAsyncThunk<
  CmsContent,
  void,
  RejectableThunkConfig
>("admin/loadContent", async (_, { extra, rejectWithValue }) => {
  try {
    return await extra.getAdminContent();
  } catch (error) {
    return rejectWithValue(errorMessage(error, "İçerik yüklenemedi."));
  }
});

export const persistProjects = createAsyncThunk<
  CmsContent,
  Project[],
  RejectableThunkConfig
>("admin/saveProjects", async (projects, { extra, rejectWithValue }) => {
  try {
    return await extra.saveProjects(projects);
  } catch (error) {
    return rejectWithValue(errorMessage(error, "Projeler kaydedilemedi."));
  }
});

export const persistServices = createAsyncThunk<
  CmsContent,
  Service[],
  RejectableThunkConfig
>("admin/saveServices", async (services, { extra, rejectWithValue }) => {
  try {
    return await extra.saveServices(services);
  } catch (error) {
    return rejectWithValue(errorMessage(error, "Hizmetler kaydedilemedi."));
  }
});

export const updateInquiryStatus = createAsyncThunk<
  CmsContent,
  Pick<Inquiry, "id" | "status">,
  RejectableThunkConfig
>("admin/updateInquiryStatus", async ({ id, status }, { extra, rejectWithValue }) => {
  try {
    const result = await extra.updateInquiryStatus(id, status);
    return result.content;
  } catch (error) {
    return rejectWithValue(errorMessage(error, "Teklif durumu güncellenemedi."));
  }
});

export const removeInquiry = createAsyncThunk<
  CmsContent,
  string,
  RejectableThunkConfig
>("admin/deleteInquiry", async (id, { extra, rejectWithValue }) => {
  try {
    const result = await extra.deleteInquiry(id);
    return result.content;
  } catch (error) {
    return rejectWithValue(errorMessage(error, "Teklif talebi silinemedi."));
  }
});

export const persistSiteSettings = createAsyncThunk<
  CmsContent,
  CmsContent["settings"],
  RejectableThunkConfig
>("admin/saveSettings", async (settings, { extra, rejectWithValue }) => {
  try {
    return await extra.saveSettings(settings);
  } catch (error) {
    return rejectWithValue(errorMessage(error, "Ayarlar kaydedilemedi."));
  }
});

export const uploadAdminImage = createAsyncThunk<
  string,
  File,
  RejectableThunkConfig
>("admin/uploadImage", async (file, { extra, rejectWithValue }) => {
  try {
    if (file.type !== "image/jpeg" && file.type !== "image/png" &&
      file.type !== "image/webp") {
      return rejectWithValue("Yalnızca JPG, PNG veya WebP görselleri yükleyin.");
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    return await extra.uploadImage({
      mimeType: file.type,
      bytes,
    });
  } catch (error) {
    return rejectWithValue(errorMessage(error, "Görsel yüklenemedi."));
  }
});
