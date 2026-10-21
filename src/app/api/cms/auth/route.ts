import { getAuthStatus, login, logout } from "@/interface/http/controllers/auth-controller";
import { sessionAuthentication } from "@/composition/server-application";

export const runtime = "nodejs";
export const GET = (request: Request) => getAuthStatus(request, sessionAuthentication);
export const POST = (request: Request) => login(request, sessionAuthentication);
export const DELETE = (request: Request) => logout(request, sessionAuthentication);
