"use client";

import { TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { StatCardSkeleton } from "@/components/skeletons/card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { PrincipalHeader } from "@/features/leader/components/leader-header";

const aggregate = {
  totalRegistered: 850,
  totalQuota: 1000,
  totalPercentage: 85,
};

const ppdbStats = [
  {
    unitName: "TK Khalifah",
    percentage: 100,
    registered: 50,
    remaining: 0,
  },
  {
    unitName: "SD Khalifah",
    percentage: 92,
    registered: 350,
    remaining: 30,
  },
  {
    unitName: "SMP Khalifah",
    percentage: 85,
    registered: 250,
    remaining: 45,
  },
  {
    unitName: "SMA Khalifah",
    percentage: 75,
    registered: 200,
    remaining: 75,
  },
];

export default function PimpinanPPDBContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Skeleton className="h-48 w-full rounded-xl mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PrincipalHeader />
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">
            Total Pendaftar Tahun Ajaran 2025/2026
          </h2>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold">
              {aggregate.totalRegistered}
            </span>
            <span className="text-blue-100 mb-2">
              / {aggregate.totalQuota} Target Kuota
            </span>
          </div>
          <div className="w-full bg-white/20 h-3 rounded-full mt-4 backdrop-blur-sm">
            <div
              className="bg-white h-3 rounded-full"
              style={{ width: `${aggregate.totalPercentage}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-blue-100">
            {aggregate.totalPercentage}% Terpenuhi - Pendaftaran ditutup dalam
            14 hari.
          </p>
        </div>
        <TrendingUp className="absolute right-10 top-10 w-40 h-40 text-white opacity-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ppdbStats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-slate-700">{item.unitName}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-bold ${
                  item.percentage > 90
                    ? "bg-pink-100 text-pink-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {item.percentage}%
              </span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs text-slate-500">Terdaftar</span>
                <p className="text-2xl font-bold text-slate-800">
                  {item.registered}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Sisa Kuota</span>
                <p className="text-xl font-bold text-slate-400">
                  {item.remaining}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
