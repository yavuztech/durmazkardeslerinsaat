import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

export const sessionCookieName = "dk_cms_session";
const sessionDurationSeconds = 60 * 60 * 8;

export function cmsIsConfigured() {
  return Boolean(
    process.env.CMS_ADMIN_PASSWORD &&
    process.env.CMS_ADMIN_PASSWORD.length >= 12 &&
    process.env.CMS_SESSION_SECRET &&
      Buffer.byteLength(process.env.CMS_SESSION_SECRET) >= 32,
  );
}

function sign(value: string) {
  const secret = process.env.CMS_SESSION_SECRET;
  if (!secret) throw new Error("CMS_SESSION_SECRET is not configured.");
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function verifyPassword(password: string) {
  const expected = process.env.CMS_ADMIN_PASSWORD;
  if (!expected) return false;
  const suppliedHash = createHmac("sha256", "dk-cms-password")
    .update(password)
    .digest();
  const expectedHash = createHmac("sha256", "dk-cms-password")
    .update(expected)
    .digest();
  return timingSafeEqual(suppliedHash, expectedHash);
}

export function createSession() {
  const expires = Math.floor(Date.now() / 1000) + sessionDurationSeconds;
  const value = `${expires}.${randomBytes(24).toString("hex")}`;
  return {
    value: `${value}.${sign(value)}`,
    maxAge: sessionDurationSeconds,
  };
}

export function isAuthenticated(cookie: string | undefined) {
  if (!cookie) return false;
  const [expiresText, nonce, signature, ...extra] = cookie.split(".");
  if (!expiresText || !nonce || !signature || extra.length) return false;
  const expires = Number(expiresText);
  if (!Number.isSafeInteger(expires) || expires <= Date.now() / 1000) return false;
  const value = `${expiresText}.${nonce}`;
  if (!cmsIsConfigured()) return false;
  const expected = Buffer.from(sign(value), "hex");
  const supplied = Buffer.from(signature, "hex");
  return (
    expected.length === supplied.length &&
    timingSafeEqual(expected, supplied)
  );
}

export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function getSessionCookie(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const cookie = cookieHeader
    ?.split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${sessionCookieName}=`));
  return cookie?.slice(sessionCookieName.length + 1);
}
