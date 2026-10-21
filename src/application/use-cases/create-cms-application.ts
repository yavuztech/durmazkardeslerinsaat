import type { AdminGateway } from "@/application/ports/admin-gateway";
import type {
  CmsApplication,
  ContentApplication,
} from "@/application/services/cms-application";
import type { ContentRepository } from "@/domain/repositories/content-repository";
import type { Inquiry, NewInquiry } from "@/domain/entities/cms-content";

export function createContentApplication(
  contentRepository: ContentRepository,
): ContentApplication {
  return {
    async getPublicContent() {
      return contentRepository.getPublicContent();
    },
    getAdminContent: () => contentRepository.getAdminContent(),
    saveProjects: (projects) => contentRepository.saveCollection("projects", projects),
    saveServices: (services) => contentRepository.saveCollection("services", services),
    saveSettings: (settings) => contentRepository.saveCollection("settings", settings),
    updateInquiryStatus: (id: string, status: Inquiry["status"]) =>
      contentRepository.updateInquiryStatus(id, status),
    deleteInquiry: (id: string) => contentRepository.deleteInquiry(id),
    async submitInquiry(inquiry: NewInquiry) {
      const name = inquiry.name.trim();
      const phone = inquiry.phone.trim();
      const service = inquiry.service.trim();
      if (name.length < 2 || name.length > 100 ||
        !/^[+\d\s()-]{7,40}$/.test(phone) ||
        !service || service.length > 120 ||
        inquiry.details.length > 2000) {
        throw new Error("Ad, geçerli telefon ve hizmet alanları zorunludur.");
      }
      return contentRepository.createInquiry({
        ...inquiry,
        name,
        phone,
        service,
        details: inquiry.details.trim(),
      });
    },
  };
}

export function createCmsApplication(
  content: ContentApplication,
  adminGateway: AdminGateway,
): CmsApplication {
  return {
    ...content,
    authenticateAdmin: (password) => adminGateway.authenticate(password),
    logoutAdmin: () => adminGateway.logout(),
    uploadImage: (file) => adminGateway.uploadImage(file),
  };
}
