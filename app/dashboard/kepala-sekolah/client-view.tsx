// "use client";

// import { useState, useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { Calendar, User, CheckCircle2, Clock, BookOpen } from "lucide-react";

// interface DashboardStats {
//   totalLogs: number;
//   avgMutabaah: number;
//   journalStats: {
//     complete: number;
//     incomplete: number;
//     missing: number;
//   };
//   dailyTrend: {
//     date: string;
//     onTime: number;
//     late: number;
//   }[];
//   mutabaahActivities: {
//     name: string;
//     value: number;
//   }[];
// }

// interface Teacher {
//   id: string;
//   name: string;
// }

// const TEACHERS: Teacher[] = [
//   { id: "t1", name: "Ahmad Fauzi" },
//   { id: "t2", name: "Siti Aisyah" },
//   { id: "t3", name: "Muhammad Rizki" },
//   { id: "t4", name: "Dewi Sartika" },
//   { id: "t5", name: "Budi Santoso" },
// ];

// const COLORS = ["#10b981", "#f59e0b", "#ef4444"]; // Green, Amber, Red

// // Helper to generate consistent random stats based on inputs
// const getTeacherStats = (
//   teacherId: string,
//   startDate: string
// ): DashboardStats => {
//   // Better pseudo-random seed generator
//   const inputString = teacherId + startDate;
//   let hash = 0;
//   for (let i = 0; i < inputString.length; i++) {
//     const char = inputString.charCodeAt(i);
//     hash = (hash << 5) - hash + char;
//     hash = hash & hash; // Convert to 32bit integer
//   }
//   const seed = Math.abs(hash);

//   const isAll = teacherId === "all";

//   // Base multipliers
//   const volumeMultiplier = isAll ? 5 : 1;

//   // Use distinct mods for different metrics to ensure they don't all look correlated
//   const logVariance = (seed % 40) - 20;
//   const mutabaahVariance = seed % 15;

//   // 1. Total Logs
//   const totalLogs = Math.max(
//     10,
//     Math.floor((120 + logVariance) * volumeMultiplier)
//   );

//   // 2. Journal Stats (vary the percentages)
//   const completeRate = 0.7 + (seed % 20) / 100; // 0.70 - 0.90
//   const complete = Math.floor(totalLogs * completeRate);
//   const incomplete = Math.floor(totalLogs * ((1 - completeRate) / 2));
//   const missing = totalLogs - complete - incomplete;

//   // 3. Mutabaah Avg
//   const avgMutabaah = Math.min(100, Math.max(60, 85 + mutabaahVariance - 7));

//   // 4. Daily Trend
//   const dailyTrend = Array.from({ length: 7 }).map((_, i) => {
//     // Unique pseudo-random for each day
//     const daySeed = seed + i * 123;
//     const dayVariance = daySeed % 5;
//     return {
//       date: `${i + 1}`,
//       onTime: Math.floor((8 + dayVariance) * volumeMultiplier),
//       late: Math.floor((1 + (daySeed % 3)) * volumeMultiplier),
//     };
//   });

//   // 5. Mutabaah Activities
//   const mutabaahActivities = [
//     {
//       name: "Sholat",
//       value: Math.floor((300 + (seed % 50)) * volumeMultiplier),
//     },
//     {
//       name: "Tilawah",
//       value: Math.floor((250 + ((seed * 2) % 50)) * volumeMultiplier),
//     },
//     {
//       name: "Dzikir",
//       value: Math.floor((200 + ((seed * 3) % 50)) * volumeMultiplier),
//     },
//     {
//       name: "Sedekah",
//       value: Math.floor((150 + ((seed * 4) % 50)) * volumeMultiplier),
//     },
//   ];

//   return {
//     totalLogs,
//     avgMutabaah,
//     journalStats: {
//       complete,
//       incomplete,
//       missing,
//     },
//     dailyTrend,
//     mutabaahActivities,
//   };
// };

// // --- Component ---

// export default function DashboardKepalaSekolahContent() {
//   // Filters State
//   const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
//   const [month, setMonth] = useState<string>(
//     new Date().toISOString().slice(0, 7)
//   ); // YYYY-MM

