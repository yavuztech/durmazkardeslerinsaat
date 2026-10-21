import { uploadImage } from "@/interface/http/controllers/upload-controller";
import { localImageStorage, sessionAuthentication } from "@/composition/server-application";

export const runtime = "nodejs";
export const POST = (request: Request) =>
  uploadImage(request, sessionAuthentication, localImageStorage);
