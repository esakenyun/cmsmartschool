import { TendikAttendance } from "@/features/teachers/schemas/tendik-detail-schema";

interface PresensiTableProps {
  data: TendikAttendance[];
}

export function PresensiTable({ data }: PresensiTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="text-slate-500 border-b border-slate-100 bg-slate-50/50">
            <th className="px-4 py-3 font-semibold">BULAN</th>
            <th className="px-4 py-3 font-semibold">TANGGAL</th>
            <th className="px-4 py-3 font-semibold">WAKTU</th>
            <th className="px-4 py-3 font-semibold">NAMA</th>
            <th className="px-4 py-3 font-semibold">JABATAN</th>
            <th className="px-4 py-3 font-semibold">REPORT KEHADIRAN</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-700">
                  {item.bulan}
                </td>
                <td className="px-4 py-3 text-slate-500">{item.tanggal}</td>
                <td className="px-4 py-3 text-slate-500">{item.waktu}</td>
                <td className="px-4 py-3 text-slate-700">{item.nama}</td>
                <td className="px-4 py-3 text-slate-500">{item.jabatan}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      item.reportKehadiran.includes("TEPAT")
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.reportKehadiran}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-8 text-center text-slate-400 italic"
              >
                Tidak ada data presensi pada rentang tanggal ini.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
