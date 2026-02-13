"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/app/actions/auth";
import { toast } from "sonner";

export default function LoginAdminForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("role", "admin"); // 🔥 PAKSA ADMIN

    try {
      const result = await loginWithEmail(null, formData);

      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      } else {
        toast.error(result.message || "Login failed");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative z-10">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
          <Image src="/logocm.png" width={20} height={20} alt="Logo" />
        </div>
        <h1 className="text-xl font-bold tracking-wide text-slate-900">
          Admin Panel
        </h1>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Login Administrator
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Masukkan email administrator untuk melanjutkan.
      </p>

      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              placeholder="admin@cendekiamuda.sch.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition disabled:opacity-70"
        >
          {isLoading ? "Memproses..." : "Masuk ke Admin Panel"}
        </button>
      </form>
    </div>
  );
}
