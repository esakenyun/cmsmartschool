import { Building2, ChevronDown, School } from "lucide-react";

export default function PimpinanManajemenAssetContent() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-slate-500">
            Update terakhir: Senin, 19 Des 2024 - 08:00 WIB
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <School className="h-4 w-4 text-slate-500" />
          </div>
          <select className="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-700 appearance-none cursor-pointer">
            <option value="all">Semua Unit Sekolah</option>
            <option value={"smp"}>SMP Cendekia Muda</option>
            <option value={"sd"}>SD Cendekia Muda</option>
            <option value={"tk"}>TK Cendekia Muda</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </div>
        </div>
      </header>

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
