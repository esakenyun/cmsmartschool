"use client";

import { Edit3, Save, Upload, User, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getUserByRole, updateUser } from "@/services/user-service";
import Image from "next/image";
import { toast } from "sonner";
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";

export default function ProfileGuruContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    nip: "",
    tmt: "",
    ttl: "",
    address: "",
    position: "",
    email: "",
    phone: "",
    imageUrl: "",
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

  useEffect(() => {
    const initProfile = async () => {
      try {
        const guru = await getUserByRole("guru");

        if (guru) {
          setProfile({
            id: guru.id,
            name: guru.name,
            nip: guru.nip,
            tmt: guru.tmt,
            ttl: guru.ttl,
            address: guru.address,
            position: guru.jabatan,
            email: guru.email,
            phone: guru.numberhandphone,
            imageUrl: guru.imageUrl,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    initProfile();
  }, []);

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
        <div className="h-32 bg-emerald-600 relative">
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
              <p className="text-emerald-600 font-medium">{profile.position}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
                  NIP/NIY: {profile.nip}
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
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
                  ? "bg-emerald-600 text-white disabled:bg-emerald-400"
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
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
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
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
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
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
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
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
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
    </div>
  );
}
