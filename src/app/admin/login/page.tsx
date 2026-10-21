import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLogin from "@/features/admin/components/admin-login";
import { sessionAuthentication } from "@/composition/server-application";

export const metadata: Metadata = {
  title: "Yönetici Girişi | Durmaz Kardeşler",
  robots: { index: false, follow: false },
};

export default async function AdminLoginRoute() {
  const cookieStore = await cookies();
  if (sessionAuthentication.isAuthenticated(
    cookieStore.get(sessionAuthentication.cookieName)?.value,
  )) {
    redirect("/admin");
  }
  return <AdminLogin />;
}
