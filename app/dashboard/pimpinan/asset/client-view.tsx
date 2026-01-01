import { Building2 } from "lucide-react";
import { PrincipalHeader } from "@/features/leader/components/leader-header";

export default function PimpinanManajemenAssetContent() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PrincipalHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {["Tanah & Bangunan", "Kendaraan", "Elektronik", "Furniture"].map(
          (cat, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">
                  {cat}
                </p>
                <p className="text-sm font-medium text-slate-800">
                  Kondisi: 90% Baik
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-800">
            Inventaris Aset Bernilai Tinggi ({">"} Rp 50 Juta)
          </h3>
        </div>
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="bg-slate-50 text-slate-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Nama Aset</th>
              <th className="px-6 py-3">Lokasi (Unit)</th>
              <th className="px-6 py-3">Tahun Perolehan</th>
              <th className="px-6 py-3">Nilai Buku</th>
              <th className="px-6 py-3">Kondisi</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Bus Sekolah Isuzu Elf",
                unit: "Yayasan",
                year: "2020",
                val: "Rp 350.000.000",
                cond: "Baik",
              },
              {
                name: "Server Rack System",
                unit: "SMA",
                year: "2022",
                val: "Rp 85.000.000",
                cond: "Baik",
              },
              {
                name: "Renovasi Gedung Aula",
                unit: "SD",
                year: "2019",
                val: "Rp 1.200.000.000",
                cond: "Perlu Cat Ulang",
              },
              {
                name: "Set Alat Musik Drumband",
                unit: "SMP",
                year: "2021",
                val: "Rp 65.000.000",
                cond: "Baik",
              },
            ].map((row, idx) => (
              <tr
                key={idx}
                className="border-b last:border-0 hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {row.name}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 rounded text-xs">
                    {row.unit}
                  </span>
                </td>
                <td className="px-6 py-4">{row.year}</td>
                <td className="px-6 py-4">{row.val}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      row.cond === "Baik"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {row.cond}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
