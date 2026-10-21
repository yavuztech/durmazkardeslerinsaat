"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type CmsStore } from "@/features/admin/model/store";
import type { CmsContent } from "@/domain/entities/cms-content";
import { useApplication } from "@/presentation/context/application-context";

export function AdminStateProvider({
  content,
  children,
}: {
  content: CmsContent;
  children: React.ReactNode;
}) {
  const application = useApplication();
  const storeRef = useRef<CmsStore | null>(null);
  if (!storeRef.current) storeRef.current = makeStore(content, application);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
