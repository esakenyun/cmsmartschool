"use client";

import { ChevronDown, School } from "lucide-react";
import { useState, useEffect } from "react";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function PimpinanKesiswaanContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="space-y-6">
        <header className="flex justify-between items-center mb-6">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-48 rounded-lg" />
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main>
      <header className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-slate-500">
            Update terakhir: Senin, 19 Des 2024 - 08:00 WIB
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <School className="h-4 w-4 text-slate-500" />
          </div>
          <select className="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700 appearance-none cursor-pointer">
            <option value="all">Semua Unit Sekolah</option>
            <option value={"smp"}>SMP Cendekia Muda</option>
            <option value={"sd"}>SD Cendekia Muda</option>
            <option value={"tk"}>TK Cendekia Muda</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg text-slate-800 mb-4">
            Prestasi Siswa (Tahun Berjalan)
          </h3>
          <div className="space-y-4">
            {[
              {
                level: "Nasional",
                event: "Olimpiade Sains (OSN)",
                medal: "2 Emas, 1 Perak",
                unit: "SMA",
              },
              {
                level: "Provinsi",
                event: "Lomba Robotik",
                medal: "Juara 1",
                unit: "SMP",
              },
              {
                level: "Kota/Kab",
                event: "Futsal Cup",
                medal: "Juara 2",
                unit: "SD",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100"
              >
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                  #{idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{item.event}</h4>
                  <p className="text-sm text-slate-600">
                    {item.medal} • Tingkat {item.level}
                  </p>
                  <span className="text-xs bg-white px-2 py-0.5 rounded text-slate-500 mt-1 inline-block border border-slate-200">
                    {item.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg text-slate-800 mb-4">
            Statistik Kedisiplinan & Konseling
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h4 className="text-2xl font-bold text-red-600">12</h4>
              <p className="text-xs text-red-500 uppercase font-bold">
                Pelanggaran Berat
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="text-2xl font-bold text-blue-600">145</h4>
              <p className="text-xs text-blue-500 uppercase font-bold">
                Sesi Konseling
              </p>
            </div>
          </div>
          <div>
            <h5 className="text-sm font-bold text-slate-700 mb-2">
              Tren Isu Kesiswaan
            </h5>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>Keterlambatan</span>
                <div className="w-1/2 bg-slate-100 h-2 rounded-full">
                  <div className="w-[60%] bg-slate-400 h-2 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Atribut Seragam</span>
                <div className="w-1/2 bg-slate-100 h-2 rounded-full">
                  <div className="w-[30%] bg-slate-400 h-2 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Bullying (Laporan)</span>
                <div className="w-1/2 bg-slate-100 h-2 rounded-full">
                  <div className="w-[5%] bg-slate-400 h-2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
