import type { RequestSecurity } from "@/application/ports/request-security";

export interface SessionAuthentication extends RequestSecurity {
  readonly production: boolean;
  isConfigured(): boolean;
  verifyPassword(password: string): boolean;
  createSession(): { value: string; maxAge: number };
}
