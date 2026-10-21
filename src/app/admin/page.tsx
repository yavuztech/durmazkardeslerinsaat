import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "@/features/admin/components/admin-dashboard";
import { AdminStateProvider } from "@/app/providers";
import { serverApplication, sessionAuthentication } from "@/composition/server-application";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yönetim Paneli | Durmaz Kardeşler",
  robots: { index: false, follow: false },
};

export default async function AdminRoute() {
  const cookieStore = await cookies();
  if (!sessionAuthentication.isAuthenticated(
    cookieStore.get(sessionAuthentication.cookieName)?.value,
  )) {
    redirect("/admin/login");
  }
  const content = await serverApplication.getAdminContent();
  return (
    <AdminStateProvider content={content}>
      <AdminDashboard />
    </AdminStateProvider>
  );
}
