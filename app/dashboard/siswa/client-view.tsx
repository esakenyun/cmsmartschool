"use client";

import { Bell, Clock, Star, Calendar } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSiswaContent() {
  type AnnouncementLevel = "7" | "8" | "9";
  const [selectedLevel, setSelectedLevel] = useState<AnnouncementLevel>("7");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // --- MOCK DATA: INFORMASI RUTIN (PENGUMUMAN) ---
  interface Announcement {
    id: number;
    title: string;
    date: string;
    category: string;
    content: string;
  }
  const announcements: Record<AnnouncementLevel, Announcement[]> = {
    "7": [
      {
        id: 1,
        title: "Tagihan Administrasi Bulan Desember",
        date: "20 Des 2024",
        category: "Tagihan",
        content:
          "Halo anak-anak sholeh dan sholehah, Semoga kalian dalam keadaan sehat dan penuh semangat. Kami mengingatkan agar kalian memberitahukan orang tua atau wali untuk segera memeriksa tagihan administrasi bulan Desember.",
      },
    ],
    "8": [
      {
        id: 1,
        title: "Tagihan Administrasi Bulan Desember",
        date: "19 Des 2024",
        category: "Tagihan",
        content:
          "Halo anak-anak sholeh dan sholehah, Semoga kalian dalam keadaan sehat dan penuh semangat. Kami mengingatkan agar kalian memberitahukan orang tua atau wali untuk segera memeriksa tagihan administrasi bulan Desember.",
      },
    ],
    "9": [
      {
        id: 1,
        title: "Tagihan Administrasi Bulan Desember",
        date: "21 Des 2024",
        category: "Taghihan",
        content:
          "Halo anak-anak sholeh dan sholehah, Semoga kalian dalam keadaan sehat dan penuh semangat. Kami mengingatkan agar kalian memberitahukan orang tua atau wali untuk segera memeriksa tagihan administrasi bulan Desember.",
      },
    ],
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-8 w-32 rounded-lg" />
            </div>
            <div className="space-y-4">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Banner Selamat Datang */}
      <div className="bg-linear-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">
            Ahlan Wa Sahlan, Ananda! 👋
          </h2>
          <p className="text-orange-100 max-w-xl">
            Semangat belajar hari ini! Jangan lupa cek jadwal pelajaran dan
            tugas terbaru ya.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href={"/siswa/mata-pelajaran"}
              className="bg-white text-orange-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-50 transition-colors shadow-sm"
            >
              Buka Kelas Saya
            </Link>
            <button className="bg-orange-600/50 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors backdrop-blur-sm">
              Lihat Jadwal Sholat
            </button>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-yellow-400 opacity-20 rounded-full blur-xl"></div>
      </div>

      {/* Filter Level & Informasi Rutin */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Pengumuman Level */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              Informasi Sekolah
            </h3>

            {/* Level Selector */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
              {["7", "8", "9"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl as AnnouncementLevel)}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
                    selectedLevel === lvl
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-slate-500 hover:text-orange-500"
                  }`}
                >
                  Level {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {announcements[selectedLevel].map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex gap-4"
              >
                <div className="shrink-0 flex flex-col items-center justify-center w-14 h-14 bg-orange-50 rounded-lg text-orange-600 border border-orange-100">
                  <Calendar className="w-6 h-6 mb-1" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      • {item.date}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
            {announcements[selectedLevel].length === 0 && (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">
                  Belum ada informasi baru untuk Level {selectedLevel}.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Jadwal Hari Ini & Quote */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              Agenda Hari Ini
            </h4>
            <ul className="space-y-4 relative border-l-2 border-slate-100 ml-2">
              <li className="ml-6 relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-white"></div>
                <p className="text-xs font-bold text-slate-400">
                  07.00 - 07.30
                </p>
                <p className="font-bold text-slate-800 text-sm">
                  Dhuha & Tilawah Pagi
                </p>
              </li>
              <li className="ml-6 relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-slate-300 border-2 border-white"></div>
                <p className="text-xs font-bold text-slate-400">
                  07.30 - 09.00
                </p>
                <p className="font-bold text-slate-800 text-sm">
                  Matematika (Pak Budi)
                </p>
              </li>
              <li className="ml-6 relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-slate-300 border-2 border-white"></div>
                <p className="text-xs font-bold text-slate-400">
                  09.30 - 11.00
                </p>
                <p className="font-bold text-slate-800 text-sm">
                  Bahasa Inggris (Mr. John)
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
            <Star className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <p className="text-sm font-medium text-emerald-800 italic">
              Barangsiapa yang menempuh jalan untuk menuntut ilmu, maka Allah
              akan mudahkan baginya jalan menuju Surga
            </p>
            <p className="text-xs font-bold text-emerald-600 mt-2">
              (HR. Muslim)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
