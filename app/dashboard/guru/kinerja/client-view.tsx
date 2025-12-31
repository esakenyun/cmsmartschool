"use client";

import { Activity, BookOpen, Clock, Smartphone, User } from "lucide-react";
import { useState, useEffect } from "react";
import { StatCardSkeleton } from "@/components/skeletons/card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function KinerjaGuruContent() {
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-full">
        <header className="flex justify-between items-center mb-6">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-48 rounded-lg" />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-full">
      <header className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-slate-500">
            Update terakhir: Senin, 19 Des 2024 - 08:00 WIB
          </p>
        </div>
        <div>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="pl-4 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Presensi */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h4 className="font-bold">Presensi Harian</h4>
            <Clock className="w-5 h-5 opacity-80" />
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-slate-800">98%</span>
              <p className="text-sm text-slate-500">Kehadiran Bulan Ini</p>
            </div>
            <div className="space-y-2 mb-6 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Datang Tepat Waktu</span>
                <span className="font-bold text-green-600">20 Hari</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Terlambat</span>
                <span className="font-bold text-yellow-600">1 Hari</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-bold transition-colors">
              <Smartphone className="w-4 h-4" /> Input Presensi (AppSheet)
            </button>
          </div>
        </div>

        {/* Card Mutabaah */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
          <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
            <h4 className="font-bold">Mutabaah Yaumiyah</h4>
            <Activity className="w-5 h-5 opacity-80" />
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-slate-800">
                Excellent
              </span>
              <p className="text-sm text-slate-500">Kualitas Ibadah</p>
            </div>
            <div className="space-y-2 mb-6 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Sholat Jamaah</span>
                <span className="font-bold text-emerald-600">Lengkap</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Tilawah Quran</span>
                <span className="font-bold text-emerald-600">Rutin</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-2 rounded-lg font-bold transition-colors">
              <Smartphone className="w-4 h-4" /> Input Mutabaah (AppSheet)
            </button>
          </div>
        </div>

        {/* Card Jurnal Kerja */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
          <div className="bg-orange-500 p-4 text-white flex justify-between items-center">
            <h4 className="font-bold">Jurnal Kerja Guru</h4>
            <BookOpen className="w-5 h-5 opacity-80" />
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-slate-800">45 Jam</span>
              <p className="text-sm text-slate-500">Total Jam Efektif</p>
            </div>
            <div className="space-y-2 mb-6 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Jam Mengajar</span>
                <span className="font-bold text-slate-700">24 JP</span>
              </div>

              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Pengembangan Diri</span>
                <span className="font-bold text-slate-700">2 Jam</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 py-2 rounded-lg font-bold transition-colors">
              <Smartphone className="w-4 h-4" /> Input Jurnal (AppSheet)
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
          <div className="bg-red-500 p-4 text-white flex justify-between items-center">
            <h4 className="font-bold">Perizinan Kerja</h4>
            <User className="w-5 h-5 opacity-80" />
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-slate-800">2 Hari</span>
              <p className="text-sm text-slate-500">Total Perizinan</p>
            </div>
            <div className="space-y-2 mb-6 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Izin</span>
                <span className="font-bold text-slate-700">2 Hari</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Maksimal Izin</span>
                <span className="font-bold text-slate-700">2/10 Hari</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 border-2 border-red-500 text-red-600 hover:bg-red-50 py-2 rounded-lg font-bold transition-colors">
              <Smartphone className="w-4 h-4" /> Input Perizinan (AppSheet)
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Smartphone className="w-6 h-6 text-blue-600 mt-1" />
        <div>
          <h5 className="font-bold text-blue-800">Info Aplikasi</h5>
          <p className="text-sm text-blue-600">
            Seluruh data presensi, mutabaah, dan jurnal kerja terintegrasi
            langsung dengan database Yayasan. Pastikan mengisi data sebelum
            pukul 16.00 WIB setiap harinya.
          </p>
        </div>
      </div>
    </div>
  );
}
