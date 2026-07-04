"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Search,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import {
  INITIAL_TUGAS_LIST,
  INITIAL_MATERI_LIST,
  MOCK_SUBMISSIONS,
  Tugas,
  Submission,
  Materi,
} from "../mock-data";

// Import Shadcn Components
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Student {
  name: string;
  classGroup: string;
}

const STUDENTS_LIST: Student[] = [
  { name: "Aditya Pratama", classGroup: "7-A" },
  { name: "Budi Santoso", classGroup: "7-A" },
  { name: "Citra Lestari", classGroup: "7-A" },
  { name: "Dedi Wijaya", classGroup: "7-A" },
  { name: "Eka Rahayu", classGroup: "7-A" },
  { name: "Kiki Amelia", classGroup: "7-A" },
  { name: "Lutfi Hakim", classGroup: "7-A" },
  { name: "Mega Utami", classGroup: "7-A" },
  { name: "Naufal Abdi", classGroup: "7-A" },
  { name: "Oki Setiana", classGroup: "7-A" },
  { name: "Fadel Muhammad", classGroup: "7-B" },
  { name: "Gita Gutawa", classGroup: "7-B" },
  { name: "Hendra Wijaya", classGroup: "7-B" },
  { name: "Indah Permata", classGroup: "7-B" },
  { name: "Joko Widodo", classGroup: "7-B" },
];

export default function RekapTugasClient() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua");
  const [selectedMapel, setSelectedMapel] = useState("Semua");

  const [tugasList, setTugasList] = useState<Tugas[]>([]);
  const [materiList, setMateriList] = useState<Materi[]>([]);

  useEffect(() => {
    // Load Tugas
    const storedTugas = localStorage.getItem("guru_tugas_list");
    if (storedTugas) {
      setTugasList(JSON.parse(storedTugas));
    } else {
      setTugasList(INITIAL_TUGAS_LIST);
      localStorage.setItem("guru_tugas_list", JSON.stringify(INITIAL_TUGAS_LIST));
    }

    // Load Materi
    const storedMateri = localStorage.getItem("guru_materi_list");
    if (storedMateri) {
      setMateriList(JSON.parse(storedMateri));
    } else {
      setMateriList(INITIAL_MATERI_LIST);
      localStorage.setItem("guru_materi_list", JSON.stringify(INITIAL_MATERI_LIST));
    }

    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Get unique Mata Pelajaran list from materials
  const mapels = ["Semua", ...Array.from(new Set(materiList.map((m) => m.category)))];

  // Compute student stats filtered by class and selected Mata Pelajaran
  const getStudentStats = (student: Student) => {
    const classTasks = tugasList.filter((t) => {
      const isSameClass = t.classGroup === student.classGroup;
      if (!isSameClass) return false;

      // Lookup Mata Pelajaran of task's material
      const linkedMateri = materiList.find((m) => m.id === t.materiId);
      const mapel = linkedMateri ? linkedMateri.category : "Umum";

      return selectedMapel === "Semua" || mapel === selectedMapel;
    });

    let completedCount = 0;
    let gradedCount = 0;
    let totalGrade = 0;

    classTasks.forEach((t) => {
      const storedSub = localStorage.getItem(`submissions_${t.id}`);
      const subs: Submission[] = storedSub ? JSON.parse(storedSub) : (MOCK_SUBMISSIONS[t.id] || []);
      const foundSub = subs.find((s) => s.studentName === student.name);

      if (foundSub) {
        if (foundSub.status !== "Not Submitted") {
          completedCount++;
        }
        if (foundSub.status === "Graded" && foundSub.grade !== undefined) {
          gradedCount++;
          totalGrade += foundSub.grade;
        }
      }
    });

    const averageGrade = gradedCount > 0 ? Math.round(totalGrade / gradedCount) : null;

    return {
      totalTasks: classTasks.length,
      completedCount,
      averageGrade,
    };
  };

  const uniqueClasses = ["Semua", ...Array.from(new Set(STUDENTS_LIST.map((s) => s.classGroup)))];

  const filteredStudents = STUDENTS_LIST.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "Semua" || student.classGroup === selectedClass;
    return matchesSearch && matchesClass;
  });

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header card info */}
      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-emerald-900 font-bold text-xl flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-emerald-600" />
            Rekapitulasi Tugas & Nilai Siswa
          </h3>
          <p className="text-emerald-700 text-sm mt-1">
            Lihat ringkasan pengerjaan tugas dan nilai rata-rata dari seluruh siswa berdasarkan mata pelajaran dan kelas.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Cari nama siswa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto shrink-0 flex-wrap sm:flex-nowrap">
          <Select value={selectedMapel} onValueChange={setSelectedMapel}>
            <SelectTrigger className="w-full sm:w-[160px] bg-white">
              <SelectValue placeholder="Mata Pelajaran" />
            </SelectTrigger>
            <SelectContent>
              {mapels.map((mapel) => (
                <SelectItem key={mapel} value={mapel}>
                  {mapel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full sm:w-[140px] bg-white">
              <SelectValue placeholder="Pilih Kelas" />
            </SelectTrigger>
            <SelectContent>
              {uniqueClasses.map((cl) => (
                <SelectItem key={cl} value={cl}>
                  {cl === "Semua" ? "Semua Kelas" : `Kelas ${cl}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loop Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStudents.map((student, idx) => {
          const stats = getStudentStats(student);
          const completionPercentage =
            stats.totalTasks > 0 ? Math.round((stats.completedCount / stats.totalTasks) * 100) : 0;

          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                      {student.name}
                    </h4>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-600 font-semibold">
                      Kelas: {student.classGroup}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                    <span>Progres Tugas</span>
                    <span className="text-slate-700">
                      {stats.completedCount} / {stats.totalTasks} ({completionPercentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Info summary */}
                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                      Rata-rata Nilai
                    </span>
                    <span className="text-base font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {stats.averageGrade !== null ? stats.averageGrade : "-"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                      Tugas Selesai
                    </span>
                    <span className="text-base font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      {stats.completedCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action trigger button links directly to detail page */}
              <Link
                href={`/dashboard/guru/pembelajaran/rekap-tugas/${encodeURIComponent(student.name)}`}
                className="w-full border-t border-slate-100 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 py-3 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                Lihat Detail Rekap <ChevronRight size={14} />
              </Link>
            </div>
          );
        })}

        {filteredStudents.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-400 italic bg-white rounded-xl border border-slate-200">
            Siswa tidak ditemukan untuk filter ini.
          </div>
        )}
      </div>
    </div>
  );
}