//   // Fetch Data based on filters
//   const stats = useMemo(() => {
//     // Determine start and end date of selected month
//     const date = new Date(month);
//     const year = date.getFullYear();
//     const m = date.getMonth();
//     const startDate = new Date(year, m, 1).toISOString().split("T")[0];

//     return getTeacherStats(selectedTeacher, startDate);
//   }, [selectedTeacher, month]);

//   // Chart Data Preparation
//   const journalData = [
//     { name: "Lengkap", value: stats.journalStats.complete },
//     { name: "Tidak Lengkap", value: stats.journalStats.incomplete },
//     { name: "Kosong", value: stats.journalStats.missing },
//   ];

//   return (
//     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
//       {/* Header & Filters */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
//         <div>
//           <p className="text-2xl font-bold text-slate-800">
//             Laporan Kinerja Guru & Staff
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//           {/* Teacher Filter */}
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <select
//               value={selectedTeacher}
//               onChange={(e) => setSelectedTeacher(e.target.value)}
//               className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-48 appearance-none bg-white"
//             >
//               <option value="all">Semua Guru</option>
//               {TEACHERS.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Month Filter */}
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               type="month"
//               value={month}
//               onChange={(e) => setMonth(e.target.value)}
//               className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
//           <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
//             <Clock className="w-6 h-6" />
//           </div>
//           <div>
//             <p className="text-sm font-medium text-slate-500">
//               Total Log Aktif
//             </p>
//             <h3 className="text-2xl font-bold text-slate-800">
//               {stats.totalLogs}
//             </h3>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
//           <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
//             <BookOpen className="w-6 h-6" />
//           </div>
//           <div>
//             <p className="text-sm font-medium text-slate-500">Jurnal Lengkap</p>
//             <h3 className="text-2xl font-bold text-slate-800">
//               {stats.journalStats.complete}
//             </h3>
//             <span className="text-xs text-green-600">
//               {stats.totalLogs > 0
//                 ? Math.round(
//                     (stats.journalStats.complete / stats.totalLogs) * 100
//                   )
//                 : 0}
//               % Total
//             </span>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
//           <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
//             <CheckCircle2 className="w-6 h-6" />
//           </div>
//           <div>
//             <p className="text-sm font-medium text-slate-500">
//               Rata-rata Mutabaah
//             </p>
//             <h3 className="text-2xl font-bold text-slate-800">
//               {stats.avgMutabaah}/100
//             </h3>
//           </div>
//         </div>
//       </div>

