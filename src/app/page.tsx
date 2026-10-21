import HomePage from "@/features/home/components/home-page";
import { serverApplication } from "@/composition/server-application";

export const dynamic = "force-dynamic";

export default async function HomeRoute() {
  const content = await serverApplication.getPublicContent();
  return (
    <HomePage
      initialContent={{
        services: content.services,
        projects: content.projects,
        settings: content.settings,
      }}
    />
  );
}
