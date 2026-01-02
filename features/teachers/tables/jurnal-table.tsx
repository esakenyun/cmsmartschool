import { TendikJournal } from "@/features/teachers/schemas/tendik-detail-schema";

interface JurnalTableProps {
  data: TendikJournal[];
}

export function JurnalTable({ data }: JurnalTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="text-slate-500 border-b border-slate-100 bg-slate-50/50">
            <th className="px-4 py-3 font-semibold">TANGGAL</th>
            <th className="px-4 py-3 font-semibold">KEHADIRAN</th>
            <th className="px-4 py-3 font-semibold">SESI 1</th>
            <th className="px-4 py-3 font-semibold">SESI 2</th>
            <th className="px-4 py-3 font-semibold">SESI 3</th>
            <th className="px-4 py-3 font-semibold">SESI 4</th>
            <th className="px-4 py-3 font-semibold">SESI 5</th>
            <th className="px-4 py-3 font-semibold">TAMBAHAN</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-700">
                  {item.tanggal}
                </td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                    {item.kehadiran}
                  </span>
                </td>
                <td
                  className="px-4 py-3 text-slate-500 max-w-[150px] truncate"
                  title={item.sesi1}
                >
                  {item.sesi1}
                </td>
                <td
                  className="px-4 py-3 text-slate-500 max-w-[150px] truncate"
                  title={item.sesi2}
                >
                  {item.sesi2}
                </td>
                <td
                  className="px-4 py-3 text-slate-500 max-w-[150px] truncate"
                  title={item.sesi3}
                >
                  {item.sesi3}
                </td>
                <td
                  className="px-4 py-3 text-slate-500 max-w-[150px] truncate"
                  title={item.sesi4}
                >
                  {item.sesi4}
                </td>
                <td
                  className="px-4 py-3 text-slate-500 max-w-[150px] truncate"
                  title={item.sesi5}
                >
                  {item.sesi5}
                </td>
                <td
                  className="px-4 py-3 text-slate-500 max-w-[150px] truncate"
                  title={item.tambahan}
                >
                  {item.tambahan}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="px-4 py-8 text-center text-slate-400 italic"
              >
                Tidak ada data jurnal pada rentang tanggal ini.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
