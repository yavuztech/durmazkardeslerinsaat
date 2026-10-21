export interface ImageStorage {
  save(image: Uint8Array, mimeType: "image/jpeg" | "image/png" | "image/webp"): Promise<string>;
}
