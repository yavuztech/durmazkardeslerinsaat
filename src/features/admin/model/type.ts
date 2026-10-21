import type { CmsContent } from "@/domain/entities/cms-content";

export type AdminEditorType = "projects" | "services";

export type AdminEditorValues = {
  title: string;
  category: string;
  location: string;
  image: string;
  images: string[];
  description: string;
  icon: string;
  status: "completed" | "ongoing";
  active: boolean;
};

export type AdminSettingsValues = CmsContent["settings"];
