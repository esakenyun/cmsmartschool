"use client";

import {
  Activity,
  BookOpen,
  Clock,
  FolderSync,
  Smartphone,
  User,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { toast } from "sonner";
import { getKinerjaData } from "@/features/teachers/data/kinerja-dummy";

export default function KinerjaGuruContent() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(2025, 2, 1), // March 1st, 2025
    endDate: new Date(2025, 2, 31), // March 31st, 2025
    key: "selection",
  });
  const [loading, setLoading] = useState(true);

  // Fetch dynamic data
  const data = useMemo(() => {
    if (!dateRange.startDate || !dateRange.endDate) return null;
    return getKinerjaData(dateRange.startDate, dateRange.endDate);
  }, [dateRange]);

  useEffect(() => {
    // Simulate loading on mount or range change
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [dateRange]);

  if (loading || !data) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-full">
        <div>
          <Skeleton className="h-24 w-full" />
        </div>
        <header>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-9 w-48 rounded-lg" />
          </div>
          <Skeleton className="h-9 w-48" />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-full">
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
      <header>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <div>
            <p className="text-sm text-slate-500">
              Periode:{" "}
              {dateRange.startDate?.toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}{" "}
              -{" "}
              {dateRange.endDate?.toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </p>
          </div>
          <button
            onClick={() => {
              toast.success("Sinkronasi data berhasil!");
            }}
            className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FolderSync />
            Sinkronasi Data
          </button>
        </div>
        <div>
          <p className="text-sm text-slate-500 mb-2">Filter Data : </p>
          <DateRangePicker
            className="w-full md:w-auto"
            setDate={setDateRange}
            date={dateRange}
            align="start"
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
              <span className="text-4xl font-bold text-slate-800">
                {data.attendance.percentage}%
              </span>
              <p className="text-sm text-slate-500">Kehadiran Periode Ini</p>
            </div>
            <div className="space-y-2 mb-6 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Datang Tepat Waktu</span>
                <span className="font-bold text-green-600">
                  {data.attendance.present} Hari
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Terlambat</span>
                <span className="font-bold text-yellow-600">
                  {data.attendance.late} Hari
                </span>
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
                {data.mutabaah.score}
              </span>
              <p className="text-sm text-slate-500">Kualitas Ibadah</p>
            </div>
            <div className="space-y-2 mb-6 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Sholat Jamaah</span>
                <span className="font-bold text-emerald-600">
                  {data.mutabaah.sholat}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Tilawah Quran</span>
                <span className="font-bold text-emerald-600">
                  {data.mutabaah.tilawah}
                </span>
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
              <span className="text-4xl font-bold text-slate-800">
                {data.journal.totalHours} Jam
              </span>
              <p className="text-sm text-slate-500">Total Jam Efektif</p>
            </div>
            <div className="space-y-2 mb-6 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Jam Mengajar</span>
                <span className="font-bold text-slate-700">
                  {data.journal.teachingHours} JP
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Pengembangan Diri</span>
                <span className="font-bold text-slate-700">
                  {data.journal.selfDevHours} Jam
                </span>
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
              <span className="text-4xl font-bold text-slate-800">
                {data.permission.totalUsed} Hari
              </span>
              <p className="text-sm text-slate-500">Total Perizinan</p>
            </div>
            <div className="space-y-2 mb-6 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Izin / Sakit</span>
                <span className="font-bold text-slate-700">
                  {data.permission.totalUsed} Hari
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span>Maksimal Izin</span>
                <span className="font-bold text-slate-700">
                  {data.permission.totalUsed}/{data.permission.max} Hari
                </span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 border-2 border-red-500 text-red-600 hover:bg-red-50 py-2 rounded-lg font-bold transition-colors">
              <Smartphone className="w-4 h-4" /> Input Perizinan (AppSheet)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
