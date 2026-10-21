export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  active: boolean;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  status: "completed" | "ongoing";
  active: boolean;
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  service: string;
  details: string;
  status: "new" | "contacted" | "completed";
  createdAt: string;
};

export type AboutValue = {
  title: string;
  description: string;
};

export type SitePageContent = {
  services: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionDescription: string;
    pageTitle: string;
    pageDescription: string;
  };
  projects: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionDescription: string;
    pageTitle: string;
    pageDescription: string;
    portfolioNote: string;
  };
  about: {
    landingEyebrow: string;
    landingTitle: string;
    landingLead: string;
    landingDescription: string;
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    sectionEyebrow: string;
    sectionTitle: string;
    paragraphs: [string, string];
    values: [AboutValue, AboutValue, AboutValue];
  };
};

export type PageSeo = {
  title: string;
  description: string;
};

export type SiteSeo = {
  home: PageSeo;
  services: PageSeo;
  projects: PageSeo;
  about: PageSeo;
};

export type SiteSettings = {
  logo: string;
  phone: string;
  whatsapp: string;
  email: string;
  serviceArea: string;
  heroTitle: string;
  heroDescription: string;
  pageContent: SitePageContent;
  seo: SiteSeo;
};

export type CmsContent = {
  services: Service[];
  projects: Project[];
  inquiries: Inquiry[];
  settings: SiteSettings;
};

export type InquiryMutationResult = {
  content: CmsContent;
  found: boolean;
};

export type PublicSiteContent = Pick<CmsContent, "projects" | "services" | "settings">;

export type ContentCollection = "projects" | "services" | "inquiries" | "settings";

export type ContentCollectionValue = {
  projects: Project[];
  services: Service[];
  inquiries: Inquiry[];
  settings: SiteSettings;
};

export type NewInquiry = Pick<Inquiry, "name" | "phone" | "service" | "details">;
