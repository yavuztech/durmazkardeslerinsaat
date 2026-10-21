"use client";

import type { ReactNode } from "react";
import { createCmsApplication, createContentApplication } from "@/application/use-cases/create-cms-application";
import { httpAdminGateway } from "@/infrastructure/gateways/http-admin-gateway";
import { httpContentRepository } from "@/infrastructure/gateways/http-content-repository";
import { ApplicationProvider } from "@/presentation/context/application-context";

const contentApplication = createContentApplication(httpContentRepository);
const application = createCmsApplication(contentApplication, httpAdminGateway);

export function ClientApplicationProvider({ children }: { children: ReactNode }) {
  return (
    <ApplicationProvider application={application}>
      {children}
    </ApplicationProvider>
  );
}
