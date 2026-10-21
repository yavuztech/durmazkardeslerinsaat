import type { CSSProperties } from "react";
import type { Project } from "@/domain/entities/cms-content";

export function getProjectImageStyle(image: string): CSSProperties {
  const safeImageUrl = image.replace(/["'()\\\n\r]/g, "");
  return { backgroundImage: `url("${safeImageUrl}")` };
}

export function getProjectAnchorId(id: string) {
  return `project-${id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

export function getProjectStatusLabel(status: Project["status"]) {
  return status === "completed" ? "TAMAMLANDI" : "DEVAM EDİYOR";
}