//       {/* Main Charts Area */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Attendance Trend Chart */}
//         <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
//           <h3 className="font-bold text-slate-800 mb-6">
//             Grafik Kehadiran & Ketepatan Waktu
//           </h3>
//           <div className="h-72 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={stats.dailyTrend}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis dataKey="date" tick={{ fontSize: 10 }} />
//                 <YAxis />
//                 <Tooltip
//                   contentStyle={{
//                     borderRadius: "8px",
//                     border: "none",
//                     boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
//                   }}
//                   isAnimationActive={false}
//                 />
//                 <Legend />
//                 <Bar
//                   dataKey="onTime"
//                   name="Tepat Waktu"
//                   stackId="a"
//                   fill="#10b981"
//                   radius={[0, 0, 0, 0]}
//                 />
//                 <Bar
//                   dataKey="late"
//                   name="Terlambat"
//                   stackId="a"
//                   fill="#f59e0b"
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Journal Completion Pie Chart */}
//         <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
//           <h3 className="font-bold text-slate-800 mb-6">
//             Kelengkapan Jurnal Mengajar
//           </h3>
//           <div className="h-72 w-full flex items-center justify-center">
//             <ResponsiveContainer width="100%" height="100%" debounce={300}>
//               <PieChart>
//                 <Pie
//                   data={journalData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   paddingAngle={5}
//                   dataKey="value"
//                 >
//                   {journalData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip isAnimationActive={false} />
//                 <Legend verticalAlign="bottom" height={36} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Mutabaah Activity Bar Chart */}
//         <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm lg:col-span-2">
//           <h3 className="font-bold text-slate-800 mb-6">
//             Aktivitas Mutabaah Terbanyak
//           </h3>
//           <div className="h-64 w-full">
//             <ResponsiveContainer width="100%" height="100%" debounce={300}>
//               <BarChart
//                 data={stats.mutabaahActivities}
//                 layout="vertical"
//                 margin={{ left: 20 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" horizontal={false} />
//                 <XAxis type="number" />
//                 <YAxis type="category" dataKey="name" width={100} />
//                 <Tooltip
//                   cursor={{ fill: "transparent" }}
//                   contentStyle={{
//                     borderRadius: "8px",
//                     border: "none",
//                     boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
//                   }}
//                   isAnimationActive={false}
//                 />
//                 <Bar
//                   dataKey="value"
//                   name="Jumlah Aktivitas"
//                   fill="#6366f1"
//                   radius={[0, 4, 4, 0]}
//                   barSize={20}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useMemo, useEffect } from "react";
// Import ECharts for React
import ReactECharts from "echarts-for-react";
import { Calendar, User, CheckCircle2, Clock, BookOpen } from "lucide-react";
import { getTeachers } from "@/services/teacher-service";
import { Teacher } from "@/lib/data-teacher";
import { StatCardSkeleton } from "@/components/skeletons/card-skeleton";
import {
  ChartSkeleton,
  DonutChartSkeleton,
} from "@/components/skeletons/chart-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStats {
  totalLogs: number;
  avgMutabaah: number;
  journalStats: {
    complete: number;
    incomplete: number;
    missing: number;
  };
  dailyTrend: {
    date: string;
    onTime: number;
    late: number;
  }[];
  mutabaahActivities: {
    name: string;
    value: number;
  }[];
}

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]; // Green, Amber, Red

// Helper to generate consistent random stats based on inputs
const getTeacherStats = (
  teacherId: string,
  startDate: string
): DashboardStats => {
  const inputString = teacherId + startDate;
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const seed = Math.abs(hash);

  const isAll = teacherId === "all";
  const volumeMultiplier = isAll ? 5 : 1;
  const logVariance = (seed % 40) - 20;
  const mutabaahVariance = seed % 15;

  const totalLogs = Math.max(
    10,
    Math.floor((120 + logVariance) * volumeMultiplier)
  );

  const completeRate = 0.7 + (seed % 20) / 100;
  const complete = Math.floor(totalLogs * completeRate);
  const incomplete = Math.floor(totalLogs * ((1 - completeRate) / 2));
  const missing = totalLogs - complete - incomplete;

  const avgMutabaah = Math.min(100, Math.max(60, 85 + mutabaahVariance - 7));

  const dailyTrend = Array.from({ length: 7 }).map((_, i) => {
    const daySeed = seed + i * 123;
    const dayVariance = daySeed % 5;
    return {
      date: `Day ${i + 1}`,
      onTime: Math.floor((8 + dayVariance) * volumeMultiplier),
      late: Math.floor((1 + (daySeed % 3)) * volumeMultiplier),
    };
  });

  const mutabaahActivities = [
    {
      name: "Sholat",
      value: Math.floor((300 + (seed % 50)) * volumeMultiplier),
    },
    {
      name: "Tilawah",
      value: Math.floor((250 + ((seed * 2) % 50)) * volumeMultiplier),
    },
    {
      name: "Dzikir",
      value: Math.floor((200 + ((seed * 3) % 50)) * volumeMultiplier),
    },
    {
      name: "Sedekah",
      value: Math.floor((150 + ((seed * 4) % 50)) * volumeMultiplier),
    },
  ];

  return {
    totalLogs,
    avgMutabaah,
    journalStats: {
      complete,
      incomplete,
      missing,
    },
    dailyTrend,
    mutabaahActivities,
  };
};

