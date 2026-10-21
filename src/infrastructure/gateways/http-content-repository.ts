import type {
  CmsContent,
  ContentCollection,
  ContentCollectionValue,
  Inquiry,
  InquiryMutationResult,
  NewInquiry,
  PublicSiteContent,
} from "@/domain/entities/cms-content";
import type { ContentRepository } from "@/domain/repositories/content-repository";
import { httpClient } from "@/infrastructure/http/http-client";

export const httpContentRepository: ContentRepository = {
  async getPublicContent() {
    const response = await httpClient.get<PublicSiteContent>("/api/cms/content");
    return response.data;
  },
  async getAdminContent() {
    const response = await httpClient.get<CmsContent>("/api/cms/content?admin=true");
    return response.data;
  },
  async saveCollection<K extends ContentCollection>(
    collection: K,
    value: ContentCollectionValue[K],
  ) {
    const response = await httpClient.put<CmsContent>("/api/cms/content", {
      collection,
      value,
    });
    return response.data;
  },
  async createInquiry(inquiry: NewInquiry): Promise<string> {
    const response = await httpClient.post<{ id: string }>("/api/cms/inquiries", inquiry);
    return response.data.id;
  },
  async updateInquiryStatus(id: string, status: Inquiry["status"]) {
    const response = await httpClient.patch<InquiryMutationResult>("/api/cms/inquiries", {
      id,
      status,
    });
    return response.data;
  },
  async deleteInquiry(id: string) {
    const response = await httpClient.delete<InquiryMutationResult>("/api/cms/inquiries", {
      params: { id },
    });
    return response.data;
  },
};
