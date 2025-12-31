"use client";

import {
  KanbanCardSkeleton,
  StatCardSkeleton,
} from "@/components/skeletons/card-skeleton";
import { Calendar, CheckCircle2, Clock, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function KepalaSekolahPPDBContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <KanbanCardSkeleton />
            <div className="mt-2">
              <KanbanCardSkeleton />
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <KanbanCardSkeleton />
            <div className="mt-2">
              <KanbanCardSkeleton />
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <KanbanCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-slate-500">Pendaftar Online</p>
          <h3 className="text-2xl font-bold text-slate-800">10</h3>
          <p className="text-xs text-blue-500 mt-1">Calon Siswa</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <p className="text-sm text-slate-500">Konfirmasi Pembayaran</p>
          <h3 className="text-2xl font-bold text-slate-800">10</h3>
          <p className="text-xs text-yellow-600 mt-1">Formulir Terbeli</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500">
          <p className="text-sm text-slate-500">Tahap Observasi</p>
          <h3 className="text-2xl font-bold text-slate-800">30</h3>
          <p className="text-xs text-purple-500 mt-1">Wawancara & Tes Quran</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <p className="text-sm text-slate-500">Diterima</p>
          <h3 className="text-2xl font-bold text-slate-800">16</h3>
          <p className="text-xs text-emerald-500 mt-1">Siswa Baru SMP</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kanban Column 1 */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Pendaftar Baru
          </h4>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-3 rounded-lg shadow-sm border border-slate-100"
              >
                <div className="flex justify-between items-start">
                  <p className="font-bold text-sm text-slate-800">
                    Ananda Fulan {i}
                  </p>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                    Online
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  SD Asal: SDN 01 Bandung
                </p>
                <div className="mt-2 text-xs text-blue-600 font-medium">
                  Menunggu Verifikasi Berkas
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kanban Column 2 */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Jadwal Observasi
          </h4>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
              <p className="font-bold text-sm text-slate-800">Ananda Rizki</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-purple-600">
                <Calendar className="w-3 h-3" />
                <span>Senin, 24 Des • 08:00 WIB</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Pewawancara: Ust. Ahmad
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
              <p className="font-bold text-sm text-slate-800">Ananda Putri</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-purple-600">
                <Calendar className="w-3 h-3" />
                <span>Senin, 24 Des • 09:30 WIB</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Pewawancara: Bu Rina
              </p>
            </div>
          </div>
        </div>

        {/* Kanban Column 3 */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Lolos Seleksi
          </h4>
          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-center mb-2">
            <p className="text-sm text-emerald-800 font-medium">
              40 Siswa telah melunasi daftar ulang.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
