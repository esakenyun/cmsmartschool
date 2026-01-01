import { DashboardStats } from "./types/dashboard-types";
import { COLORS } from "./utils/utils";
import type { EChartsOption } from "echarts";

export const getAttendanceOption = (stats: DashboardStats): EChartsOption => {
  return {
    tooltip: {
      trigger: "axis" as const,
      axisPointer: { type: "shadow" as const },
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
        type: "bar" as const,
        stack: "total",
        data: stats.dailyTrend.map((d) => d.onTime),
        itemStyle: { color: "#10b981", borderRadius: [0, 0, 0, 0] },
      },
      {
        name: "Terlambat",
        type: "bar" as const,
        stack: "total",
        data: stats.dailyTrend.map((d) => d.late),
        itemStyle: { color: "#f59e0b", borderRadius: [4, 4, 0, 0] },
      },
    ],
  };
};

export const getJournalOption = (stats: DashboardStats): EChartsOption => {
  return {
    tooltip: {
      trigger: "item" as const,
    },
    legend: {
      bottom: "0%",
      left: "center",
    },
    series: [
      {
        name: "Status Jurnal",
        type: "pie" as const,
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
};

export const getMutabaahOption = (stats: DashboardStats): EChartsOption => {
  return {
    tooltip: {
      trigger: "axis" as const,
      axisPointer: { type: "shadow" as const },
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
        type: "bar" as const,
        data: stats.mutabaahActivities.map((m) => m.value),
        itemStyle: {
          color: "#6366f1", // Indigo
          borderRadius: [0, 4, 4, 0],
        },
        barWidth: "40%",
      },
    ],
  };
};

export const getDetailPresensiOption = (
  onTime: number,
  late: number = 0
): EChartsOption => {
  return {
    tooltip: { trigger: "item" as const },
    legend: {
      bottom: "0%",
      left: "center",
      icon: "circle",
      itemGap: 20,
      textStyle: { color: "#64748b" },
    },
    series: [
      {
        name: "Presensi",
        type: "pie" as const,
        radius: ["65%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { show: false, position: "center" },
        emphasis: { label: { show: true, fontSize: 16, fontWeight: "bold" } },
        data: [
          { value: onTime, name: "Hadir", itemStyle: { color: "#10b981" } }, // Green
          { value: late, name: "Tidak Hadir", itemStyle: { color: "#ef4444" } }, // Red
        ],
      },
    ],
  };
};

export const getDetailMutabaahOption = (achieved: number): EChartsOption => {
  const remaining = Math.max(0, 100 - achieved);
  return {
    tooltip: { trigger: "item" as const },
    legend: {
      bottom: "0%",
      left: "center",
      icon: "circle",
      itemGap: 20,
      textStyle: { color: "#64748b" },
    },
    series: [
      {
        name: "Mutabaah",
        type: "pie" as const,
        radius: ["65%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { show: false, position: "center" },
        emphasis: { label: { show: true, fontSize: 16, fontWeight: "bold" } },
        data: [
          {
            value: achieved,
            name: "Tercapai",
            itemStyle: { color: "#8b5cf6" },
          }, // Violet
          { value: remaining, name: "Belum", itemStyle: { color: "#e2e8f0" } }, // Slate 200
        ],
      },
    ],
  };
};

export const getDetailJournalOption = (
  complete: number,
  incomplete: number,
  missing: number
): EChartsOption => {
  // Map "Lengkap" + "Tidak Lengkap" -> "Terisi" for the simplified view
  const terisi = complete + incomplete;

  return {
    tooltip: { trigger: "item" as const },
    legend: {
      bottom: "0%",
      left: "center",
      icon: "circle",
      itemGap: 20,
      textStyle: { color: "#64748b" },
    },
    series: [
      {
        name: "Jurnal",
        type: "pie" as const,
        radius: ["65%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { show: false, position: "center" },
        emphasis: { label: { show: true, fontSize: 16, fontWeight: "bold" } },
        data: [
          { value: terisi, name: "Terisi", itemStyle: { color: "#3b82f6" } }, // Blue
          { value: missing, name: "Kosong", itemStyle: { color: "#cbd5e1" } }, // Slate 300
        ],
      },
    ],
  };
};
