"use client";

import { ArrowLeft, ChevronRight, Mail } from "lucide-react";
import { roles as roleData } from "@/features/auth/config/roles";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/app/actions/auth";
import { toast } from "sonner";

export default function LoginForm() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    if (selectedRole) {
      formData.append("role", selectedRole);
      console.log(selectedRole);
    }

    try {
      // Call server action, passing null as prevState since we're calling it directly
      const result = await loginWithEmail(null, formData);

      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      } else {
        toast.error(result.message || "Login failed");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  /* Roles data moved to @/features/auth/data/roles.tsx */
  const roles = roleData.filter((role) => role.id !== "admin");
  const activeRole = roles.find((r) => r.id === selectedRole);
  return (
    <div className="w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] md:h-[600px] mx-3 my-3 md:my-0 md:mx-5">
      {/* Left Side: Brand & Illustration */}
      <div className="w-full md:w-5/12 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Image
                src="/logocm.png"
                className="w-6 h-6"
                width={20}
                height={20}
                alt="Logo"
                priority
              />
            </div>
            <h1 className="text-xl font-bold tracking-wide">Cendekia Muda</h1>
          </div>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-4">
            Smart School <span className="text-blue-400">System</span>
          </h2>
          <p className="text-slate-400 text-sm hidden md:block">
            Selamat datang di sistem manajemen sekolah terintegrasi. Platform
            digital untuk menghubungkan Yayasan, Guru, Siswa, dan Orang Tua
            dalam satu ekosistem pendidikan cerdas.
          </p>
        </div>
        <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
          <p className="text-white text-sm">
            © 2026 Cendekia Muda. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side: Role Selection & Login Form */}
      <div className="w-full md:w-7/12 p-8 md:p-12 bg-white relative overflow-y-auto">
        {/* View 1: Role Selection */}
        {!selectedRole && (
          <div className="h-full flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900">
                Pilih Akses Masuk
              </h3>
              <p className="text-slate-500 mt-2">
                Siapakah Anda? Pilih peran untuk melanjutkan ke halaman login.
              </p>
            </div>

            <div className="grid gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className="group relative flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-transparent hover:shadow-lg transition-all duration-300 bg-white hover:bg-slate-50 text-left overflow-hidden"
                >
                  {/* Hover indicator bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${role.color} scale-y-0 group-hover:scale-y-100 transition-transform duration-300`}
                  ></div>

                  <div
                    className={`p-3 rounded-full ${role.lightColor} ${role.textColor} group-hover:scale-110 transition-transform duration-300 shrink-0`}
                  >
                    {role.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800 text-lg group-hover:text-slate-900 truncate">
                        {role.title}
                      </h4>
                    </div>
                    <p className="text-sm font-medium text-slate-500 group-hover:text-slate-600 truncate">
                      {role.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 truncate hidden sm:block">
                      {role.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-800 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* View 2: Login Form */}
        {selectedRole && activeRole && (
          <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
            <button
              onClick={() => {
                setSelectedRole(null);
                // setError(null); // Error state removed
              }}
              className="flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6 group w-fit"
            >
              <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Kembali ke pilihan akses
            </button>

            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
              <div className="text-center mb-8">
                <div
                  className={`w-16 h-16 ${activeRole.lightColor} ${activeRole.textColor} rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm`}
                >
                  {activeRole.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Login {activeRole.title}
                </h3>
                <p className="text-slate-500 mt-2">
                  Masukkan email {activeRole.subtitle} Anda
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="student@luminoed.co.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition"
                    />
                  </div>
                </div>
                {/* Error displayed via toast, static block removed */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${activeRole.color} ${activeRole.hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 ${activeRole.ringColor} transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Memproses...
                    </span>
                  ) : (
                    "Masuk Sekarang"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
