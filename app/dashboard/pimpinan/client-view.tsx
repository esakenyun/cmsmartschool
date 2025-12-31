"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  BarChart3,
  Building2,
  ChevronDown,
  Monitor,
  School,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  StatCardSkeleton,
  CardSkeleton,
} from "@/components/skeletons/card-skeleton";
import { ChartSkeleton } from "@/components/skeletons/chart-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

// --- DUMMY DATA ---
interface UnitStats {
  unitId: string;
  unitName: string;
  activeStudents: number;
  hybridParticipation: number;
  hybridLabel: string;
  assetValue: string;
  assetValueRaw: number; // For easier aggregation if needed later
  studentGrowth: number[];
  financeStatus: "surplus" | "deficit";
  financeAmount: string;
  ppdb: {
    registered: number;
    quota: number;
  };
}

const DUMMY_DATA: UnitStats[] = [
  {
    unitId: "tk",
    unitName: "TK Islam",
    activeStudents: 85,
    hybridParticipation: 40,
    hybridLabel: "Video Pembelajaran",
    assetValue: "Rp 850 Juta",
    assetValueRaw: 850,
    studentGrowth: [70, 75, 80, 82, 85],
    financeStatus: "surplus",
    financeAmount: "+ Rp 5.000.000",
    ppdb: { registered: 45, quota: 60 },
  },
  {
    unitId: "sd",
    unitName: "SD Islam",
    activeStudents: 450,
    hybridParticipation: 85,
    hybridLabel: "LMS & Zoom",
    assetValue: "Rp 3.2 Milyar",
    assetValueRaw: 3200,
    studentGrowth: [400, 410, 425, 440, 450],
    financeStatus: "surplus",
    financeAmount: "+ Rp 25.000.000",
    ppdb: { registered: 110, quota: 120 },
  },
  {
    unitId: "smp",
    unitName: "SMP Islam",
    activeStudents: 220,
    hybridParticipation: 90,
    hybridLabel: "Full Hybrid",
    assetValue: "Rp 2.1 Milyar",
    assetValueRaw: 2100,
    studentGrowth: [180, 190, 200, 210, 220],
    financeStatus: "deficit",
    financeAmount: "- Rp 2.500.000",
    ppdb: { registered: 75, quota: 80 },
  },
];

export default function DashboardPimpinanContent() {
  const searchParams = useSearchParams();
  const selectedUnit = searchParams.get("unit") || "all";
  const isAll = selectedUnit === "all";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Calculate Stats based on selection
  let studentCount: number;
  let hybridPercent: number;
  let hybridLabel: string;
  let assetValue: string;
  let growthChart: number[];
  let ppdbPercent: number;

  if (isAll) {
    // Aggregate ALL units
    studentCount = DUMMY_DATA.reduce(
      (acc, curr) => acc + curr.activeStudents,
      0
    );

    // Weighted Average for Hybrid %
    const totalHybridScore = DUMMY_DATA.reduce(
      (acc, curr) => acc + curr.hybridParticipation * curr.activeStudents,
      0
    );
    hybridPercent = Math.round(totalHybridScore / studentCount);
    hybridLabel = "Rata-rata Partisipasi";

    // Sum Assets (Simple String approximation for display)
    assetValue = "Rp 6.15 Milyar"; // Manual sum for simplicity or logic below

    // Sum Growth Arrays
    growthChart = [0, 0, 0, 0, 0];
    DUMMY_DATA.forEach((unit) => {
      unit.studentGrowth.forEach((val, idx) => {
        growthChart[idx] += val;
      });
    });

    // Aggregate PPDB
    const totalRegistered = DUMMY_DATA.reduce(
      (acc, curr) => acc + curr.ppdb.registered,
      0
    );
    const totalQuota = DUMMY_DATA.reduce(
      (acc, curr) => acc + curr.ppdb.quota,
      0
    );
    ppdbPercent = Math.round((totalRegistered / totalQuota) * 100);
  } else {
    // Specific Unit Data
    const data = DUMMY_DATA.find((u) => u.unitId === selectedUnit);

    if (!data) {
      // Fallback if data not found
      return <div>Data unit tidak ditemukan</div>;
    }

    studentCount = data.activeStudents;
    hybridPercent = data.hybridParticipation;
    hybridLabel = data.hybridLabel;
    assetValue = data.assetValue;
    growthChart = data.studentGrowth;
    ppdbPercent = Math.round((data.ppdb.registered / data.ppdb.quota) * 100);
  }

  // Transform data for Recharts
  const startYear = 2020;
  const chartData = growthChart.map((val, index) => ({
    year: (startYear + index).toString(),
    students: val,
  }));

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
        <header className="flex justify-between items-center mb-6">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-48 rounded-lg" />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <div className="space-y-4">
            <Skeleton className="h-8 w-48 mb-4" />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Students */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Siswa Aktif
              </p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {studentCount}
              </h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+5% dari tahun lalu</span>
          </div>
        </div>

        {/* PPDB Target */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Target PPDB</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {ppdbPercent}%
              </h3>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="bg-emerald-500 h-1.5 rounded-full"
              style={{ width: `${ppdbPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Hybrid Learning */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Partisipasi Hybrid
              </p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {hybridPercent}%
              </h3>
            </div>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Monitor className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-500">
            <span>{hybridLabel}</span>
          </div>
        </div>

        {/* Assets */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Valuasi Aset</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {assetValue}
              </h3>
            </div>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-orange-600">
            <AlertCircle className="w-3 h-3 mr-1" />
            <span>3 aset butuh maintenance</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-4">
            Grafik Pertumbuhan Siswa (5 Tahun)
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="students"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-4">
            Status Keuangan Unit
          </h4>
          <div className="space-y-4">
            {DUMMY_DATA.map(
              (unit, idx) =>
                (isAll || unit.unitId === selectedUnit) && (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs uppercase">
                        {unit.unitName.substring(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {unit.unitName}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        unit.financeStatus === "deficit"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {unit.financeAmount}
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
