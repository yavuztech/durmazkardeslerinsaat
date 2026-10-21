import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ImageStorage } from "@/application/ports/image-storage";

const extensions = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

export const localImageStorage: ImageStorage = {
  async save(image, mimeType) {
    const filename = `${randomUUID()}.${extensions[mimeType]}`;
    const directory = path.join(process.cwd(), "public", "uploads");
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, filename), image, { flag: "wx", mode: 0o644 });
    return `/uploads/${filename}`;
  },
};
