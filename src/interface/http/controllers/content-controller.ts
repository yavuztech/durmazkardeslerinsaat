import type { ContentApplication } from "@/application/services/cms-application";
import type { RequestSecurity } from "@/application/ports/request-security";
import type {
  CmsContent,
  ContentCollectionValue,
} from "@/domain/entities/cms-content";
import { getCookieValue } from "@/interface/http/cookies";
import { errorResponse, jsonResponse } from "@/interface/http/responses";
import { readJsonBody } from "@/interface/http/request-guards";

const collections = ["projects", "services", "settings"] as const;
type Collection = (typeof collections)[number];
const projectStatuses = ["completed", "ongoing"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isBoundedText(value: unknown, maxLength: number, required = false) {
  return typeof value === "string" &&
    value.length <= maxLength &&
    (!required || value.trim().length > 0);
}

function validCollection(value: unknown): value is Collection {
  return typeof value === "string" && collections.includes(value as Collection);
}

function validImage(value: unknown) {
  if (typeof value !== "string" || !isBoundedText(value, 2048, true)) return false;
  if (value.startsWith("/uploads/")) {
    return /^\/uploads\/[a-z\d-]+\.(?:jpg|png|webp)$/i.test(value);
  }
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function validItems<K extends Exclude<Collection, "settings">>(
  collection: K,
  value: unknown,
): value is ContentCollectionValue[K] {
  if (!Array.isArray(value) || value.length > 500) return false;
  const ids = new Set<string>();
  for (const item of value) {
    if (!isRecord(item) || !isBoundedText(item.id, 80, true) || ids.has(item.id as string)) {
      return false;
    }
    ids.add(item.id as string);
    if (collection === "projects" &&
      (!isBoundedText(item.title, 120, true) ||
        !isBoundedText(item.category, 120, true) ||
        !isBoundedText(item.location, 100, true) ||
        !isBoundedText(item.description, 800, true) ||
        !validImage(item.image) ||
        !Array.isArray(item.images) ||
        item.images.length < 1 ||
        item.images.length > 10 ||
        !item.images.every(validImage) ||
        item.image !== item.images[0] ||
        !projectStatuses.includes(String(item.status)) ||
        typeof item.active !== "boolean")) return false;
    if (collection === "services" &&
      (!isBoundedText(item.title, 120, true) ||
        !isBoundedText(item.description, 800, true) ||
        !isBoundedText(item.icon, 5) ||
        typeof item.active !== "boolean")) return false;
  }
  return true;
}

function isSiteSettings(value: unknown): value is CmsContent["settings"] {
  if (!isRecord(value)) return false;
  if (!isRecord(value.seo)) return false;
  const seo = value.seo;
  if (!["home", "services", "projects", "about"].every((page) => {
    const metadata = seo[page];
    return isRecord(metadata) &&
      isBoundedText(metadata.title, 70, true) &&
      isBoundedText(metadata.description, 170, true);
  })) return false;
  if (!isRecord(value.pageContent)) return false;
  const pageContent = value.pageContent;
  if (
    !isRecord(pageContent.services) ||
    !isRecord(pageContent.projects) ||
    !isRecord(pageContent.about)
  ) return false;

  const services = pageContent.services;
  const projects = pageContent.projects;
  const about = pageContent.about;
  const isText = (input: unknown, maxLength: number) =>
    isBoundedText(input, maxLength, true);
  const isStringPair = (input: unknown, maxLength: number) =>
    Array.isArray(input) &&
    input.length === 2 &&
    input.every((item) => isText(item, maxLength));
  const isAboutValues = (input: unknown) =>
    Array.isArray(input) &&
    input.length === 3 &&
    input.every((item) =>
      isRecord(item) &&
      isText(item.title, 100) &&
      isText(item.description, 250),
    );
  if (!(
    isText(services.sectionEyebrow, 60) &&
    isText(services.sectionTitle, 180) &&
    isText(services.sectionDescription, 500) &&
    isText(services.pageTitle, 180) &&
    isText(services.pageDescription, 500) &&
    isText(projects.sectionEyebrow, 60) &&
    isText(projects.sectionTitle, 180) &&
    isText(projects.sectionDescription, 500) &&
    isText(projects.pageTitle, 180) &&
    isText(projects.pageDescription, 500) &&
    isText(projects.portfolioNote, 300) &&
    isText(about.landingEyebrow, 60) &&
    isText(about.landingTitle, 180) &&
    isText(about.landingLead, 300) &&
    isText(about.landingDescription, 700) &&
    isText(about.heroEyebrow, 60) &&
    isText(about.heroTitle, 180) &&
    isText(about.heroDescription, 500) &&
    isText(about.sectionEyebrow, 60) &&
    isText(about.sectionTitle, 180) &&
    isStringPair(about.paragraphs, 700) &&
    isAboutValues(about.values)
  )) return false;

  return isBoundedText(value.logo, 2048) &&
    (value.logo === "" || validImage(value.logo)) &&
    isBoundedText(value.phone, 40) &&
    isBoundedText(value.whatsapp, 40) &&
    isBoundedText(value.email, 254) &&
    (value.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value.email))) &&
    isBoundedText(value.serviceArea, 120, true) &&
    isBoundedText(value.heroTitle, 180, true) &&
    isBoundedText(value.heroDescription, 500, true);
}

export async function getPublicContent(application: ContentApplication) {
  return jsonResponse(await application.getPublicContent());
}

export async function getAdminContent(
  request: Request,
  application: ContentApplication,
  security: RequestSecurity,
) {
  if (!security.isAuthenticated(
    getCookieValue(request.headers.get("cookie"), security.cookieName),
  )) {
    return errorResponse("Yönetici oturumu gerekli.", 401);
  }
  return jsonResponse(await application.getAdminContent());
}

export async function updateAdminContent(
  request: Request,
  application: ContentApplication,
  security: RequestSecurity,
) {
  if (!security.hasSameOrigin(
    request.headers.get("origin"),
    request.headers.get("host"),
  )) {
    return errorResponse("İstek kaynağı doğrulanamadı.", 403);
  }
  if (!security.isAuthenticated(
    getCookieValue(request.headers.get("cookie"), security.cookieName),
  )) {
    return errorResponse("Yönetici oturumu gerekli.", 401);
  }

  const result = await readJsonBody(request, 2 * 1024 * 1024);
  if (!result.ok) {
    return errorResponse(
      result.reason === "too-large" ? "İstek boyutu sınırı aşıldı." : "Geçersiz istek gövdesi.",
      result.reason === "too-large" ? 413 : 400,
    );
  }
  const body = result.value;
  if (!isRecord(body) || !validCollection(body.collection)) {
    return errorResponse("Geçersiz içerik türü.", 400);
  }

  const { collection, value } = body;
  if (collection === "settings") {
    if (!isSiteSettings(value)) {
      return errorResponse("Geçersiz site ayarları.", 400);
    }
    return jsonResponse(await application.saveSettings(value));
  }
  if (!validItems(collection, value)) {
    return errorResponse("Geçersiz içerik listesi.", 400);
  }

  let content: CmsContent;
  switch (collection) {
    case "projects":
      if (!validItems(collection, value)) return errorResponse("Geçersiz proje listesi.", 400);
      content = await application.saveProjects(value);
      break;
    case "services":
      if (!validItems(collection, value)) return errorResponse("Geçersiz hizmet listesi.", 400);
      content = await application.saveServices(value);
      break;
    default:
      return errorResponse("Geçersiz içerik türü.", 400);
  }
  return jsonResponse(content);
}
