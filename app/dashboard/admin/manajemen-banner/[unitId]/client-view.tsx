"use client";

import { Bell, Eye, Type, ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";

type BannerType = {
  title: string;
  subtitle: string;
  color: string;
};

type BannerProps = {
  unitId: string;
  initialData: Record<string, BannerType>;
};

export default function BannerManager({ unitId, initialData }: BannerProps) {
  const [banners, setBanners] = useState<Record<string, BannerType>>(
    initialData ?? {},
  );

  // Determine tabs based on unitId
  const tabs = useMemo(() => {
    switch (unitId) {
      case "tk":
        return ["TK A", "TK B"];
      case "sd":
        return ["1", "2", "3", "4", "5", "6"];
      case "smp":
        return ["7", "8", "9"];
      case "sma":
        return ["10", "11", "12"];
      default:
        return [];
    }
  }, [unitId]);

  const [activeGradeTab, setActiveGradeTab] = useState(tabs[0] || "");

  // Initialize banner if not exists for the tab
  const activeBanner = banners[activeGradeTab] || {
    title: "",
    subtitle: "",
    color: "from-blue-500 to-cyan-500",
  };

  const handleUpdateBanner = (field: keyof BannerType, value: string) => {
    setBanners((prev) => ({
      ...prev,
      [activeGradeTab]: {
        ...(prev[activeGradeTab] || {
          title: "",
          subtitle: "",
          color: "from-blue-500 to-cyan-500",
        }),
        [field]: value,
      },
    }));
  };

  if (tabs.length === 0) {
    return <div className="p-6">Unit tidak dikenali</div>;
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/admin/manajemen-banner"
        className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:underline"
      >
        <ArrowLeft size={16} />
        Kembali ke Daftar Unit
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          {tabs.map((grade) => (
            <button
              key={grade}
              onClick={() => setActiveGradeTab(grade)}
              className={`flex-1 min-w-[100px] py-4 text-sm font-bold transition-all whitespace-nowrap ${
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

              {/* Gradient */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-1">
                  Warna Tema
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
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${activeBanner.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <Bell size={20} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      PEMBERITAHUAN
                    </span>
                    <span className="text-[10px] text-gray-400">
                      • Sekarang
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-gray-800 leading-tight mb-1">
                    {activeBanner.title || "Judul Banner..."}
                  </h4>

                  <p className="text-xs text-gray-500 leading-snug">
                    {activeBanner.subtitle ||
                      "Deskripsi banner akan muncul di sini..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 pb-6">
          Tampilan simulasi di perangkat mobile siswa kelas {activeGradeTab}
        </p>
      </div>
    </div>
  );
}
