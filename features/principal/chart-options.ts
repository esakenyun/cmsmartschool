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

export const getDetailJournalOption = (breakdown: {
  sesi1: number;
  sesi2: number;
  sesi3: number;
  sesi4: number;
  sesi5: number;
  tambahan: number;
}): EChartsOption => {
  return {
    tooltip: { trigger: "item" as const },
    legend: {
      bottom: "0%",
      left: "center",
      icon: "circle",
      itemGap: 10,
      textStyle: { color: "#64748b", fontSize: 10 },
      width: "90%",
    },
    series: [
      {
        name: "Jurnal per Sesi",
        type: "pie" as const,
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { show: false, position: "center" },
        emphasis: { label: { show: true, fontSize: 14, fontWeight: "bold" } },
        data: [
          {
            value: breakdown.sesi1,
            name: "Sesi 1",
            itemStyle: { color: "#3b82f6" },
          }, // Blue
          {
            value: breakdown.sesi2,
            name: "Sesi 2",
            itemStyle: { color: "#10b981" },
          }, // Emerald
          {
            value: breakdown.sesi3,
            name: "Sesi 3",
            itemStyle: { color: "#f59e0b" },
          }, // Amber
          {
            value: breakdown.sesi4,
            name: "Sesi 4",
            itemStyle: { color: "#8b5cf6" },
          }, // Violet
          {
            value: breakdown.sesi5,
            name: "Sesi 5",
            itemStyle: { color: "#ec4899" },
          }, // Pink
          {
            value: breakdown.tambahan,
            name: "Tambahan",
            itemStyle: { color: "#6366f1" },
          }, // Indigo
        ],
      },
    ],
  };
};

export const getSessionGaugeOption = (
  filled: number,
  total: number,
  color: string,
  label: string
): EChartsOption => {
  const empty = Math.max(0, total - filled);
  const percentage = total > 0 ? Math.round((filled / total) * 100) : 0;

  return {
    title: {
      text: label,
      left: "center",
      top: "0%",
      textStyle: { fontSize: 12, color: "#64748b" },
    },
    series: [
      {
        type: "pie",
        radius: ["60%", "80%"],
        center: ["50%", "60%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          formatter: `{a|${percentage}%}`,
          rich: {
            a: {
              fontSize: 14,
              fontWeight: "bold",
              color: "#334155",
            },
          },
        },
        data: [
          { value: filled, itemStyle: { color: color } },
          { value: empty, itemStyle: { color: "#e2e8f0" } },
        ],
        animationDuration: 1000,
      },
      {
        type: "pie",
        radius: ["60%", "80%"],
        center: ["50%", "60%"],
        itemStyle: { opacity: 0 },
        tooltip: {
          show: true,
          formatter: `${label}: <br/><b>${filled}/${total}</b> Sesi Terisi`,
        },
        data: [{ value: 100 }],
      },
    ],
    tooltip: { trigger: "item" },
  };
};

export const getActivityPieOption = (
  data: { name: string; value: number }[],
  title: string
): EChartsOption => {
  return {
    title: {
      text: title,
      left: "center",
      textStyle: { fontSize: 14, color: "#334155" },
      top: "2%",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      type: "scroll",
      orient: "horizontal",
      bottom: 0,
      left: "center",
      textStyle: { fontSize: 10 },
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: "60%",
        center: ["50%", "50%"],
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          show: true,
          formatter: "{d}%",
          fontSize: 10,
        },
        labelLine: {
          length: 10,
          length2: 5,
        },
      },
    ],
  };
};
