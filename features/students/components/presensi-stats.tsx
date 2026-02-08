import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

interface PresensiStatsProps {
  hadir: number;
  sakit: number;
  izin: number;
  alpha: number;
  terlambat: number;
  totalDays: number;
}

export function PresensiStats({
  hadir,
  sakit,
  izin,
  alpha,
  terlambat,
  totalDays,
}: PresensiStatsProps) {
  const stats = [
    {
      label: "Hadir",
      value: hadir,
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      label: "Sakit",
      value: sakit,
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "Izin",
      value: izin,
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
    {
      label: "Alpha",
      value: alpha,
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      bg: "bg-red-50",
      text: "text-red-600",
    },
    {
      label: "Terlambat",
      value: terlambat,
      icon: <AlertCircle className="w-5 h-5 text-violet-600" />,
      bg: "bg-violet-50",
      text: "text-violet-600",
    },
  ];

  const percentage = Math.round(((hadir + terlambat) / totalDays) * 100) || 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {/* Summary Card */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center col-span-2 md:col-span-1 lg:col-span-1">
        <span className="text-3xl font-bold text-slate-800">{percentage}%</span>
        <span className="text-xs text-slate-500">Kehadiran Bulan Ini</span>
        <span className="text-[10px] text-slate-600 mt-1 pt-1 bg-slate-300 px-2 py-0.5 rounded-full">
          Target: {totalDays} Hari
        </span>
      </div>

      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-3"
        >
          <div className={`p-2 rounded-lg ${stat.bg}`}>{stat.icon}</div>
          <div>
            <p className="text-xl font-bold text-slate-800">{stat.value}</p>
            <p className={`text-xs font-medium ${stat.text}`}>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
