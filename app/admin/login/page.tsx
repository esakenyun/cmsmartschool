"use client";
import LoginAdminForm from "@/features/auth/components/login-admin-form";

export default function LoginAdminPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[url('/background-cm.png')] bg-cover bg-center">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-0" />
      <LoginAdminForm />
    </main>
  );
}
