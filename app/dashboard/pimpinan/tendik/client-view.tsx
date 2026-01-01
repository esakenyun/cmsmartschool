"use client";

import { Users } from "lucide-react";
import { useState, useEffect } from "react";
import { StatCardSkeleton } from "@/components/skeletons/card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { PrincipalHeader } from "@/features/leader/components/leader-header";

const stats = {
  totalGuru: 120,
  certified: 85,
  honorer: 35,
};
const distributionData = [
  { unit: "TK", s1: 15, s2: 2, s3: 0 },
  { unit: "SD", s1: 45, s2: 5, s3: 1 },
  { unit: "SMP", s1: 30, s2: 8, s3: 0 },
  { unit: "SMA", s1: 25, s2: 12, s3: 2 },
];

export default function PimpinanSDMContent() {
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="flex justify-between items-center mb-6">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-48 rounded-lg" />
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PrincipalHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            label: "Total Guru",
            val: stats.totalGuru,
            sub: `${stats.certified} Pegawai Tetap`,
            color: "bg-indigo-600",
          },
          {
            label: "Guru Honorer",
            val: stats.honorer,
            sub: "Kontrak Tahunan",
            color: "bg-orange-500",
          },
          {
            label: "Rasio Guru:Siswa",
            val: "1:15", // This would ideally come from student count / teacher count
            sub: "Standar Ideal",
            color: "bg-emerald-600",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden"
          >
            <div
              className={`absolute top-0 right-0 p-3 opacity-10 ${card.color} rounded-bl-3xl`}
            >
              <Users className="w-12 h-12 text-white" />
            </div>
            <p className="text-slate-500 font-medium">{card.label}</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">
              {card.val}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-slate-800">
            Distribusi & Kualifikasi Guru per Unit
          </h4>
          <select
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
          >
            <option value="all">Semua Unit</option>
            <option value="tk">TK</option>
            <option value="sd">SD</option>
            <option value="smp">SMP</option>
            <option value="sma">SMA</option>
          </select>
        </div>
        <div className="space-y-4">
          {distributionData.map(
            (
              item: { unit: string; s1: number; s2: number; s3: number },
              idx: number
            ) =>
              (selectedUnit === "all" ||
                selectedUnit === item.unit.toLowerCase()) && (
                <div
                  key={idx}
                  className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0"
                >
                  <div className="w-16 font-bold text-slate-700">
                    {item.unit}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <div className="flex flex-col items-center bg-blue-50 p-2 rounded w-full">
                      <span className="text-xs text-blue-500 font-bold">
                        S1/D4
                      </span>
                      <span className="font-bold text-slate-700">
                        {item.s1}
                      </span>
                    </div>
                    <div className="flex flex-col items-center bg-indigo-50 p-2 rounded w-full">
                      <span className="text-xs text-indigo-500 font-bold">
                        S2/Magister
                      </span>
                      <span className="font-bold text-slate-700">
                        {item.s2}
                      </span>
                    </div>
                    <div className="flex flex-col items-center bg-purple-50 p-2 rounded w-full">
                      <span className="text-xs text-purple-500 font-bold">
                        S3/Doktor
                      </span>
                      <span className="font-bold text-slate-700">
                        {item.s3}
                      </span>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
