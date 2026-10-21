import type { SessionAuthentication } from "@/application/ports/session-authentication";
import { getCookieValue } from "@/interface/http/cookies";
import { errorResponse, jsonResponse } from "@/interface/http/responses";
import {
  clearRateLimit,
  isRateLimited,
  readJsonBody,
} from "@/interface/http/request-guards";

const attemptWindowMs = 15 * 60 * 1000;
const maxAttempts = 8;

export function getAuthStatus(request: Request, authentication: SessionAuthentication) {
  return jsonResponse({
    authenticated: authentication.isAuthenticated(
      getCookieValue(request.headers.get("cookie"), authentication.cookieName),
    ),
  });
}

export async function login(request: Request, authentication: SessionAuthentication) {
  if (!authentication.hasSameOrigin(
    request.headers.get("origin"),
    request.headers.get("host"),
  )) {
    return errorResponse("İstek kaynağı doğrulanamadı.", 403);
  }
  if (!authentication.isConfigured()) {
    return errorResponse(
      "Yönetim paneli için en az 12 karakterli CMS_ADMIN_PASSWORD ve en az 32 baytlık CMS_SESSION_SECRET ayarlayın.",
      503,
    );
  }

  if (isRateLimited(request, "cms-login", maxAttempts, attemptWindowMs)) {
    return errorResponse(
      "Çok fazla giriş denemesi. 15 dakika sonra tekrar deneyin.",
      429,
    );
  }

  const result = await readJsonBody(request, 4 * 1024);
  if (!result.ok) {
    if (result.reason === "too-large") {
      return errorResponse("İstek boyutu sınırı aşıldı.", 413);
    }
    return errorResponse("Geçersiz istek gövdesi.", 400);
  }
  const body = result.value;
  const password = body && typeof body === "object" && "password" in body &&
    typeof body.password === "string"
    ? body.password
    : "";

  if (!authentication.verifyPassword(password)) {
    return errorResponse("Parola doğrulanamadı.", 401);
  }

  clearRateLimit(request, "cms-login");
  const session = authentication.createSession();
  const response = jsonResponse({ authenticated: true });
  response.headers.append(
    "Set-Cookie",
    `${authentication.cookieName}=${session.value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${session.maxAge}${authentication.production ? "; Secure" : ""}`,
  );
  return response;
}

export function logout(request: Request, authentication: SessionAuthentication) {
  if (!authentication.hasSameOrigin(
    request.headers.get("origin"),
    request.headers.get("host"),
  )) {
    return errorResponse("İstek kaynağı doğrulanamadı.", 403);
  }
  const response = jsonResponse({ authenticated: false });
  response.headers.append(
    "Set-Cookie",
    `${authentication.cookieName}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${authentication.production ? "; Secure" : ""}`,
  );
  return response;
}
