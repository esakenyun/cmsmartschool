"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Teacher } from "@/features/teachers/data/data-teacher";
import { Download, Clock, BookOpen, FileText, ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  getDetailPresensiOption,
  getDetailMutabaahOption,
  getDetailJournalOption,
} from "@/features/principal/chart-options";
import { DetailCard } from "@/features/principal/components/detail-card";
import { generateTeacherReportPDF } from "@/features/principal/utils/pdf-generator";
import { getTeacherStats } from "@/features/principal/utils/utils";
import Link from "next/link";

// Dummy Data Generators
const generatePresensiHistory = () => [
  {
    date: "2024-03-05",
    time: "06:55 - 14:00",
    status: "Hadir",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    date: "2024-03-04",
    time: "06:55 - 14:00",
    status: "Hadir",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    date: "2024-03-03",
    time: "06:55 - 14:00",
    status: "Hadir",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    date: "2024-03-02",
    time: "06:55 - 14:00",
    status: "Sakit",
    color: "bg-red-100 text-red-700",
  },
  {
    date: "2024-03-01",
    time: "06:55 - 14:00",
    status: "Hadir",
    color: "bg-emerald-100 text-emerald-700",
  },
];

const generateMutabaahHistory = () => [
  {
    activity: "Shalat Dhuha",
    status: "Tertelaksana",
    color: "text-blue-600 bg-blue-50",
  },
  {
    activity: "Tilawah Quran",
    status: "Tertelaksana",
    color: "text-blue-600 bg-blue-50",
  },
  {
    activity: "Puasa Sunnah",
    status: "Tidak",
    color: "text-slate-500 bg-slate-100",
  },
  {
    activity: "Sedekah",
    status: "Tertelaksana",
    color: "text-blue-600 bg-blue-50",
  },
  {
    activity: "Dzikir Pagi",
    status: "Tertelaksana",
    color: "text-blue-600 bg-blue-50",
  },
];

const generateJournalHistory = () => [
  {
    materi: "Mata Pelajaran Utama",
    sub: "Materi Bahasan Bab 5",
    status: "Terisi",
    color: "bg-blue-100 text-blue-700",
  },
  {
    materi: "Mata Pelajaran Utama",
    sub: "Materi Bahasan Bab 4",
    status: "Terisi",
    color: "bg-blue-100 text-blue-700",
  },
  {
    materi: "Mata Pelajaran Utama",
    sub: "Materi Bahasan Bab 3",
    status: "Kosong",
    color: "bg-slate-100 text-slate-700",
  },
  {
    materi: "Mata Pelajaran Utama",
    sub: "Materi Bahasan Bab 2",
    status: "Terisi",
    color: "bg-blue-100 text-blue-700",
  },
  {
    materi: "Mata Pelajaran Utama",
    sub: "Materi Bahasan Bab 1",
    status: "Terisi",
    color: "bg-blue-100 text-blue-700",
  },
];

export default function TendikKepalaSekolahContent({
  guru,
}: {
  guru: Teacher;
}) {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(2025, 2, 1),
    endDate: new Date(2025, 2, 31),
    key: "selection",
  });

  // Calculate detailed stats using the dynamic generator
  const stats = useMemo(() => {
    return getTeacherStats(guru.id, dateRange.startDate, dateRange.endDate);
  }, [guru.id, dateRange]);

  // Extract values for charts
  const presensiOnTime = stats.totalOnTime;
  const presensiLate = stats.totalLate;

  const journalComplete = stats.journalStats.complete;
  const journalIncomplete = stats.journalStats.incomplete;
  const journalMissing = stats.journalStats.missing;

  const handleDownloadPDF = () => {
    toast.info("Sedang membuat PDF...");
    try {
      generateTeacherReportPDF(guru, {
        presensi: generatePresensiHistory(),
        mutabaah: generateMutabaahHistory(),
        jurnal: generateJournalHistory(),
      });
      toast.success("PDF berhasil diunduh");
    } catch (error) {
      console.error(error);
      toast.error("Gagal membuat PDF");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2 items-center">
          <Link
            href="/dashboard/kepala-sekolah/tendik"
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{guru.name}</h1>
            <p className="text-sm font-medium text-emerald-600">{guru.role}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <DateRangePicker date={dateRange} setDate={setDateRange} />
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-center"
          >
            <Download className="w-4 h-4" />
            <span className="">Unduh PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Presensi Card */}
        <DetailCard
          title="Presensi Kehadiran"
          subtitle="Rekapitulasi Periode Ini"
          icon={<Clock className="w-5 h-5" />}
          chartOption={getDetailPresensiOption(presensiOnTime, presensiLate)}
          tableTitle="Riwayat Terakhir"
        >
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100">
                <th className="pb-2 font-semibold">TANGGAL</th>
                <th className="pb-2 font-semibold">JAM MASUK</th>
                <th className="pb-2 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {generatePresensiHistory().map((item, i) => (
                <tr key={i}>
                  <td className="py-3 font-medium text-slate-700">
                    {item.date}
                  </td>
                  <td className="py-3 text-slate-500">{item.time}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${item.color}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DetailCard>

        {/* Mutabaah Card */}
        <DetailCard
          title="Mutabaah Yaumiyah"
          subtitle="Ibadah Harian"
          icon={<BookOpen className="w-5 h-5 text-violet-600" />} // Use specific color/icon if supported by DetailCard
          chartOption={getDetailMutabaahOption(stats.avgMutabaah)}
          tableTitle="Aktivitas Terakhir"
        >
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100">
                <th className="pb-2 font-semibold">AKTIVITAS</th>
                <th className="pb-2 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {generateMutabaahHistory().map((item, i) => (
                <tr key={i}>
                  <td className="py-3 font-medium text-slate-700">
                    {item.activity}
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${item.color}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DetailCard>

        {/* Jurnal Card */}
        <DetailCard
          title="Jurnal Mengajar"
          subtitle="Kelengkapan Administrasi"
          icon={<FileText className="w-5 h-5 text-blue-600" />}
          chartOption={getDetailJournalOption(
            journalComplete,
            journalIncomplete,
            journalMissing
          )}
          tableTitle="Jurnal Terakhir"
        >
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100">
                <th className="pb-2 font-semibold">MATERI</th>
                <th className="pb-2 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {generateJournalHistory().map((item, i) => (
                <tr key={i}>
                  <td className="py-3">
                    <div className="font-medium text-slate-700">
                      {item.materi}
                    </div>
                    <div className="text-xs text-slate-400">{item.sub}</div>
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${item.color}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DetailCard>
      </div>
    </div>
  );
}
