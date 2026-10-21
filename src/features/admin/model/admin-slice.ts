import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  loadAdminContent,
  removeInquiry,
  persistProjects,
  persistServices,
  persistSiteSettings,
  updateInquiryStatus,
  uploadAdminImage,
} from "@/features/admin/model/admin-thunks";
import type { CmsContent } from "@/domain/entities/cms-content";

export type AdminState = {
  content: CmsContent | null;
  loading: boolean;
  error: string | null;
  uploading: boolean;
};

const initialState: AdminState = {
  content: null,
  loading: false,
  error: null,
  uploading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminState() {
      return initialState;
    },
    clearAdminError(state) {
      state.error = null;
    },
    setAdminError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadAdminContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAdminContent.fulfilled, (state, action) => {
        state.content = action.payload;
        state.loading = false;
      })
      .addCase(loadAdminContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "İçerik yüklenemedi.";
      });

    const contentThunks = [
      persistProjects,
      persistServices,
      removeInquiry,
      updateInquiryStatus,
      persistSiteSettings,
    ] as const;
    for (const thunk of contentThunks) {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.content = action.payload;
          state.loading = false;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ?? action.error.message ?? "Değişiklik kaydedilemedi.";
        });
    }

    builder
      .addCase(uploadAdminImage.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadAdminImage.fulfilled, (state) => {
        state.uploading = false;
      })
      .addCase(uploadAdminImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload ?? action.error.message ?? "Görsel yüklenemedi.";
      });
  },
});

export const { clearAdminState, clearAdminError, setAdminError } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
