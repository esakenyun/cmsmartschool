"use client";

import {
  CheckCircle2,
  AlertCircle,
  Clock,
  NotebookPen,
  CircleX,
} from "lucide-react";
import { useState, useEffect } from "react";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { PrincipalHeader } from "@/features/leader/components/leader-header";

const curriculumStats = [
  {
    unitName: "TK Cendekia Muda",
    accreditation: "A",
    rppCompleteness: 100,
    programRealization: 95,
    score: "Baik",
  },
  {
    unitName: "SD Cendekia Muda",
    accreditation: "A",
    rppCompleteness: 90,
    programRealization: 88,
    score: "Baik",
  },
  {
    unitName: "SMP Cendekia Muda",
    accreditation: "A",
    rppCompleteness: 85,
    programRealization: 80,
    score: "Perlu Review",
  },
  {
    unitName: "SMA Cendekia Muda",
    accreditation: "B",
    rppCompleteness: 80,
    programRealization: 75,
    score: "Perlu Review",
  },
];

export default function PimpinanKurikulumContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="space-y-6">
        <header className="flex justify-between items-center mb-6">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-48 rounded-lg" />
        </header>
        <TableSkeleton />
      </main>
    );
  }

  return (
    <main>
      <PrincipalHeader />

      <div className="py-5 mb-5">
        <h1 className="text-2xl font-semibold">Summary Unit</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 py-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Unit TK Cendekia Muda
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Total Perencanaan
                </p>
                <p className="text-3xl font-bold text-slate-900">50</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Total Evaluasi
                </p>
                <p className="text-3xl font-bold text-slate-900">20</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Disetujui</p>
                  <p className="text-sm font-bold text-slate-800">30</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Menunggu Review</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <NotebookPen className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Revisi</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                  <CircleX className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Ditolak</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Unit SD Cendekia Muda
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Total Perencanaan
                </p>
                <p className="text-3xl font-bold text-slate-900">50</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Total Evaluasi
                </p>
                <p className="text-3xl font-bold text-slate-900">20</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Disetujui</p>
                  <p className="text-sm font-bold text-slate-800">30</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Menunggu Review</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <NotebookPen className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Revisi</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                  <CircleX className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Ditolak</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Unit SMP Cendekia Muda
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Total Perencanaan
                </p>
                <p className="text-3xl font-bold text-slate-900">50</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Total Evaluasi
                </p>
                <p className="text-3xl font-bold text-slate-900">20</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Disetujui</p>
                  <p className="text-sm font-bold text-slate-800">30</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Menunggu Review</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <NotebookPen className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Revisi</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                  <CircleX className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Ditolak</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Unit SMA Cendekia Muda
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Total Perencanaan
                </p>
                <p className="text-3xl font-bold text-slate-900">50</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Total Evaluasi
                </p>
                <p className="text-3xl font-bold text-slate-900">20</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Disetujui</p>
                  <p className="text-sm font-bold text-slate-800">30</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Menunggu Review</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <NotebookPen className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Revisi</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                  <CircleX className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Ditolak</p>
                  <p className="text-sm font-bold text-slate-800">10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">
            Monitoring Administrasi Kurikulum
          </h3>
          <div className="flex items-center gap-4">
            <button className="text-sm text-indigo-600 font-medium hover:underline hidden md:block">
              Unduh Laporan Lengkap
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600 min-w-[800px]">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Unit Sekolah</th>
                <th className="px-6 py-4">Status Akreditasi</th>
                <th className="px-6 py-4">Kelengkapan RPP/Modul</th>
                <th className="px-6 py-4">Realisasi Program</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {curriculumStats.map((row, idx) => (
                <tr
                  key={idx}
                  className={`bg-white hover:bg-slate-50 transition-colors ${
                    idx < curriculumStats.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {row.unitName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                      {row.accreditation}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[100px]">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${row.rppCompleteness}%` }}
                      ></div>
                    </div>
                    <span className="text-xs mt-1 block">
                      {row.rppCompleteness}%
                    </span>
                  </td>
                  <td className="px-6 py-4">{row.programRealization}%</td>
                  <td className="px-6 py-4">
                    {row.score === "Perlu Review" ? (
                      <span className="text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {row.score}
                      </span>
                    ) : (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> {row.score}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
