import type {
  CmsContent,
  ContentCollection,
  ContentCollectionValue,
  Inquiry,
  InquiryMutationResult,
  NewInquiry,
  PublicSiteContent,
  SiteSettings,
} from "@/domain/entities/cms-content";

export interface ContentApplication {
  getPublicContent(): Promise<PublicSiteContent>;
  getAdminContent(): Promise<CmsContent>;
  saveProjects(projects: ContentCollectionValue["projects"]): Promise<CmsContent>;
  saveServices(services: ContentCollectionValue["services"]): Promise<CmsContent>;
  saveSettings(settings: SiteSettings): Promise<CmsContent>;
  submitInquiry(inquiry: NewInquiry): Promise<string>;
  updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<InquiryMutationResult>;
  deleteInquiry(id: string): Promise<InquiryMutationResult>;
}

export interface CmsApplication extends ContentApplication {
  authenticateAdmin(password: string): Promise<void>;
  logoutAdmin(): Promise<void>;
  uploadImage(image: import("@/application/ports/admin-gateway").ImageUpload): Promise<string>;
}

export type { ContentCollection };
