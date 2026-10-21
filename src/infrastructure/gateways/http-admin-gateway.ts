import type { AdminGateway } from "@/application/ports/admin-gateway";
import { httpClient } from "@/infrastructure/http/http-client";

export const httpAdminGateway: AdminGateway = {
  async authenticate(password) {
    await httpClient.post("/api/cms/auth", { password });
  },
  async logout() {
    await httpClient.delete("/api/cms/auth");
  },
  async uploadImage({ bytes, mimeType }) {
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      const chunk = bytes.subarray(offset, offset + 0x8000);
      let chunkBinary = "";
      for (let index = 0; index < chunk.length; index += 1) {
        chunkBinary += String.fromCharCode(chunk[index]);
      }
      binary += chunkBinary;
    }
    const response = await httpClient.post<{ url: string }>("/api/cms/upload", {
      data: btoa(binary),
      mimeType,
    });
    return response.data.url;
  },
};
