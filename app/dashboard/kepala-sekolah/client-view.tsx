"use client";

import { useState, useMemo, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import {
  User,
  CheckCircle2,
  Clock,
  BookOpen,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { getTeachers } from "@/features/teachers/services/teacher-service";
import { Teacher } from "@/features/teachers/data/data-teacher";
import { StatCardSkeleton } from "@/components/skeletons/card-skeleton";
import {
  ChartSkeleton,
  DonutChartSkeleton,
} from "@/components/skeletons/chart-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRangePicker } from "@/components/ui/date-range-picker";
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

import {
  getAttendanceOption,
  getJournalOption,
  getMutabaahOption,
} from "@/features/principal/chart-options";
import { getTeacherStats } from "@/features/principal/utils/utils";

export default function DashboardKepalaSekolahContent() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(2025, 5, 1), // June 1st, 2025
    endDate: new Date(2025, 5, 30), // June 30th, 2025
    key: "selection",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachers().then(setTeachers);
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    return getTeacherStats(
      selectedTeacher,
      dateRange.startDate || new Date(),
      dateRange.endDate || new Date()
    );
  }, [selectedTeacher, dateRange]);

  // --- ECharts Configurations ---
  const attendanceOption = useMemo(() => getAttendanceOption(stats), [stats]);
  const journalOption = useMemo(() => getJournalOption(stats), [stats]);
  const mutabaahOption = useMemo(() => getMutabaahOption(stats), [stats]);

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <DonutChartSkeleton />
          <div className="lg:col-span-2">
            <ChartSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header & Filters */}
      <div className="flex flex-col tablet-landscape-min:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <p className="text-2xl font-bold text-slate-800">
            Laporan Kinerja Guru & Staff
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Filter */}
          {/* <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nama..."
              className="pl-9 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-48"
            />
          </div> */}
          {/* Teacher Filter */}

          <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  role="combobox"
                  aria-expanded={open}
                  className="flex items-center justify-between pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64 bg-white relative text-left"
                >
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <span className="truncate">
                    {selectedTeacher === "all"
                      ? "Semua Guru"
                      : teachers.find((t) => t.name === selectedTeacher)
                          ?.name || "Pilih Guru..."}
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
                          setSelectedTeacher("all");
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedTeacher === "all"
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        Semua Guru
                      </CommandItem>
                      {teachers.map((t) => (
                        <CommandItem
                          key={t.id}
                          value={t.name}
                          onSelect={() => {
                            setSelectedTeacher(t.name);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedTeacher === t.name
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

          {/* Month Filter */}
          <div className="relative">
            <DateRangePicker
              date={dateRange}
              setDate={setDateRange}
              align="end"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Log Aktif
            </p>
            <h3 className="text-2xl font-bold text-slate-800">
              {stats.totalLogs}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Jurnal Lengkap</p>
            <h3 className="text-2xl font-bold text-slate-800">
              {stats.journalStats.complete}
            </h3>
            <span className="text-xs text-green-600">
              {stats.totalLogs > 0
                ? Math.round(
                    (stats.journalStats.complete / stats.totalLogs) * 100
                  )
                : 0}
              % Total
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Rata-rata Mutabaah
            </p>
            <h3 className="text-2xl font-bold text-slate-800">
              {stats.avgMutabaah}/100
            </h3>
          </div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">
            Grafik Kehadiran & Ketepatan Waktu
          </h3>
          <div className="w-full">
            <ReactECharts
              option={attendanceOption}
              style={{ height: "300px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>

        {/* Journal Completion Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">
            Kelengkapan Jurnal Mengajar
          </h3>
          <div className="w-full">
            <ReactECharts
              option={journalOption}
              style={{ height: "300px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>

        {/* Mutabaah Activity Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-6">
            Aktivitas Mutabaah Terbanyak
          </h3>
          <div className="w-full">
            <ReactECharts
              option={mutabaahOption}
              style={{ height: "300px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
