import { TendikMutabaah } from "@/features/teachers/schemas/tendik-detail-schema";

interface MutabaahTableProps {
  data: TendikMutabaah[];
}

export function MutabaahTable({ data }: MutabaahTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="text-slate-500 border-b border-slate-100 bg-slate-50/50">
            <th className="px-4 py-3 font-semibold">TANGGAL</th>
            <th className="px-4 py-3 font-semibold">SUBUH</th>
            <th className="px-4 py-3 font-semibold">DZUHUR</th>
            <th className="px-4 py-3 font-semibold">ASHAR</th>
            <th className="px-4 py-3 font-semibold">MAGHRIB</th>
            <th className="px-4 py-3 font-semibold">ISYA</th>
            <th className="px-4 py-3 font-semibold">DHUHA</th>
            <th className="px-4 py-3 font-semibold">TILAWAH</th>
            <th className="px-4 py-3 font-semibold">SHAUM</th>
            <th className="px-4 py-3 font-semibold">SEDEKAH</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-700">
                  {item.tanggal}
                </td>
                <td
                  className="px-4 py-3 text-slate-500 max-w-[150px] truncate"
                  title={item.shalatSubuh}
                >
                  {item.shalatSubuh}
                </td>
                <td
                  className="px-4 py-3 text-slate-500 max-w-[150px] truncate"
                  title={item.shalatDzuhur}
                >
                  {item.shalatDzuhur}
                </td>
                <td
                  className="px-4 py-3 text-slate-500 max-w-[150px] truncate"
                  title={item.shalatAshar}
                >
                  {item.shalatAshar}
                </td>
                <td
                  className="px-4 py-3 text-slate-500 max-w-[150px] truncate"
                  title={item.shalatMaghrib}
                >
                  {item.shalatMaghrib}
                </td>
                <td
                  className="px-4 py-3 text-slate-500 max-w-[150px] truncate"
                  title={item.shalatIsya}
                >
                  {item.shalatIsya}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.shalatDhuha === "YA" ? (
                    <span className="text-emerald-600 font-bold">✓</span>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {item.tilawah} Lembar
                </td>
                <td className="px-4 py-3 text-center">
                  {item.shaum === "YA" ? (
                    <span className="text-emerald-600 font-bold">✓</span>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.sedekah === "YA" ? (
                    <span className="text-emerald-600 font-bold">✓</span>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={10}
                className="px-4 py-8 text-center text-slate-400 italic"
              >
                Tidak ada data mutabaah pada rentang tanggal ini.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
