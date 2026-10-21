"use client";

import { useEffect, useState } from "react";
import type { PublicSiteContent } from "@/domain/entities/cms-content";
import { useApplication } from "@/presentation/context/application-context";

export function useHomeContent(initialContent: PublicSiteContent) {
  const application = useApplication();
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    application.getPublicContent()
      .then(setContent)
      .catch((error: unknown) => console.error("Site içerikleri alınamadı:", error));
  }, [application]);

  return content;
}
