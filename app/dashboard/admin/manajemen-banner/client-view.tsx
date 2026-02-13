"use client";

import { Bell, Eye, Type } from "lucide-react";
import { useState } from "react";

type BannerType = {
  title: string;
  subtitle: string;
  color: string;
};

type BannerProps = {
  initialData: Record<string, BannerType>;
};

export default function ManajemenBannerContent({ initialData }: BannerProps) {
  const [banners, setBanners] = useState<Record<string, BannerType>>(
    initialData ?? {},
  );

  const [activeGradeTab, setActiveGradeTab] = useState("7");

  const activeBanner = banners?.[activeGradeTab];

  const handleUpdateBanner = (field: keyof BannerType, value: string) => {
    setBanners((prev) => ({
      ...prev,
      [activeGradeTab]: {
        ...prev[activeGradeTab],
        [field]: value,
      },
    }));
  };

  if (!activeBanner) {
    return <div className="p-6">Banner tidak ditemukan</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Manajemen Banner Siswa</h1>
        <p className="text-gray-500 text-sm">
          Atur pengumuman visual berdasarkan tingkatan kelas
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Tabs */}
        <div className="flex border-b">
          {["7", "8", "9"].map((grade) => (
            <button
              key={grade}
              onClick={() => setActiveGradeTab(grade)}
              className={`flex-1 py-4 text-sm font-bold transition-all ${
                activeGradeTab === grade
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Kelas {grade}
            </button>
          ))}
        </div>

        <div className="p-8 grid md:grid-cols-2 gap-12">
          {/* ========================= */}
          {/* FORM EDITOR */}
          {/* ========================= */}
          <div className="space-y-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Type size={18} className="text-blue-600" />
              Konten Banner Kelas {activeGradeTab}
            </h3>

            <div className="space-y-4">
              {/* Judul */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-1">
                  Judul Banner
                </label>
                <input
                  type="text"
                  value={activeBanner.title}
                  onChange={(e) => handleUpdateBanner("title", e.target.value)}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Masukkan judul..."
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-1">
                  Subjudul / Deskripsi
                </label>
                <textarea
                  rows={3}
                  value={activeBanner.subtitle}
                  onChange={(e) =>
                    handleUpdateBanner("subtitle", e.target.value)
                  }
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Masukkan deskripsi..."
                />
              </div>

              {/* Gradient (masih disimpan walau tidak dipakai di preview baru) */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-1">
                  Warna Tema (opsional)
                </label>
                <select
                  value={activeBanner.color}
                  onChange={(e) => handleUpdateBanner("color", e.target.value)}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="from-blue-500 to-cyan-500">Blue Cyan</option>
                  <option value="from-purple-500 to-pink-500">
                    Purple Pink
                  </option>
                  <option value="from-orange-500 to-red-500">Orange Red</option>
                  <option value="from-emerald-500 to-teal-500">
                    Green Teal
                  </option>
                </select>
              </div>
            </div>

            <button className="bg-blue-600 text-white w-full py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
              Simpan Perubahan
            </button>
          </div>

          {/* ========================= */}
          {/* PREVIEW MOBILE */}
          {/* ========================= */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Eye size={18} className="text-blue-600" />
              Preview di Aplikasi Siswa
            </h3>

            {/* ===== Notifikasi Card Style ===== */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <Bell className="text-red-500" size={20} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      PEMBERITAHUAN
                    </span>
                    <span className="text-[10px] text-gray-400">
                      • 20 Des 2024
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-gray-800 leading-tight mb-1">
                    {activeBanner.title}
                  </h4>

                  <p className="text-xs text-gray-500 leading-snug">
                    {activeBanner.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          Tampilan simulasi di perangkat mobile siswa
        </p>
      </div>
    </div>
  );
}
