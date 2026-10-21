import type {
  CmsContent,
  ContentCollection,
  ContentCollectionValue,
  Inquiry,
  InquiryMutationResult,
  NewInquiry,
  PublicSiteContent,
} from "@/domain/entities/cms-content";

export interface ContentRepository {
  getPublicContent(): Promise<PublicSiteContent>;
  getAdminContent(): Promise<CmsContent>;
  saveCollection<K extends ContentCollection>(
    collection: K,
    value: ContentCollectionValue[K],
  ): Promise<CmsContent>;
  createInquiry(inquiry: NewInquiry): Promise<string>;
  updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<InquiryMutationResult>;
  deleteInquiry(id: string): Promise<InquiryMutationResult>;
}
