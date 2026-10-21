"use client";

import { createContext, useContext } from "react";
import type { CmsApplication } from "@/application/services/cms-application";

const ApplicationContext = createContext<CmsApplication | null>(null);

export function ApplicationProvider({
  application,
  children,
}: {
  application: CmsApplication;
  children: React.ReactNode;
}) {
  return (
    <ApplicationContext.Provider value={application}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication(): CmsApplication {
  const application = useContext(ApplicationContext);
  if (!application) {
    throw new Error("ApplicationProvider is missing from the component tree.");
  }
  return application;
}
