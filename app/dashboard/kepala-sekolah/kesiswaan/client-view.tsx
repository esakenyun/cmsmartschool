"use client";

import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { useEffect, useState } from "react";

export default function KepalaSekolahKesiswaanContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg text-slate-800 mb-4">
            Statistik Siswa SMP
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-600">
                Kelas 7 (Putra/Putri)
              </span>
              <span className="font-bold text-slate-800">120 Siswa</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-600">
                Kelas 8 (Putra/Putri)
              </span>
              <span className="font-bold text-slate-800">115 Siswa</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-600">
                Kelas 9 (Putra/Putri)
              </span>
              <span className="font-bold text-slate-800">108 Siswa</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg text-slate-800 mb-4">
            Program Unggulan
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <p className="text-sm text-slate-600">
                Tahfidz Quran (Target 3 Juz/Tahun)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <p className="text-sm text-slate-600">
                Bilingual Class (Arabic & English)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <p className="text-sm text-slate-600">Leadership Camp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
