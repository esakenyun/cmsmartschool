"use client";

import { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  CheckCircle2,
  Heart,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudentAmaliah {
  studentName: string;
  classGroup: string;
  shalat5Waktu: boolean;
  tadarrus: boolean;
  shalatSunnah: boolean;
  sedekah: boolean;
}

const INITIAL_AMALIAH_LIST: StudentAmaliah[] = [
  { studentName: "Aditya Pratama", classGroup: "7-A", shalat5Waktu: true, tadarrus: true, shalatSunnah: true, sedekah: false },
  { studentName: "Budi Santoso", classGroup: "7-A", shalat5Waktu: true, tadarrus: false, shalatSunnah: false, sedekah: true },
  { studentName: "Citra Lestari", classGroup: "7-A", shalat5Waktu: true, tadarrus: true, shalatSunnah: true, sedekah: true },
  { studentName: "Dedi Wijaya", classGroup: "7-A", shalat5Waktu: false, tadarrus: false, shalatSunnah: false, sedekah: false },
  { studentName: "Eka Rahayu", classGroup: "7-A", shalat5Waktu: true, tadarrus: true, shalatSunnah: false, sedekah: true },
  { studentName: "Kiki Amelia", classGroup: "7-A", shalat5Waktu: true, tadarrus: true, shalatSunnah: true, sedekah: true },
  { studentName: "Lutfi Hakim", classGroup: "7-A", shalat5Waktu: true, tadarrus: false, shalatSunnah: true, sedekah: false },
  { studentName: "Mega Utami", classGroup: "7-A", shalat5Waktu: true, tadarrus: true, shalatSunnah: false, sedekah: false },
  { studentName: "Naufal Abdi", classGroup: "7-A", shalat5Waktu: true, tadarrus: true, shalatSunnah: true, sedekah: true },
  { studentName: "Oki Setiana", classGroup: "7-A", shalat5Waktu: true, tadarrus: false, shalatSunnah: false, sedekah: false },
  { studentName: "Fadel Muhammad", classGroup: "7-B", shalat5Waktu: true, tadarrus: true, shalatSunnah: false, sedekah: true },
  { studentName: "Gita Gutawa", classGroup: "7-B", shalat5Waktu: true, tadarrus: true, shalatSunnah: true, sedekah: true },
  { studentName: "Hendra Wijaya", classGroup: "7-B", shalat5Waktu: true, tadarrus: false, shalatSunnah: false, sedekah: false },
  { studentName: "Indah Permata", classGroup: "7-B", shalat5Waktu: true, tadarrus: true, shalatSunnah: true, sedekah: false },
  { studentName: "Joko Widodo", classGroup: "7-B", shalat5Waktu: true, tadarrus: false, shalatSunnah: false, sedekah: true },
];

export default function AmaliahClientView() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua");
  const [amaliahList, setAmaliahList] = useState<StudentAmaliah[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("guru_amaliah_logs");
    if (stored) {
      setAmaliahList(JSON.parse(stored));
    } else {
      setAmaliahList(INITIAL_AMALIAH_LIST);
      localStorage.setItem("guru_amaliah_logs", JSON.stringify(INITIAL_AMALIAH_LIST));
    }
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const saveList = (updated: StudentAmaliah[]) => {
    setAmaliahList(updated);
    localStorage.setItem("guru_amaliah_logs", JSON.stringify(updated));
  };

  const handleToggleAmaliah = (studentName: string, field: keyof Omit<StudentAmaliah, "studentName" | "classGroup">) => {
    const updated = amaliahList.map((item) => {
      if (item.studentName === studentName) {
        const nextValue = !item[field];
        return {
          ...item,
          [field]: nextValue,
        };
      }
      return item;
    });
    saveList(updated);
    toast.info(`Data ibadah harian ${studentName} diperbarui.`);
  };

  const uniqueClasses = ["Semua", "7-A", "7-B"];

  const filteredAmaliah = amaliahList.filter((item) => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "Semua" || item.classGroup === selectedClass;
    return matchesSearch && matchesClass;
  });

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Skeleton className="h-24 w-full rounded-xl" />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header card */}
      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-emerald-900 font-bold text-xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600 animate-pulse" />
            Amaliah Harian Siswa
          </h3>
          <p className="text-emerald-700 text-sm mt-1">
            Monitor pembiasaan dan amaliah ibadah harian siswa seperti shalat wajib, mengaji/tadarrus, shalat sunnah dhuha/tahajjud, dan sedekah harian.
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

      {/* Amaliah Table */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Nama Siswa</th>
                <th className="pb-3 font-semibold">Kelas</th>
                <th className="pb-3 font-semibold text-center">Shalat 5 Waktu</th>
                <th className="pb-3 font-semibold text-center">Mengaji/Tadarrus</th>
                <th className="pb-3 font-semibold text-center">Shalat Sunnah</th>
                <th className="pb-3 font-semibold text-center">Sedekah</th>
                <th className="pb-3 font-semibold text-right">Skor Harian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAmaliah.map((item, idx) => {
                // Compute simple daily completion rate
                const fields = [item.shalat5Waktu, item.tadarrus, item.shalatSunnah, item.sedekah];
                const completedCount = fields.filter(Boolean).length;
                const score = Math.round((completedCount / fields.length) * 100);

                return (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 pr-2 font-semibold text-slate-800">
                      {item.studentName}
                    </td>
                    <td className="py-3.5 pr-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600 font-semibold">
                        {item.classGroup}
                      </span>
                    </td>
                    <td className="py-3.5 text-center pr-2">
                      <input
                        type="checkbox"
                        checked={item.shalat5Waktu}
                        onChange={() => handleToggleAmaliah(item.studentName, "shalat5Waktu")}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 text-center pr-2">
                      <input
                        type="checkbox"
                        checked={item.tadarrus}
                        onChange={() => handleToggleAmaliah(item.studentName, "tadarrus")}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 text-center pr-2">
                      <input
                        type="checkbox"
                        checked={item.shalatSunnah}
                        onChange={() => handleToggleAmaliah(item.studentName, "shalatSunnah")}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 text-center pr-2">
                      <input
                        type="checkbox"
                        checked={item.sedekah}
                        onChange={() => handleToggleAmaliah(item.studentName, "sedekah")}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 text-right font-bold text-slate-800">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          score === 100
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : score >= 50
                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                            : "bg-rose-50 text-rose-700 border border-rose-100"
                        }`}
                      >
                        {score}% ({completedCount}/4)
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredAmaliah.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                    Siswa tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
