"use client";

import { Edit3, Save, Upload, User, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { updateUser } from "@/features/auth/services/auth-service";
import { UserData } from "@/features/auth/types/types";
import Image from "next/image";
import { toast } from "sonner";
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";

interface ProfilePageProps {
  initialData?: UserData;
}

export default function ProfilePage({ initialData }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(!initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    nip: initialData?.nip || "",
    tmt: initialData?.tmt || "",
    ttl: initialData?.ttl || "",
    address: initialData?.address || "",
    position: initialData?.jabatan || "",
    email: initialData?.email || "",
    phone: initialData?.numberhandphone || "",
    imageUrl: initialData?.imageUrl || "",
  });

  // Helper to format date string to "DD MMMM YYYY" or keep as is if not valid date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  // Helper to convert ISO string to YYYY-MM-DD for input
  const toInputDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedData = {
        name: profile.name,
        nip: profile.nip,
        tmt: new Date(profile.tmt).toISOString(),
        ttl: new Date(profile.ttl).toISOString(),
        address: profile.address,
        jabatan: profile.position,
        email: profile.email,
        numberhandphone: profile.phone,
        imageUrl: profile.imageUrl,
      };

      await updateUser(profile.id, updatedData);

      setIsEditing(false);
      toast.success("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Gagal memperbarui profil.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-blue-600 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center overflow-hidden relative">
              {profile.imageUrl ? (
                <Image
                  src={profile.imageUrl}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-slate-400" />
              )}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-slate-800 text-white p-2 rounded-full hover:bg-slate-700 transition-colors shadow-lg z-10">
                <Upload className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="pt-20 pb-8 px-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {profile.name}
              </h2>
              <p className="text-blue-600 font-medium">{profile.position}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
                  NIP/NIY: {profile.nip}
                </span>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  Aktif
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              disabled={isSaving}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isEditing
                  ? "bg-blue-600 text-white disabled:bg-blue-400"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {isEditing ? (
                isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )
              ) : (
                <Edit3 className="w-4 h-4" />
              )}
              {isEditing
                ? isSaving
                  ? "Menyimpan..."
                  : "Simpan Profil"
                : "Edit Profil"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Tempat, Tanggal Lahir
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={toInputDate(profile.ttl)}
                  onChange={(e) =>
                    setProfile({ ...profile, ttl: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 border-b border-transparent py-2">
                  {formatDate(profile.ttl)}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                TMT Guru Tetap
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={toInputDate(profile.tmt)}
                  onChange={(e) =>
                    setProfile({ ...profile, tmt: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 border-b border-transparent py-2">
                  {formatDate(profile.tmt)}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Alamat Domisili
              </label>
              {isEditing ? (
                <input
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 border-b border-transparent py-2">
                  {profile.address}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Email Sekolah
              </label>
              <p className="text-slate-800 py-2">{profile.email}</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Nomor WhatsApp
              </label>
              {isEditing ? (
                <input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="text-slate-800 border-b border-transparent py-2">
                  {profile.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Riwayat Pelatihan
              </h2>
              <p className="text-sm text-slate-500">
                Daftar pelatihan dan workshop yang telah diikuti
              </p>
            </div>

            <button className="flex justify-center items-center gap-1.5 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition w-7/12 md:w-fit">
              <Plus className="w-4 h-4" />
              Tambah Pelatihan
            </button>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100">
                <tr className="text-left text-sm font-semibold text-slate-600">
                  <th className="px-4 py-3">Nama Pelatihan</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Penyelenggara</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-sm">
                <tr className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-medium text-slate-700">
                    Workshop Kurikulum Merdeka
                  </td>
                  <td className="px-4 py-3 text-slate-600">2024-12-19</td>
                  <td className="px-4 py-3 text-slate-600">
                    Dinas Pendidikan Kota
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs font-semibold transition">
                      Lihat
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-medium text-slate-700">
                    Pelatihan Media Pembelajaran Digital
                  </td>
                  <td className="px-4 py-3 text-slate-600">2024-10-05</td>
                  <td className="px-4 py-3 text-slate-600">
                    Balai Guru Penggerak
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs font-semibold transition">
                      Lihat
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-medium text-slate-700">
                    Seminar Penguatan Profil Pelajar Pancasila
                  </td>
                  <td className="px-4 py-3 text-slate-600">2024-08-21</td>
                  <td className="px-4 py-3 text-slate-600">
                    Kementerian Pendidikan
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs font-semibold transition">
                      Lihat
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
