import type { SessionAuthentication } from "@/application/ports/session-authentication";
import {
  cmsIsConfigured,
  createSession,
  isAuthenticated,
  sessionCookieName,
  verifyPassword,
} from "@/infrastructure/security/cms-auth";

export const sessionAuthentication: SessionAuthentication = {
  cookieName: sessionCookieName,
  production: process.env.NODE_ENV === "production",
  isConfigured: cmsIsConfigured,
  verifyPassword,
  createSession,
  hasSameOrigin(origin, host) {
    if (!origin || !host) return false;
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  },
  isAuthenticated,
};
