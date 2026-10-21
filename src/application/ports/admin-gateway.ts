export type ImageUpload = {
  mimeType: "image/jpeg" | "image/png" | "image/webp";
  bytes: Uint8Array;
};

export interface AdminGateway {
  authenticate(password: string): Promise<void>;
  logout(): Promise<void>;
  uploadImage(image: ImageUpload): Promise<string>;
}
