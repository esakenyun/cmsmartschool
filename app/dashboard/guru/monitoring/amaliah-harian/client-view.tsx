"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Heart,
  ChevronDown,
  Sparkles,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { toast } from "sonner";
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

interface AmaliahRecord {
  id: string;
  date: string; // YYYY-MM-DD
  studentName: string;
  classGroup: string;
  shalat5Waktu: boolean;
  tadarrus: boolean;
  shalatSunnah: boolean;
  sedekah: boolean;
}

const SEED_AMALIAH_LOGS: AmaliahRecord[] = [];
const dates = ["2026-07-01", "2026-07-02", "2026-07-03", "2026-07-04", "2026-07-05"];

dates.forEach((d) => {
  STUDENTS_LIST.forEach((s, idx) => {
    SEED_AMALIAH_LOGS.push({
      id: `amal-${d}-${s.name.replace(/\s+/g, "-").toLowerCase()}`,
      date: d,
      studentName: s.name,
      classGroup: s.classGroup,
      shalat5Waktu: idx % 3 !== 0,
      tadarrus: idx % 2 === 0,
      shalatSunnah: idx % 4 === 0,
      sedekah: idx % 3 === 1,
    });
  });
});

export default function AmaliahClientView() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua");
  const [logs, setLogs] = useState<AmaliahRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("guru_amaliah_logs");
    if (stored) {
      setLogs(JSON.parse(stored));
    } else {
      setLogs(SEED_AMALIAH_LOGS);
      localStorage.setItem("guru_amaliah_logs", JSON.stringify(SEED_AMALIAH_LOGS));
    }
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const saveLogs = (updated: AmaliahRecord[]) => {
    setLogs(updated);
    localStorage.setItem("guru_amaliah_logs", JSON.stringify(updated));
  };

  // Get student's amaliah stats for today
  const getTodayAmaliah = (studentName: string) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const found = logs.find((l) => l.date === todayStr && l.studentName === studentName);
    
    if (found) {
      const items = [found.shalat5Waktu, found.tadarrus, found.shalatSunnah, found.sedekah];
      const completed = items.filter(Boolean).length;
      return {
        shalat5Waktu: found.shalat5Waktu,
        tadarrus: found.tadarrus,
        shalatSunnah: found.shalatSunnah,
        sedekah: found.sedekah,
        completed,
        rate: Math.round((completed / items.length) * 100),
      };
    }

    return {
      shalat5Waktu: false,
      tadarrus: false,
      shalatSunnah: false,
      sedekah: false,
      completed: 0,
      rate: 0,
    };
  };

  const uniqueClasses = ["Semua", "7-A", "7-B"];

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
      {/* Header section */}
      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-emerald-900 font-bold text-xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600 animate-pulse" />
            Monitoring Amaliah Harian Siswa
          </h3>
          <p className="text-emerald-700 text-sm mt-1">
            Monitor pembiasaan ibadah harian siswa. Klik pada checkbox hari ini untuk pencatatan cepat.
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
        <div className="w-full sm:w-auto shrink-0">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.map((student, idx) => {
          const stats = getTodayAmaliah(student.name);

          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="font-bold text-slate-800 text-base group-hover:text-emerald-700 transition-colors">
                      {student.name}
                    </h4>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600 font-semibold">
                      Kelas: {student.classGroup}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0 border border-emerald-100">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>

                {/* Score Summary */}
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Target Hari Ini</span>
                    <span className={`font-bold ${stats.rate === 100 ? "text-emerald-600" : "text-blue-600"}`}>
                      {stats.rate}% ({stats.completed}/4)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        stats.rate === 100 ? "bg-emerald-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${stats.rate}%` }}
                    ></div>
                  </div>

                  {/* Quick Preview Summary */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${stats.shalat5Waktu ? "bg-green-50 border-green-100 text-green-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                      <CheckCircle2 size={14} className={stats.shalat5Waktu ? "text-green-600" : "text-slate-300"} />
                      <span className="truncate">Shalat 5W</span>
                    </div>

                    <div className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${stats.tadarrus ? "bg-green-50 border-green-100 text-green-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                      <BookOpen size={14} className={stats.tadarrus ? "text-green-600" : "text-slate-300"} />
                      <span className="truncate">Tadarrus</span>
                    </div>

                    <div className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${stats.shalatSunnah ? "bg-green-50 border-green-100 text-green-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                      <CheckCircle2 size={14} className={stats.shalatSunnah ? "text-green-600" : "text-slate-300"} />
                      <span className="truncate">Sunnah</span>
                    </div>

                    <div className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${stats.sedekah ? "bg-green-50 border-green-100 text-green-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                      <Heart size={14} className={stats.sedekah ? "text-green-600" : "text-slate-300"} />
                      <span className="truncate">Sedekah</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={`/dashboard/guru/monitoring/amaliah-harian/${encodeURIComponent(student.name)}`}
                className="w-full border-t border-slate-100 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 py-3 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                Lihat Detail Amaliah <ChevronRight size={14} />
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
