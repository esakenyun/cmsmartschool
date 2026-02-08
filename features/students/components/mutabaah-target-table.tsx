import * as React from "react";
import { MutabaahRecapitulation } from "../types/mutabaah-types";

interface TargetItem {
  category: string;
  items: {
    label: string;
    target: string;
    targetValue: number;
    achieved: (data: MutabaahRecapitulation[]) => number;
    unit: string;
  }[];
}

interface MutabaahTargetTableProps {
  data: MutabaahRecapitulation[];
}

export function MutabaahTargetTable({ data }: MutabaahTargetTableProps) {
  const targets: TargetItem[] = [
    {
      category: "1. Shalat",
      items: [
        {
          label: "Shalat Fardhu Awal Waktu Di Masjid (Ikhwan)",
          target: "80 kali / bulan",
          targetValue: 80,
          unit: "kali",
          achieved: (d) =>
            d.filter(
              (r) =>
                r.shalat_shubuh.includes("MASJID") ||
                r.shalat_zhuhur.includes("MASJID") ||
                r.shalat_ashar.includes("MASJID") ||
                r.shalat_maghrib.includes("MASJID") ||
                r.shalat_isya.includes("MASJID"),
            ).length, // Rough count: This counts ROWS with at least one masjid. Accurate count needs summing all 5 prayers.
          // Correction: Count total occurrences across all 5 fields
        },
        // Re-implementing count logic below correctly
        {
          label: "Qiyamul Lail (Tahajud & Witir)",
          target: "12 kali / bulan",
          targetValue: 12,
          unit: "kali",
          achieved: (d) =>
            d.filter(
              (r) => r.sunnah_tahajud === "YA" || r.sunnah_witir === "YA",
            ).length,
        },
        {
          label: "Shalat Rawatib",
          target: "280 Rakaat / bulan",
          targetValue: 280,
          unit: "rakaat",
          achieved: (d) => {
            // Assuming each "YA" is 2 rakaat for simplicity, except Witir is usually odd? No this is Rawatib.
            // Standard Rawatib: Qabliyah Subuh(2), Zuhur(2/4), etc.
            // Let's assume constant 2 rakaat per "YA" for approximation or map strictly.
            // Q.Subuh (2), Q.Zuhur (2), B.Zuhur (2), Q.Ashar (2), B.Maghrib (2), B.Isya (2).
            // Total 12 rakaat/day max. 12 * 30 = 360. Target 280 is reasonable.
            let total = 0;
            d.forEach((r) => {
              if (r.rawatib_qabliyah_shubuh === "YA") total += 2;
              if (r.rawatib_qabliyah_zhuhur === "YA") total += 2;
              if (r.rawatib_bada_zhuhur === "YA") total += 2;
              if (r.rawatib_qabliyah_ashar === "YA") total += 2;
              if (r.rawatib_bada_maghrib === "YA") total += 2;
              if (r.rawatib_bada_isya === "YA") total += 2;
            });
            return total;
          },
        },
        {
          label: "Shalat Dhuha",
          target: "20 kali / bulan",
          targetValue: 20,
          unit: "kali",
          achieved: (d) => d.filter((r) => r.sunnah_dhuha === "YA").length,
        },
      ],
    },
    {
      category: "2. Al-Qur'an dan Dzikir",
      items: [
        {
          label: "Al-Matsurat Pagi",
          target: "20 kali / bulan",
          targetValue: 20,
          unit: "kali",
          achieved: (d) => d.filter((r) => r.al_matsurat_pagi === "YA").length,
        },
        {
          label: "Al-Matsurat Petang",
          target: "20 kali / bulan",
          targetValue: 20,
          unit: "kali",
          achieved: (d) =>
            d.filter((r) => r.al_matsurat_petang === "YA").length,
        },
        {
          label: "Tilawah Al-Qur'an",
          target: "245 halaman / bulan",
          targetValue: 245,
          unit: "halaman",
          achieved: (d) =>
            d.reduce((acc, curr) => acc + (curr.tilawah_halaman || 0), 0),
        },
        {
          label: "Muraja'ah",
          target: "4 halaman / bulan", // Note: The prompt says "4 pages per month".
          targetValue: 4,
          unit: "halaman",
          achieved: (d) =>
            d.reduce((acc, curr) => acc + (curr.murojaah_halaman || 0), 0),
        },
      ],
    },
    {
      category: "3. Puasa, Infaq, Sosial",
      items: [
        {
          label: "Puasa Sunnah",
          target: "4 kali / bulan",
          targetValue: 4,
          unit: "kali",
          achieved: (d) => d.filter((r) => r.shaum_sunnah === "YA").length,
        },
        {
          label: "Infaq",
          target: "4 kali / bulan",
          targetValue: 4,
          unit: "kali",
          achieved: (d) => d.filter((r) => r.infaq === "YA").length,
        },
        {
          label: "Bersosialisasi dengan Tetangga",
          target: "8 kali / bulan",
          targetValue: 8,
          unit: "kali",
          achieved: (d) =>
            d.filter((r) => r.bersosialisasi_dengan_tetangga === "YA").length,
        },
      ],
    },
    {
      category: "4. Pengembangan Diri & Adab",
      items: [
        {
          label: "Olahraga Mandiri",
          target: "8 kali / bulan",
          targetValue: 8,
          unit: "kali",
          achieved: (d) => d.filter((r) => r.olahraga_mandiri === "YA").length,
        },
        {
          label: "Mengikuti Kajian (Online/Offline)",
          target: "8 kali / bulan", // 4 online + 4 offline
          targetValue: 8,
          unit: "kali",
          achieved: (d) => d.filter((r) => r.kajian_media !== "").length,
        },
        {
          label: "Tidur Dalam Keadaan Berwudhu",
          target: "28 kali / bulan",
          targetValue: 28,
          unit: "kali",
          achieved: (d) =>
            d.filter((r) => r.tidur_dalam_keadaan_berwudhu === "YA").length,
        },
      ],
    },
  ];

  // Helper to calculate total prayers in masjid accurately
  const calculateMosquePrayers = (data: MutabaahRecapitulation[]) => {
    let count = 0;
    data.forEach((r) => {
      if (r.shalat_shubuh.includes("MASJID")) count++;
      if (r.shalat_zhuhur.includes("MASJID")) count++;
      if (r.shalat_ashar.includes("MASJID")) count++;
      if (r.shalat_maghrib.includes("MASJID")) count++;
      if (r.shalat_isya.includes("MASJID")) count++;
    });
    return count;
  };

  // Update the first item function reference
  targets[0].items[0].achieved = calculateMosquePrayers;

  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden bg-white mb-6">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <h3 className="font-semibold text-slate-700">
          Ringkasan Pencapaian Target Mutabaah (Bulan Ini)
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <th className="px-4 py-3 font-semibold w-1/3">
                Kategori & Aktivitas
              </th>
              <th className="px-4 py-3 font-semibold text-center">Target</th>
              <th className="px-4 py-3 font-semibold text-center">Tercapai</th>
              <th className="px-4 py-3 font-semibold text-center">Status</th>
              <th className="px-4 py-3 font-semibold text-center">
                Persentase
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {targets.map((category) => (
              <React.Fragment key={category.category}>
                <tr className="bg-slate-50/50">
                  <td
                    colSpan={5}
                    className="px-4 py-2 font-semibold text-slate-800 text-xs uppercase tracking-wider"
                  >
                    {category.category}
                  </td>
                </tr>
                {category.items.map((item, itemIdx) => {
                  const achievedValue = item.achieved(data);
                  const percentage = Math.min(
                    (achievedValue / item.targetValue) * 100,
                    100,
                  );
                  const isReached = achievedValue >= item.targetValue;

                  return (
                    <tr
                      key={itemIdx}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-slate-700 pl-8">
                        {item.label}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-500 font-medium">
                        {item.target}
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-700">
                        {achievedValue}{" "}
                        <span className="text-xs font-normal text-slate-400">
                          {item.unit}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex px-2 py-1 rounded text-[10px] font-bold border ${isReached ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}
                        >
                          {isReached ? "TERCAPAI" : "BELUM TERCAPAI"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isReached ? "bg-emerald-500" : "bg-red-400"}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-600 w-8 text-right">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
