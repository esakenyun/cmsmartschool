"use client";

import { useState, useEffect } from "react";
// 1. Import ECharts wrapper
import ReactECharts from "echarts-for-react";
import { BookOpen, CalendarCheck, Award, Clock, Briefcase } from "lucide-react";
import { StatCardSkeleton } from "@/components/skeletons/card-skeleton";
import {
  ChartSkeleton,
  DonutChartSkeleton,
} from "@/components/skeletons/chart-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function GuruDashboardContent() {
  const [month, setMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  ); // YYYY-MM
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // --- Dummy Data ---

  // 1. Administration Progress
  const adminData = [
    { name: "Perencanaan", completed: 85, target: 100 },
    { name: "Pelaksanaan", completed: 70, target: 100 },
    { name: "Evaluasi", completed: 60, target: 100 },
  ];

  // 2. Performance Trend (Last 6 Months)
  const performanceTrend = [
    { month: "Juli", skor: 88, kehadiran: 95 },
    { month: "Agust", skor: 90, kehadiran: 98 },
    { month: "Sept", skor: 92, kehadiran: 97 },
    { month: "Okt", skor: 85, kehadiran: 94 },
    { month: "Nov", skor: 94, kehadiran: 100 },
    { month: "Des", skor: 96, kehadiran: 100 },
  ];

  // 3. Work Journal Breakdown
  const journalData = [
    { name: "Mengajar", value: 24, color: "#10b981" }, // Emerald
    { name: "Tugas Tambahan", value: 5, color: "#f59e0b" }, // Amber
    { name: "Pengembangan", value: 2, color: "#6366f1" }, // Indigo
    { name: "Administrasi", value: 4, color: "#ec4899" }, // Pink
  ];

  // --- ECharts Options Configurations ---

  // Option for Line Chart (Performance Trend)
  const lineChartOption = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff",
      borderColor: "#e2e8f0",
      textStyle: { color: "#1e293b" },
    },
    legend: {
      bottom: 0,
      icon: "circle",
      textStyle: { color: "#64748b" },
    },
    grid: {
      top: "10%",
      right: "5%",
      bottom: "15%",
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: performanceTrend.map((item) => item.month),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#64748b" },
    },
    yAxis: {
      type: "value",
      max: 100, // Fixed scale like the original
      splitLine: { lineStyle: { color: "#f1f5f9" } },
      axisLabel: { show: false }, // Hide numbers on Y axis to match original clean look
    },
    series: [
      {
        name: "Skor Kinerja",
        type: "line",
        data: performanceTrend.map((item) => item.skor),
        smooth: true,
        symbolSize: 8,
        itemStyle: { color: "#3b82f6" },
        lineStyle: { width: 3 },
      },
      {
        name: "Presensi %",
        type: "line",
        data: performanceTrend.map((item) => item.kehadiran),
        smooth: true,
        symbolSize: 8,
        itemStyle: { color: "#10b981" },
        lineStyle: { width: 3 },
      },
    ],
  };

  // Option for Bar Chart (Administration Progress)
  const barChartOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    grid: {
      top: 0,
      right: "5%",
      bottom: 0,
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      max: 100,
      show: false, // Hide X axis lines
    },
    yAxis: {
      type: "category",
      data: adminData.map((item) => item.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#64748b", fontWeight: 500 },
    },
    series: [
      {
        name: "Selesai %",
        type: "bar",
        data: adminData.map((item) => item.completed),
        barWidth: "40%",
        itemStyle: {
          color: "#6366f1", // Indigo
          borderRadius: [0, 4, 4, 0], // Rounded corners on the right
        },
        label: {
          show: true,
          position: "right",
          formatter: "{c}%",
          color: "#64748b",
        },
      },
    ],
  };

  // Option for Pie/Donut Chart (Work Journal)
  const pieChartOption = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Aktivitas",
        type: "pie",
        radius: ["60%", "85%"], // Inner and Outer radius for Donut shape
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        data: journalData.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.color },
        })),
      },
    ],
  };

  // --- Summary Cards Data ---
  const cards = [
    {
      title: "Skor Kinerja",
      value: "92.5",
      label: "Sangat Baik",
      icon: Award,
      color: "bg-blue-50 text-blue-600",
      trend: "+2.5% dari bulan lalu",
    },
    {
      title: "Presensi",
      value: "98%",
      label: "Hadir: 24 Hari",
      icon: CalendarCheck,
      color: "bg-emerald-50 text-emerald-600",
      trend: "Stabil",
    },
    {
      title: "Jam Efektif",
      value: "35 Jam",
      label: "Minggu Ini",
      icon: Clock,
      color: "bg-purple-50 text-purple-600",
      trend: "Target: 40 Jam",
    },
    {
      title: "Administrasi",
      value: "72%",
      label: "Kelengkapan",
      icon: BookOpen,
      color: "bg-orange-50 text-orange-600",
      trend: "Perlu ditingkatkan",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartSkeleton />
          </div>
          <ChartSkeleton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DonutChartSkeleton />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Month Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Overview Kinerja</h2>
          <p className="text-sm text-slate-500">
            Ringkasan aktivitas dan performa Anda.
          </p>
        </div>
        <div>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="pl-4 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
      </div>

      {/* Header Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                {card.trend}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {card.value}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Performance Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">
                Tren Kinerja & Kehadiran
              </h3>
              <p className="text-sm text-slate-500">Periode: {month}</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ReactECharts
              option={lineChartOption}
              style={{ height: "100%", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>

        {/* Administration Progress Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-2">
            Status Administrasi
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Progres kelengkapan dokumen
          </p>
          <div className="h-80 w-full">
            <ReactECharts
              option={barChartOption}
              style={{ height: "100%", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Work Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="h-64 w-full md:w-1/2">
            <ReactECharts
              option={pieChartOption}
              style={{ height: "100%", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
          <div className="w-full md:w-1/2 space-y-3">
            <h3 className="font-bold text-slate-800">
              Distribusi Jurnal Kerja
            </h3>
            <div className="space-y-2">
              {journalData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">
                    {item.value} Jam
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2 mt-2 border-t border-slate-100">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-500">Total</span>
                <span className="text-slate-800">35 Jam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions / Notifications */}
        <div className="bg-linear-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Jadwal Hari Ini</h3>
                <p className="text-indigo-100 text-sm">
                  Senin, 28 Januari 2024
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center backdrop-blur-sm">
                <span className="font-medium text-sm">07.00 - 08.20</span>
                <span className="font-bold text-sm">IPA - Kelas 7A</span>
              </div>
              <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center backdrop-blur-sm">
                <span className="font-medium text-sm">08.20 - 09.40</span>
                <span className="font-bold text-sm">IPA - Kelas 7B</span>
              </div>
              <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center backdrop-blur-sm border-l-4 border-yellow-400">
                <span className="font-medium text-sm">13.00 - 14.20</span>
                <span className="font-bold text-sm">Rapat Guru</span>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors">
            Lihat Jadwal Lengkap
          </button>
        </div>
      </div>
    </div>
  );
}
