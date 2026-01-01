"use client";

import { useState, useEffect, useMemo } from "react";
// 1. Import ECharts wrapper
import ReactECharts from "echarts-for-react";
import { BookOpen, CalendarCheck, Award, Clock } from "lucide-react";
import { StatCardSkeleton } from "@/components/skeletons/card-skeleton";
import { ChartSkeleton } from "@/components/skeletons/chart-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { getTeacherDashboardData } from "@/features/teachers/data/dashboard-dummy";
import {
  getLineChartOption,
  getBarChartOption,
} from "@/features/teachers/chart-options";

export default function GuruDashboardContent() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(2025, 2, 1), // Default March 2025 as per previous code, or use current date
    endDate: new Date(2025, 2, 31),
    key: "selection",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [dateRange]); // Reload when range changes to simulate fetch

  const dashboardData = useMemo(() => {
    if (!dateRange.startDate || !dateRange.endDate) return null;
    return getTeacherDashboardData(dateRange.startDate, dateRange.endDate);
  }, [dateRange]);

  // --- ECharts Options Configurations ---

  // Option for Line Chart (Performance Trend)
  const lineChartOption = useMemo(() => {
    if (!dashboardData) return {};
    return getLineChartOption(dashboardData);
  }, [dashboardData]);

  // Option for Bar Chart (Administration Progress)
  const barChartOption = useMemo(() => {
    if (!dashboardData) return {};
    return getBarChartOption(dashboardData);
  }, [dashboardData]);

  // --- Summary Cards Data ---
  const cards = useMemo(() => {
    if (!dashboardData) return [];

    // Calculate total days in range to show "Hadir: X / Y Hari"
    // Approximation or exact days in range
    const totalDays =
      Math.ceil(
        (dateRange.endDate.getTime() - dateRange.startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    return [
      {
        title: "Skor Kinerja",
        value: dashboardData.avgPerformanceScore.toString(),
        label: dashboardData.avgPerformanceScore >= 90 ? "Sangat Baik" : "Baik",
        icon: Award,
        color: "bg-blue-50 text-blue-600",
        trend: "Rata-rata periode ini",
      },
      {
        title: "Presensi",
        value: `${dashboardData.totalWorkDays} Hari`,
        label: `Dari total ${totalDays} hari`,
        icon: CalendarCheck,
        color: "bg-emerald-50 text-emerald-600",
        trend: "Total Hari Kerja",
      },
      {
        title: "Jam Efektif",
        value: `${dashboardData.totalWorkHours} Jam`,
        label: `Rata-rata ${(
          dashboardData.totalWorkHours / (dashboardData.totalWorkDays || 1)
        ).toFixed(1)} jam/hari`,
        icon: Clock,
        color: "bg-purple-50 text-purple-600",
        trend: "Total Jam Kerja",
      },
      {
        title: "Administrasi",
        value: `${Math.round(
          (dashboardData.avgPlanningScore +
            dashboardData.avgImplementationScore +
            dashboardData.avgEvaluationScore) /
            3
        )}%`,
        label: `${Math.round(
          ((dashboardData.avgPlanningScore +
            dashboardData.avgImplementationScore +
            dashboardData.avgEvaluationScore) /
            3 /
            100) *
            30
        )} / 30 Dokumen`,
        icon: BookOpen,
        color: "bg-orange-50 text-orange-600",
        trend: "Gabungan 3 Komponen",
      },
    ];
  }, [dashboardData, dateRange]);

  if (loading || !dashboardData) {
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
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Month Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Overview Kinerja</h2>
          <p className="text-sm text-slate-500">
            Ringkasan aktivitas dan performa Anda.
          </p>
        </div>
        <div>
          <div>
            <DateRangePicker
              setDate={setDateRange}
              date={dateRange}
              align="end"
            />
          </div>
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
                Tren Kinerja & Jam Kerja
              </h3>
              <p className="text-sm text-slate-500">
                Periode:{" "}
                {dateRange.startDate?.toDateString() +
                  " - " +
                  dateRange.endDate?.toDateString()}
              </p>
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
    </div>
  );
}
