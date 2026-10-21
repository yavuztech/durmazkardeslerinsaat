import {
  getAdminContent,
  getPublicContent,
  updateAdminContent,
} from "@/interface/http/controllers/content-controller";
import { serverApplication, sessionAuthentication } from "@/composition/server-application";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (new URL(request.url).searchParams.get("admin") === "true") {
    return getAdminContent(request, serverApplication, sessionAuthentication);
  }
  return getPublicContent(serverApplication);
}

export const PUT = (request: Request) =>
  updateAdminContent(request, serverApplication, sessionAuthentication);
