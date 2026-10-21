import { createContentApplication } from "@/application/use-cases/create-cms-application";
import { fileContentRepository } from "@/infrastructure/persistence/file-content-repository";
import { localImageStorage } from "@/infrastructure/persistence/local-image-storage";
import { sessionAuthentication } from "@/infrastructure/security/session-authentication";

export const serverApplication = createContentApplication(fileContentRepository);
export { localImageStorage, sessionAuthentication };
