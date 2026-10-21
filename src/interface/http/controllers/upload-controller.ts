import type { ImageStorage } from "@/application/ports/image-storage";
import type { RequestSecurity } from "@/application/ports/request-security";
import { getCookieValue } from "@/interface/http/cookies";
import { errorResponse, jsonResponse } from "@/interface/http/responses";
import { readJsonBody } from "@/interface/http/request-guards";

const imageTypes = {
  "image/jpeg": { signature: [0xff, 0xd8, 0xff] },
  "image/png": { signature: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  "image/webp": { signature: [0x52, 0x49, 0x46, 0x46] },
} as const;

export async function uploadImage(
  request: Request,
  security: RequestSecurity,
  imageStorage: ImageStorage,
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

  const result = await readJsonBody(request, 5_600_000);
  if (!result.ok) {
    if (result.reason === "too-large") {
      return errorResponse("Yalnızca 4 MB'a kadar JPG, PNG veya WebP yükleyin.", 413);
    }
    return errorResponse("Geçersiz istek gövdesi.", 400);
  }
  const body = result.value;
  if (!body || typeof body !== "object") {
    return errorResponse("Geçersiz dosya.", 400);
  }
  const input = body as Record<string, unknown>;
  const mimeType =
    typeof input.mimeType === "string" && input.mimeType in imageTypes
      ? input.mimeType as keyof typeof imageTypes
      : undefined;
  const imageType = mimeType ? imageTypes[mimeType] : undefined;
  if (typeof input.data !== "string" || !mimeType || !imageType || input.data.length > 5_600_000) {
    return errorResponse("Yalnızca 4 MB'a kadar JPG, PNG veya WebP yükleyin.", 400);
  }

  const image = Buffer.from(input.data, "base64");
  if (
    image.length === 0 ||
    image.length > 4 * 1024 * 1024 ||
    !imageType.signature.every((byte, index) => image[index] === byte) ||
    (input.mimeType === "image/webp" && image.toString("ascii", 8, 12) !== "WEBP")
  ) {
    return errorResponse("Dosya içeriği geçersiz veya desteklenmiyor.", 400);
  }

  const url = await imageStorage.save(image, mimeType);
  return jsonResponse({ url }, 201);
}
