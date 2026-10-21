import {
  createInquiry,
  deleteInquiry,
  updateInquiryStatus,
} from "@/interface/http/controllers/inquiry-controller";
import { serverApplication, sessionAuthentication } from "@/composition/server-application";

export const runtime = "nodejs";
export const POST = (request: Request) =>
  createInquiry(request, serverApplication, sessionAuthentication);
export const PATCH = (request: Request) =>
  updateInquiryStatus(request, serverApplication, sessionAuthentication);
export const DELETE = (request: Request) =>
  deleteInquiry(request, serverApplication, sessionAuthentication);
