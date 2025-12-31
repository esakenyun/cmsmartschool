"use client";

import { ChevronRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function MataPelajaranSiswaContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const subjects = [
    {
      id: "ipa",
      name: "IPA",
      teacher: "Ust. Irvan",
      icon: "🧬",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      id: "ips",
      name: "IPS",
      teacher: "Bu Rina",
      icon: "🌍",
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: "mtk",
      name: "Matematika",
      teacher: "Pak Budi",
      icon: "📐",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "ind",
      name: "B. Indonesia",
      teacher: "Bu Siti",
      icon: "🇮🇩",
      color: "bg-red-100 text-red-700",
    },
    {
      id: "eng",
      name: "English",
      teacher: "Mr. John",
      icon: "🇬🇧",
      color: "bg-sky-100 text-sky-700",
    },
    {
      id: "tik",
      name: "TIK / Komputer",
      teacher: "Pak Andi",
      icon: "💻",
      color: "bg-slate-100 text-slate-700",
    },
    {
      id: "pai",
      name: "PAI & BP",
      teacher: "Ust. Ahmad",
      icon: "🕌",
      color: "bg-green-100 text-green-700",
    },
    {
      id: "sirah",
      name: "Sirah Nabawiyah",
      teacher: "Ust. Fulan",
      icon: "📜",
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: "quran",
      name: "Quranic Studies",
      teacher: "Syeikh Ali",
      icon: "📖",
      color: "bg-teal-100 text-teal-700",
    },
    {
      id: "art",
      name: "Art / SBK",
      teacher: "Bu Dewi",
      icon: "🎨",
      color: "bg-pink-100 text-pink-700",
    },
    {
      id: "pjok",
      name: "PJOK",
      teacher: "Pak Dedi",
      icon: "⚽",
      color: "bg-lime-100 text-lime-700",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-10 w-64 rounded-xl hidden md:block" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between">
        <p className="text-slate-500">
          Pilih mata pelajaran untuk mengakses materi, tugas, dan nilai.
        </p>
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari Mata Pelajaran..."
            className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none w-64"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-left flex flex-col justify-between h-40 relative overflow-hidden z-0"
          >
            <div
              className={`absolute top-0 right-0 p-4 rounded-bl-3xl ${subject.color} opacity-20 group-hover:opacity-30 transition-opacity w-20 h-20 flex items-start justify-end text-3xl`}
            >
              {subject.icon}
            </div>

            <div
              className={`w-12 h-12 rounded-xl ${subject.color} flex items-center justify-center text-xl shadow-sm mb-3 z-10`}
            >
              {subject.icon}
            </div>

            <div className="z-10">
              <h4 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-orange-600 transition-colors">
                {subject.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1">{subject.teacher}</p>
            </div>

            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
              <div className="bg-orange-500 text-white p-1.5 rounded-full shadow-md">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
