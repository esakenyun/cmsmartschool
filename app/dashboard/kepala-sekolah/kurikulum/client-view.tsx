"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  User,
  Search,
  BookOpen,
  CalendarDays,
  GraduationCap,
  ChevronDown,
  X,
} from "lucide-react";

import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { ChartSkeleton } from "@/components/skeletons/chart-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

// Imported types and data
import {
  TeacherAdminData,
  AdminStatus,
} from "@/components/dashboard/kepala-sekolah/kurikulum/types";
import { INITIAL_DATA } from "@/components/dashboard/kepala-sekolah/kurikulum/data";

// Imported components
import { AdminTable } from "@/components/dashboard/kepala-sekolah/kurikulum/admin-table";
import { StatsChart } from "@/components/dashboard/kepala-sekolah/kurikulum/stats-chart";

export default function KepalaSekolahKurikulum() {
  const [data, setData] = useState<TeacherAdminData[]>(INITIAL_DATA);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [planningPage, setPlanningPage] = useState(1);
  const [implementationPage, setImplementationPage] = useState(1);
  const [evaluationPage, setEvaluationPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(".status-dropdown")) return;
      setOpenDropdownId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <ChartSkeleton />
          </div>
        </div>
        <div className="space-y-8">
          <TableSkeleton />
          <TableSkeleton />
          <TableSkeleton />
        </div>
      </div>
    );
  }

  const filteredData = data.filter((t) => {
    const matchesTeacher =
      selectedTeacher === "all" || t.id === selectedTeacher;
    const matchesSearch = t.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTeacher && matchesSearch;
  });

  // Helper to flat items for table
  const getFlatItems = (
    category: "planning" | "implementation" | "evaluation"
  ) => {
    return filteredData.flatMap((teacher) =>
      teacher[category].map((item) => ({
        ...item,
        teacherId: teacher.id,
        teacherName: teacher.name,
        teacherSubject: teacher.subject,
        teacherClass: teacher.class,
      }))
    );
  };

  const getChartData = () => {
    let approved = 0;
    let submitted = 0;
    let nullCount = 0;

    filteredData.forEach((t) => {
      [...t.planning, ...t.implementation, ...t.evaluation].forEach((item) => {
        if (item.status === "approved") approved++;
        else if (item.status === "submitted") submitted++;
        else nullCount++;
      });
    });

    return [
      { name: "Disetujui", value: approved, color: "#10b981" },
      { name: "Menunggu Review", value: submitted, color: "#3b82f6" },
      { name: "Belum Ada", value: nullCount, color: "#94a3b8" },
    ];
  };

  const chartData = getChartData();

  const handleStatusUpdate = (
    teacherId: string,
    category: "planning" | "implementation" | "evaluation",
    itemId: string,
    newStatus: AdminStatus
  ) => {
    setData((prev) =>
      prev.map((t) => {
        if (t.id !== teacherId) return t;
        return {
          ...t,
          [category]: t[category].map((item) =>
            item.id === itemId ? { ...item, status: newStatus } : item
          ),
        };
      })
    );
    setOpenDropdownId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-20">
      {/* Top Section: Filters & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-slate-800 text-lg mb-1">
              Filter Data
            </h3>
            <p className="text-sm text-slate-500">
              Pilih guru untuk melihat detail administrasi.
            </p>
          </div>

          <div className="space-y-3 mt-2">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                Cari Guru
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ketik nama..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPlanningPage(1);
                    setImplementationPage(1);
                    setEvaluationPage(1);
                  }}
                  className="w-full text-sm border border-slate-300 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                Pilih Guru
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <select
                  value={selectedTeacher}
                  onChange={(e) => {
                    setSelectedTeacher(e.target.value);
                    setPlanningPage(1);
                    setImplementationPage(1);
                    setEvaluationPage(1);
                  }}
                  className="w-full text-sm border border-slate-300 rounded-lg pl-9 pr-3 py-2 appearance-none focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                >
                  <option value="all">Semua Guru</option>
                  {data.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-slate-100 table text-sm">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Total Guru:</span>
              <span className="font-bold">{data.length}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Guru Ditampilkan:</span>
              <span className="font-bold">{filteredData.length}</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">
                Statistik Kelengkapan
              </h3>
              <p className="text-sm text-slate-500">
                Overview status administrasi guru terpilih.
              </p>
            </div>
            <div className="flex gap-2">
              {chartData.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  {d.name} : {d.value}
                </div>
              ))}
            </div>
          </div>

          <StatsChart chartData={chartData} />
        </div>
      </div>

      {/* Main Content: 3 Tables */}
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-emerald-500 rounded-full" />
          <h3 className="text-xl font-bold text-slate-800">
            Detail Administrasi
          </h3>
        </div>

        <AdminTable
          title="1. Perencanaan Pembelajaran"
          icon={BookOpen}
          category="planning"
          colorClass="bg-blue-50 text-blue-900 icon-blue"
          currentPage={planningPage}
          onPageChange={setPlanningPage}
          items={getFlatItems("planning")}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
          handleStatusUpdate={handleStatusUpdate}
          setPreviewUrl={setPreviewUrl}
        />

        <AdminTable
          title="2. Pelaksanaan Pembelajaran"
          icon={CalendarDays}
          category="implementation"
          colorClass="bg-orange-50 text-orange-900 icon-orange"
          currentPage={implementationPage}
          onPageChange={setImplementationPage}
          items={getFlatItems("implementation")}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
          handleStatusUpdate={handleStatusUpdate}
          setPreviewUrl={setPreviewUrl}
        />

        <AdminTable
          title="3. Evaluasi Pembelajaran"
          icon={GraduationCap}
          category="evaluation"
          colorClass="bg-purple-50 text-purple-900 icon-purple"
          currentPage={evaluationPage}
          onPageChange={setEvaluationPage}
          items={getFlatItems("evaluation")}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
          handleStatusUpdate={handleStatusUpdate}
          setPreviewUrl={setPreviewUrl}
        />
      </div>

      {/* Document Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                Preview Dokumen
              </h3>
              <button
                onClick={() => setPreviewUrl(null)}
                className="p-1 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                title="Tutup Preview"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content - Iframe */}
            <div className="flex-1 bg-slate-100 relative">
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title="Document Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
