"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Teacher } from "@/lib/data-teacher";
import { getTeachers } from "@/services/teacher-service";
import { Download, Printer, Search, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TeacherCardSkeleton } from "@/components/skeletons/teacher-card-skeleton";

export default function KepalaSekolahSDM() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(2025, 2, 1), // March 1st, 2025
    endDate: new Date(2025, 2, 31), // March 31st, 2025
    key: "selection",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
        toast.error("Gagal memuat data guru.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end justify-between">
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Periode
            </label>
            <DateRangePicker date={dateRange} setDate={setDateRange} />
          </div>
          <div className="flex-1 md:flex-none">
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Cari Guru
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nama..."
                className="pl-9 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-48"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto justify-end">
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Cetak</span>
          </button>
          <button
            onClick={() =>
              toast.success("Mengunduh Laporan Kinerja Guru (PDF)...")
            }
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Unduh PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <TeacherCardSkeleton key={idx} />
            ))
          : filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
      </div>

      {!loading && filteredTeachers.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          Tidak ada guru yang ditemukan dengan nama {searchQuery}
        </div>
      )}
    </div>
  );
}

function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <Link href={`/dashboard/kepala-sekolah/tendik/${teacher.id}`}>
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden h-full">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>

        <div className="flex items-start justify-between mb-4 relative z-10">
          <div>
            <h4
              className="font-bold text-slate-800 line-clamp-1"
              title={teacher.name}
            >
              {teacher.name}
            </h4>
            <p className="text-xs text-emerald-600 font-medium">
              {teacher.role}
            </p>
          </div>
          <div className="w-8 h-8 bg-white border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-sm">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <ProgressBar
            label="Presensi Kehadiran"
            value={teacher.stats.presence}
            colorClass="bg-blue-500"
          />
          <ProgressBar
            label="Mutabaah Yaumiyah"
            value={teacher.stats.mutabaah}
            colorClass="bg-emerald-500"
          />
          <ProgressBar
            label="Jurnal Kerja"
            value={teacher.stats.journal}
            colorClass="bg-orange-500"
          />
        </div>
      </div>
    </Link>
  );
}

function ProgressBar({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-500">{label}</span>
        <span className="font-bold text-slate-700">{value}%</span>
      </div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-1.5 rounded-full ${colorClass}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
