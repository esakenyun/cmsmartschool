import { EChartsOption } from "echarts";

export const getDetailPresensiOption = (
  hadir: number,
  sakit: number,
  izin: number,
  alpha: number,
  terlambat: number,
): EChartsOption => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      left: "center",
    },
    series: [
      {
        name: "Kehadiran",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "40%"],
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
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: hadir, name: "Hadir", itemStyle: { color: "#10b981" } }, // Emerald
          { value: sakit, name: "Sakit", itemStyle: { color: "#3b82f6" } }, // Blue
          { value: izin, name: "Izin", itemStyle: { color: "#f59e0b" } }, // Amber
          { value: alpha, name: "Alpha", itemStyle: { color: "#ef4444" } }, // Red
          {
            value: terlambat,
            name: "Terlambat",
            itemStyle: { color: "#8b5cf6" },
          }, // Violet
        ],
      },
    ],
  };
};
