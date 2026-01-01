import ReactECharts from "echarts-for-react";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface StatsChartProps {
  chartData: ChartData[];
}

export const StatsChart = ({ chartData }: StatsChartProps) => {
  // ECharts Option Configuration
  const chartOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    grid: {
      top: "10%",
      right: "5%",
      bottom: "10%",
      left: "3%",
      containLabel: true, // Ensures labels don't get cut off
    },
    xAxis: {
      type: "value",
      show: false, // Hide X axis lines like the original
    },
    yAxis: {
      type: "category",
      data: chartData.map((d) => d.name),
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: "#64748b",
        fontWeight: 500,
      },
      // Reverse so "Disetujui" (first in array) appears at the top if needed,
      // or keep standard behavior. Standard behavior draws bottom-up for array index 0.
      inverse: true,
    },
    series: [
      {
        type: "bar",
        data: chartData.map((d) => ({
          value: d.value,
          itemStyle: { color: d.color }, // Apply individual colors
        })),
        barWidth: 32,
        itemStyle: {
          borderRadius: [0, 4, 4, 0], // Rounded corners on the right
        },
        label: {
          show: true,
          position: "right",
          color: "#64748b",
          fontWeight: "bold",
          formatter: "{c}",
        },
      },
    ],
  };

  return (
    <div className="h-[200px] w-full">
      <ReactECharts
        option={chartOption}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
};