export default function DashboardKepalaSekolahContent() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [month, setMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachers().then(setTeachers);
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const date = new Date(month);
    const year = date.getFullYear();
    const m = date.getMonth();
    const startDate = new Date(year, m, 1).toISOString().split("T")[0];

    return getTeacherStats(selectedTeacher, startDate);
  }, [selectedTeacher, month]);

  // --- ECharts Configurations ---

  // 1. Attendance Stacked Bar Chart Option
  const attendanceOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      data: ["Tepat Waktu", "Terlambat"],
      bottom: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: stats.dailyTrend.map((d) => d.date),
      axisLine: { lineStyle: { color: "#cbd5e1" } },
      axisLabel: { color: "#64748b" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisLabel: { color: "#64748b" },
      splitLine: { lineStyle: { color: "#f1f5f9" } },
    },
    series: [
      {
        name: "Tepat Waktu",
        type: "bar",
        stack: "total",
        data: stats.dailyTrend.map((d) => d.onTime),
        itemStyle: { color: "#10b981", borderRadius: [0, 0, 0, 0] },
      },
      {
        name: "Terlambat",
        type: "bar",
        stack: "total",
        data: stats.dailyTrend.map((d) => d.late),
        itemStyle: { color: "#f59e0b", borderRadius: [4, 4, 0, 0] },
      },
    ],
  };

  // 2. Journal Donut Chart Option
  const journalOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "0%",
      left: "center",
    },
    series: [
      {
        name: "Status Jurnal",
        type: "pie",
        radius: ["50%", "70%"], // Donut shape
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        data: [
          {
            value: stats.journalStats.complete,
            name: "Lengkap",
            itemStyle: { color: COLORS[0] },
          },
          {
            value: stats.journalStats.incomplete,
            name: "Tidak Lengkap",
            itemStyle: { color: COLORS[1] },
          },
          {
            value: stats.journalStats.missing,
            name: "Kosong",
            itemStyle: { color: COLORS[2] },
          },
        ],
      },
    ],
  };

  // 3. Mutabaah Horizontal Bar Chart Option
  const mutabaahOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      splitLine: { lineStyle: { color: "#f1f5f9" } },
      axisLabel: { color: "#64748b" },
    },
    yAxis: {
      type: "category",
      data: stats.mutabaahActivities.map((m) => m.name),
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: "#64748b", fontWeight: 500 },
    },
    series: [
      {
        name: "Jumlah Aktivitas",
        type: "bar",
        data: stats.mutabaahActivities.map((m) => m.value),
        itemStyle: {
          color: "#6366f1", // Indigo
          borderRadius: [0, 4, 4, 0],
        },
        barWidth: "40%",
      },
    ],
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <DonutChartSkeleton />
          <div className="lg:col-span-2">
            <ChartSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <p className="text-2xl font-bold text-slate-800">
            Laporan Kinerja Guru & Staff
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Teacher Filter */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-48 appearance-none bg-white"
            >
              <option value="all">Semua Guru</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Month Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Log Aktif
            </p>
            <h3 className="text-2xl font-bold text-slate-800">
              {stats.totalLogs}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Jurnal Lengkap</p>
            <h3 className="text-2xl font-bold text-slate-800">
              {stats.journalStats.complete}
            </h3>
            <span className="text-xs text-green-600">
              {stats.totalLogs > 0
                ? Math.round(
                    (stats.journalStats.complete / stats.totalLogs) * 100
                  )
                : 0}
              % Total
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Rata-rata Mutabaah
            </p>
            <h3 className="text-2xl font-bold text-slate-800">
              {stats.avgMutabaah}/100
            </h3>
          </div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">
            Grafik Kehadiran & Ketepatan Waktu
          </h3>
          <div className="w-full">
            <ReactECharts
              option={attendanceOption}
              style={{ height: "300px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>

        {/* Journal Completion Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">
            Kelengkapan Jurnal Mengajar
          </h3>
          <div className="w-full">
            <ReactECharts
              option={journalOption}
              style={{ height: "300px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>

        {/* Mutabaah Activity Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-6">
            Aktivitas Mutabaah Terbanyak
          </h3>
          <div className="w-full">
            <ReactECharts
              option={mutabaahOption}
              style={{ height: "300px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
