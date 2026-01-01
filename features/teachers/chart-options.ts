import { DashboardSummary } from "@/features/teachers/data/dashboard-dummy";

export const getLineChartOption = (dashboardData: DashboardSummary) => {
  return {
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
      data: dashboardData.chartData.map((item) => item.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#64748b" },
    },
    yAxis: [
      {
        type: "value",
        name: "Skor",
        max: 100,
        splitLine: { lineStyle: { color: "#f1f5f9" } },
        axisLabel: { show: false },
      },
      {
        type: "value",
        name: "Jam",
        max: 12, // Assuming max 12 hours work
        splitLine: { show: false },
        axisLabel: { show: false },
      },
    ],
    series: [
      {
        name: "Skor Kinerja",
        type: "line",
        data: dashboardData.chartData.map((item) => item.performance),
        smooth: true,
        symbolSize: 8,
        itemStyle: { color: "#3b82f6" },
        lineStyle: { width: 3 },
        yAxisIndex: 0,
      },
      {
        name: "Jam Kerja",
        type: "line",
        data: dashboardData.chartData.map((item) => item.workHours),
        smooth: true,
        symbolSize: 8,
        itemStyle: { color: "#10b981" },
        lineStyle: { width: 3 },
        yAxisIndex: 1, // Use second Y axis
      },
    ],
  };
};

export const getBarChartOption = (dashboardData: DashboardSummary) => {
  return {
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
      data: dashboardData.adminScores.map((item) => item.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#64748b", fontWeight: 500 },
    },
    series: [
      {
        name: "Selesai %",
        type: "bar",
        data: dashboardData.adminScores.map((item) => item.completed),
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
};
