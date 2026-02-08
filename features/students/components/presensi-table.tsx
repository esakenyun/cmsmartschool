import { StudentAttendance } from "@/features/students/data/presensi-dummy";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PresensiTableProps {
  data: StudentAttendance[];
}

export function PresensiTable({ data }: PresensiTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="text-slate-500 border-b border-slate-100 bg-slate-50/50">
              <th className="px-4 py-3 font-semibold">TANGGAL</th>
              <th className="px-4 py-3 font-semibold">WAKTU</th>
              <th className="px-4 py-3 font-semibold">STATUS</th>
              <th className="px-4 py-3 font-semibold">KETERANGAN</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {item.date}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{item.time}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-sm text-[10px] font-semibold border ${
                        item.status === "Hadir"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : item.status === "Sakit"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : item.status === "Izin"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : item.status === "Alpha"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-violet-50 text-violet-700 border-violet-200"
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{item.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-slate-400 italic"
                >
                  Tidak ada data presensi pada rentang tanggal ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-xs text-slate-500">
            Menampilkan{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            sampai{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, data.length)}
            </span>{" "}
            dari <span className="font-medium">{data.length}</span> data
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-xs font-medium text-slate-600">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
