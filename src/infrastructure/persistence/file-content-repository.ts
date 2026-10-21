import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultContent } from "@/infrastructure/config/default-content";
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

const dataDirectory = path.join(process.cwd(), ".data");
const contentPath = path.join(dataDirectory, "site-content.json");
const fayansMigrationPath = path.join(dataDirectory, ".fayans-service-migrated");
const fayansProjectMigrationPath = path.join(dataDirectory, ".fayans-project-migrated");
let transactionQueue: Promise<void> = Promise.resolve();
let fayansMigration: Promise<void> | undefined;
let fayansProjectMigration: Promise<void> | undefined;

async function readContent(): Promise<CmsContent> {
  try {
    const contents = await readFile(contentPath, "utf8");
    const saved = JSON.parse(contents) as Partial<CmsContent>;
    return {
      ...defaultContent,
      ...saved,
      services: (saved.services ?? defaultContent.services).filter(
        (service) =>
          service.id !== "helikopterli-sap" &&
          !service.title.toLocaleLowerCase("tr-TR").includes("helikopterli şap"),
      ),
      projects: (saved.projects ?? defaultContent.projects).filter(
        (project) =>
          !`${project.category} ${project.title} ${project.description}`
            .toLocaleLowerCase("tr-TR")
            .includes("helikopterli şap"),
      ),
      settings: {
        ...defaultContent.settings,
        ...saved.settings,
        seo: {
          ...defaultContent.settings.seo,
          ...saved.settings?.seo,
          home: {
            ...defaultContent.settings.seo.home,
            ...saved.settings?.seo?.home,
          },
          services: {
            ...defaultContent.settings.seo.services,
            ...saved.settings?.seo?.services,
          },
          projects: {
            ...defaultContent.settings.seo.projects,
            ...saved.settings?.seo?.projects,
          },
          about: {
            ...defaultContent.settings.seo.about,
            ...saved.settings?.seo?.about,
          },
        },
        pageContent: {
          ...defaultContent.settings.pageContent,
          ...saved.settings?.pageContent,
          services: {
            ...defaultContent.settings.pageContent.services,
            ...saved.settings?.pageContent?.services,
          },
          projects: {
            ...defaultContent.settings.pageContent.projects,
            ...saved.settings?.pageContent?.projects,
          },
          about: {
            ...defaultContent.settings.pageContent.about,
            ...saved.settings?.pageContent?.about,
            paragraphs: saved.settings?.pageContent?.about?.paragraphs ??
              defaultContent.settings.pageContent.about.paragraphs,
            values: saved.settings?.pageContent?.about?.values ??
              defaultContent.settings.pageContent.about.values,
          },
        },
      },
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    await writeContent(defaultContent);
    return defaultContent;
  }
}

async function writeContent(content: CmsContent): Promise<void> {
  await mkdir(dataDirectory, { recursive: true });
  const temporaryPath = `${contentPath}.${randomUUID()}.tmp`;
  await writeFile(temporaryPath, JSON.stringify(content, null, 2), {
    encoding: "utf8",
    mode: 0o600,
  });
  await rename(temporaryPath, contentPath);
}

function updateContent(
  update: (content: CmsContent) => CmsContent,
): Promise<CmsContent> {
  const transaction = transactionQueue.then(async () => {
    const content = await readContent();
    const updated = update(content);
    await writeContent(updated);
    return updated;
  });
  transactionQueue = transaction.then(() => undefined, () => undefined);
  return transaction;
}

function ensureFayansServiceMigration(): Promise<void> {
  if (!fayansMigration) {
    fayansMigration = (async () => {
      try {
        await readFile(fayansMigrationPath);
        return;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }

      await updateContent((content) => {
        if (content.services.some((service) => service.id === "fayans-uygulamalari")) {
          return content;
        }
        const service = defaultContent.services.find(
          (item) => item.id === "fayans-uygulamalari",
        );
        return service
          ? { ...content, services: [...content.services, service] }
          : content;
      });
      await writeFile(fayansMigrationPath, "1", { encoding: "utf8", flag: "wx" });
    })();
  }
  return fayansMigration;
}

function ensureFayansProjectMigration(): Promise<void> {
  if (!fayansProjectMigration) {
    fayansProjectMigration = (async () => {
      try {
        await readFile(fayansProjectMigrationPath);
        return;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }

      await updateContent((content) => {
        if (content.projects.some((project) => project.id === "fayans-uygulamasi")) {
          return content;
        }
        const project = defaultContent.projects.find(
          (item) => item.id === "fayans-uygulamasi",
        );
        return project
          ? { ...content, projects: [project, ...content.projects] }
          : content;
      });
      await writeFile(fayansProjectMigrationPath, "1", { encoding: "utf8", flag: "wx" });
    })();
  }
  return fayansProjectMigration;
}

export const fileContentRepository: ContentRepository = {
  async getPublicContent(): Promise<PublicSiteContent> {
    await ensureFayansServiceMigration();
    await ensureFayansProjectMigration();
    const content = await readContent();
    return {
      services: content.services.filter((service) => service.active),
      projects: content.projects.filter((project) => project.active),
      settings: content.settings,
    };
  },
  async getAdminContent() {
    await ensureFayansServiceMigration();
    await ensureFayansProjectMigration();
    return readContent();
  },
  saveCollection<K extends ContentCollection>(
    collection: K,
    value: ContentCollectionValue[K],
  ) {
    return updateContent((content) => {
      switch (collection) {
        case "projects":
          return { ...content, projects: value as ContentCollectionValue["projects"] };
        case "services":
          return { ...content, services: value as ContentCollectionValue["services"] };
        case "inquiries":
          return { ...content, inquiries: value as ContentCollectionValue["inquiries"] };
        case "settings":
          return { ...content, settings: value as ContentCollectionValue["settings"] };
      }
    });
  },
  async createInquiry(inquiry: NewInquiry): Promise<string> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const created = { ...inquiry, id, status: "new" as const, createdAt };
    await updateContent((content) => ({
      ...content,
      inquiries: [created, ...content.inquiries],
    }));
    return id;
  },
  async updateInquiryStatus(
    id: string,
    status: Inquiry["status"],
  ): Promise<InquiryMutationResult> {
    let found = false;
    const updated = await updateContent((content) => {
      found = content.inquiries.some((inquiry) => inquiry.id === id);
      return {
        ...content,
        inquiries: content.inquiries.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status } : inquiry,
        ),
      };
    });
    return { content: updated, found };
  },
  async deleteInquiry(id: string): Promise<InquiryMutationResult> {
    let found = false;
    const updated = await updateContent((content) => {
      found = content.inquiries.some((inquiry) => inquiry.id === id);
      return {
        ...content,
        inquiries: content.inquiries.filter((inquiry) => inquiry.id !== id),
      };
    });
    return { content: updated, found };
  },
};
