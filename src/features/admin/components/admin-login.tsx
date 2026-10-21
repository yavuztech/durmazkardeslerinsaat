"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useApplication } from "@/presentation/context/application-context";
import { getAdminActionError } from "@/features/admin/model/utils";
import {
  Brand,
  ErrorMessage,
  GlobalStyle,
  LoginCard,
  LoginWrap,
  LoginLogo,
  Submit,
} from "@/features/admin/styles/admin-login.styles";

export default function AdminLogin() {
  const application = useApplication();
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ password: string }>();

  async function login({ password }: { password: string }) {
    setError("");
    try {
      await application.authenticateAdmin(password);
      router.replace("/admin");
    } catch (requestError) {
      setError(getAdminActionError(requestError, "Giriş başarısız."));
    }
  }

  return (
    <>
      <GlobalStyle />
      <LoginWrap>
        <LoginCard onSubmit={handleSubmit(login)}>
          <Brand><LoginLogo src="/uploads/logo.svg" alt="Durmaz Kardeşler Yapı İnşaat" /><span>DURMAZ KARDEŞLER<small>GÜVENLİ YÖNETİCİ GİRİŞİ</small></span></Brand>
          <h1>Yönetim paneli</h1>
          <p>Devam etmek için yönetici parolanızı girin.</p>
          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
          <label htmlFor="admin-password">Yönetici parolası</label>
          <input id="admin-password" type="password" autoComplete="current-password" {...register("password", { required: true })} />
          <Submit type="submit" disabled={isSubmitting}>{isSubmitting ? "Doğrulanıyor…" : "Güvenli giriş →"}</Submit>
          <p style={{ fontSize: 10, margin: "15px 0 0" }}>Yönetici parolası sunucunun .env.local ayarlarında tanımlanır.</p>
        </LoginCard>
      </LoginWrap>
    </>
  );
}
