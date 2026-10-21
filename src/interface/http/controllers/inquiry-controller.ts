import type { ContentApplication } from "@/application/services/cms-application";
import type { RequestSecurity } from "@/application/ports/request-security";
import type { Inquiry } from "@/domain/entities/cms-content";
import { getCookieValue } from "@/interface/http/cookies";
import { errorResponse, jsonResponse } from "@/interface/http/responses";
import { isRateLimited, readJsonBody } from "@/interface/http/request-guards";

const inquiryMaxBodyBytes = 16 * 1024;
const inquiryRateLimitWindowMs = 15 * 60 * 1000;
const inquiryRateLimitMaxRequests = 10;
const inquiryStatuses = new Set(["new", "contacted", "completed"]);

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function createInquiry(
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
  if (isRateLimited(
    request,
    "public-inquiry",
    inquiryRateLimitMaxRequests,
    inquiryRateLimitWindowMs,
  )) {
    return jsonResponse(
      { error: "Çok fazla teklif talebi gönderildi. 15 dakika sonra tekrar deneyin." },
      429,
      { "Retry-After": "900" },
    );
  }

  const result = await readJsonBody(request, inquiryMaxBodyBytes);
  if (!result.ok) {
    if (result.reason === "too-large") {
      return errorResponse("İstek boyutu sınırı aşıldı.", 413);
    }
    return errorResponse("Geçersiz istek gövdesi.", 400);
  }
  const body = result.value;
  if (!body || typeof body !== "object") {
    return errorResponse("Geçersiz istek gövdesi.", 400);
  }
  const input = body as Record<string, unknown>;
  const name = text(input.name, 100);
  const phone = text(input.phone, 40);
  const service = text(input.service, 120);
  const details = text(input.details, 2000);
  if (name.length < 2 || !/^[+\d\s()-]{7,40}$/.test(phone) || !service) {
    return errorResponse("Ad, geçerli telefon ve hizmet alanları zorunludur.", 400);
  }

  const inquiry = {
    name,
    phone,
    service,
    details,
  };
  const id = await application.submitInquiry(inquiry);
  return jsonResponse({ id }, 201);
}

function authorizeAdminMutation(request: Request, security: RequestSecurity) {
  if (!security.hasSameOrigin(
    request.headers.get("origin"),
    request.headers.get("host"),
  )) {
    return errorResponse("İstek kaynağı doğrulanamadı.", 403);
  }
  if (!security.isAuthenticated(
    getCookieValue(request.headers.get("cookie"), security.cookieName),
  )) {
    return errorResponse("Oturum açmanız gerekiyor.", 401);
  }
  return null;
}

export async function updateInquiryStatus(
  request: Request,
  application: ContentApplication,
  security: RequestSecurity,
) {
  const authorizationError = authorizeAdminMutation(request, security);
  if (authorizationError) return authorizationError;

  const result = await readJsonBody(request, 4 * 1024);
  if (!result.ok) {
    return errorResponse(
      result.reason === "too-large" ? "İstek boyutu sınırı aşıldı." : "Geçersiz istek gövdesi.",
      result.reason === "too-large" ? 413 : 400,
    );
  }
  if (!result.value || typeof result.value !== "object") {
    return errorResponse("Geçersiz istek gövdesi.", 400);
  }
  const body = result.value as Record<string, unknown>;
  const id = text(body.id, 100);
  const status = body.status;
  if (!id || typeof status !== "string" || !inquiryStatuses.has(status)) {
    return errorResponse("Teklif ve geçerli durum bilgisi zorunludur.", 400);
  }

  const mutation = await application.updateInquiryStatus(
    id,
    status as Inquiry["status"],
  );
  if (!mutation.found) {
    return errorResponse("Teklif bulunamadı.", 404);
  }
  return jsonResponse(mutation);
}

export async function deleteInquiry(
  request: Request,
  application: ContentApplication,
  security: RequestSecurity,
) {
  const authorizationError = authorizeAdminMutation(request, security);
  if (authorizationError) return authorizationError;

  const id = text(new URL(request.url).searchParams.get("id"), 100);
  if (!id) return errorResponse("Teklif kimliği zorunludur.", 400);
  const mutation = await application.deleteInquiry(id);
  if (!mutation.found) {
    return errorResponse("Teklif bulunamadı.", 404);
  }
  return jsonResponse(mutation);
}
