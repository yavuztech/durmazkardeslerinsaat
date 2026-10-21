export interface RequestSecurity {
  readonly cookieName: string;
  hasSameOrigin(origin: string | null, host: string | null): boolean;
  isAuthenticated(cookie: string | undefined): boolean;
}
