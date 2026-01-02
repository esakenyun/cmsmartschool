import { ReactNode } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface DetailCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  chartOption?: EChartsOption; // Make optional
  customChartContent?: ReactNode; // New prop
  tableTitle: string;
  children: ReactNode; // Table content
}

export function DetailCard({
  title,
  subtitle,
  icon,
  chartOption,
  customChartContent,
  tableTitle,
  children,
}: DetailCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-base">{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 flex justify-center items-center bg-white min-h-[300px]">
        {customChartContent ? (
          <div className="w-full">{customChartContent}</div>
        ) : (
          chartOption && (
            <ReactECharts
              option={chartOption}
              style={{ height: "250px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          )
        )}
      </div>

      {/* Table Section */}
      <div className="p-4 bg-white border-t border-slate-100 grow flex flex-col">
        <h4 className="font-bold text-slate-700 text-sm mb-4">{tableTitle}</h4>
        <div className="overflow-x-auto w-full">{children}</div>
      </div>
    </div>
  );
}
