"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { getTeachers } from "@/features/teachers/services/teacher-service";
import { Teacher } from "@/features/teachers/data/data-teacher";
import { Users, Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { TeacherCardSkeleton } from "@/components/skeletons/teacher-card-skeleton";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getTeacherStats } from "@/features/principal/utils/utils";
import { differenceInDays } from "date-fns";

export default function KepalaSekolahSDM() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(2025, 5, 1), // June 1st, 2025
    endDate: new Date(2025, 5, 30), // June 30th, 2025
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

  const filteredTeachers = teachers.filter((teacher) => {
    if (!searchQuery) return true;
    return teacher.id === searchQuery;
  });

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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button
                    role="combobox"
                    aria-expanded={open}
                    className="flex items-center justify-between pl-3 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64 bg-white text-left"
                  >
                    <span className="truncate">
                      {searchQuery
                        ? teachers.find((t) => t.id === searchQuery)?.name
                        : "Cari Guru..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[260px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Cari guru..." />
                    <CommandList>
                      <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="Semua Guru"
                          onSelect={() => {
                            setSearchQuery("");
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              searchQuery === "" ? "opacity-100" : "opacity-0"
                            )}
                          />
                          Semua Guru
                        </CommandItem>
                        {teachers.map((t) => (
                          <CommandItem
                            key={t.id}
                            value={t.name}
                            onSelect={() => {
                              setSearchQuery(t.id);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                searchQuery === t.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {t.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <TeacherCardSkeleton key={idx} />
            ))
          : filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                dateRange={dateRange}
              />
            ))}
      </div>

      {!loading && filteredTeachers.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          Tidak ada guru yang ditemukan.
        </div>
      )}
    </div>
  );
}

function TeacherCard({
  teacher,
  dateRange,
}: {
  teacher: Teacher;
  dateRange: { startDate: Date; endDate: Date };
}) {
  const stats = useMemo(() => {
    const rawStats = getTeacherStats(
      teacher.id,
      dateRange.startDate,
      dateRange.endDate
    );
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    const daysDiff = Math.max(1, differenceInDays(end, start) + 1);

    // Calculate percentages
    // Presence: totalLogs / daysDiff * 100 (capped at 100)
    // NOTE: daysDiff includes weekends, but standard working days are fewer.
    // For simplicity in this mock, we'll assume daysDiff as denominator or 22 for month
    // Let's use daysDiff but handle weekend logic if needed. For now, max 100.
    // For single teacher logic: logs <= daysDiff.
    // Actually, createDailyStats in utils makes 1 per day. So simple division is fine.
    const presencePct = Math.min(
      100,
      Math.round((rawStats.totalLogs / daysDiff) * 100)
    );

    // Journal: complete / (complete + incomplete + missing) * 100
    const totalJournal =
      rawStats.journalStats.complete +
      rawStats.journalStats.incomplete +
      rawStats.journalStats.missing;
    const journalPct =
      totalJournal > 0
        ? Math.round((rawStats.journalStats.complete / totalJournal) * 100)
        : 0;

    return {
      presence: presencePct,
      mutabaah: rawStats.avgMutabaah,
      journal: journalPct,
    };
  }, [teacher.id, dateRange]);

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
            value={stats.presence}
            colorClass="bg-blue-500"
          />
          <ProgressBar
            label="Mutabaah Yaumiyah"
            value={stats.mutabaah}
            colorClass="bg-emerald-500"
          />
          <ProgressBar
            label="Jurnal Kerja"
            value={stats.journal}
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
