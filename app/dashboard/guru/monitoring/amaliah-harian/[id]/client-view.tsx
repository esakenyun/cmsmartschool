"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Heart,
  Pencil,
  Sparkles,
  Info,
  BookOpen,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { toast } from "sonner";

// Import Shadcn Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  date: string;
  studentName: string;
  classGroup: string;
  shalat5Waktu: boolean;
  tadarrus: boolean;
  shalatSunnah: boolean;
  sedekah: boolean;
}

interface AmaliahDetailClientProps {
  studentNameParam: string;
}

export default function AmaliahDetailClient({
  studentNameParam,
}: AmaliahDetailClientProps) {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);
  const [studentLogs, setStudentLogs] = useState<AmaliahRecord[]>([]);
  const [stats, setStats] = useState({
    totalDays: 0,
    averageScore: 0,
    shalat5WaktuCount: 0,
    tadarrusCount: 0,
    shalatSunnahCount: 0,
    sedekahCount: 0,
  });

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AmaliahRecord | null>(null);
  const [editShalat5Waktu, setEditShalat5Waktu] = useState(false);
  const [editTadarrus, setEditTadarrus] = useState(false);
  const [editShalatSunnah, setEditShalatSunnah] = useState(false);
  const [editSedekah, setEditSedekah] = useState(false);

  const loadData = () => {
    const decodedName = decodeURIComponent(studentNameParam);
    const foundStudent = STUDENTS_LIST.find((s) => s.name === decodedName);
    setStudent(foundStudent || null);

    if (foundStudent) {
      const stored = localStorage.getItem("guru_amaliah_logs");
      const allLogs: AmaliahRecord[] = stored ? JSON.parse(stored) : [];
      
      // Filter logs for this specific student and sort by date descending
      const filtered = allLogs
        .filter((l) => l.studentName === foundStudent.name)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setStudentLogs(filtered);

      const totalDays = filtered.length;
      let shalat5WaktuCount = 0;
      let tadarrusCount = 0;
      let shalatSunnahCount = 0;
      let sedekahCount = 0;
      let totalScoresSum = 0;

      filtered.forEach((l) => {
        if (l.shalat5Waktu) shalat5WaktuCount++;
        if (l.tadarrus) tadarrusCount++;
        if (l.shalatSunnah) shalatSunnahCount++;
        if (l.sedekah) sedekahCount++;

        const items = [l.shalat5Waktu, l.tadarrus, l.shalatSunnah, l.sedekah];
        const completed = items.filter(Boolean).length;
        totalScoresSum += (completed / items.length) * 100;
      });

      const averageScore = totalDays > 0 ? Math.round(totalScoresSum / totalDays) : 0;

      setStats({
        totalDays,
        averageScore,
        shalat5WaktuCount,
        tadarrusCount,
        shalatSunnahCount,
        sedekahCount,
      });
    }
  };

  useEffect(() => {
    loadData();
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [studentNameParam]);

  const handleStartEdit = (record: AmaliahRecord) => {
    setSelectedRecord(record);
    setEditShalat5Waktu(record.shalat5Waktu);
    setEditTadarrus(record.tadarrus);
    setEditShalatSunnah(record.shalatSunnah);
    setEditSedekah(record.sedekah);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord) return;

    const stored = localStorage.getItem("guru_amaliah_logs");
    const allLogs: AmaliahRecord[] = stored ? JSON.parse(stored) : [];

    const updatedLogs = allLogs.map((l) => {
      if (l.id === selectedRecord.id) {
        return {
          ...l,
          shalat5Waktu: editShalat5Waktu,
          tadarrus: editTadarrus,
          shalatSunnah: editShalatSunnah,
          sedekah: editSedekah,
        };
      }
      return l;
    });

    localStorage.setItem("guru_amaliah_logs", JSON.stringify(updatedLogs));
    toast.success(`Catatan ibadah harian tanggal ${formatDateString(selectedRecord.date)} diperbarui.`);
    setIsEditModalOpen(false);
    loadData(); // reload table and stats
  };

  const formatDateString = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getDayName = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("id-ID", { weekday: "long" });
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <TableSkeleton />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="space-y-6 text-center py-12">
        <h4 className="text-xl font-bold text-slate-800">Siswa tidak ditemukan</h4>
        <p className="text-slate-500">
          Data detail ibadah siswa ini tidak dapat ditemukan.
        </p>
        <Link
          href="/dashboard/guru/monitoring/amaliah-harian"
          className="inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-all"
        >
          <ArrowLeft size={16} /> Kembali ke Amaliah Harian
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Button */}
      <div>
        <Link
          href="/dashboard/guru/monitoring/amaliah-harian"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium transition-all"
        >
          <ArrowLeft size={16} /> Kembali ke Amaliah Harian
        </Link>
      </div>

      {/* Profil Siswa Header Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center font-bold text-2xl">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
            <p className="text-slate-500 text-sm mt-0.5">
              Kelas {student.classGroup} • Rekapitulasi & Riwayat Ibadah Harian (Amaliah)
            </p>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Average Daily Score */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between col-span-2 md:col-span-1">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Rata-rata Skor</span>
            <span className={`text-3xl font-bold mt-1 block ${stats.averageScore >= 80 ? "text-emerald-600" : "text-blue-600"}`}>
              {stats.averageScore}%
            </span>
          </div>
          <div className={`p-3 rounded-xl ${stats.averageScore >= 80 ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
            <Sparkles size={20} />
          </div>
        </div>

        {/* Shalat 5 Waktu */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Shalat 5 Waktu</span>
            <span className="text-3xl font-bold text-slate-800 mt-1 block">
              {stats.shalat5WaktuCount} <span className="text-xs text-slate-400 font-normal">hari</span>
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-slate-700">
            <CheckCircle2 size={20} />
          </div>
        </div>

        {/* Tadarrus */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Tadarrus / Mengaji</span>
            <span className="text-3xl font-bold text-slate-800 mt-1 block">
              {stats.tadarrusCount} <span className="text-xs text-slate-400 font-normal">hari</span>
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-slate-700">
            <BookOpen size={20} />
          </div>
        </div>

        {/* Shalat Sunnah */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Shalat Sunnah</span>
            <span className="text-3xl font-bold text-slate-800 mt-1 block">
              {stats.shalatSunnahCount} <span className="text-xs text-slate-400 font-normal">hari</span>
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-slate-700">
            <Calendar size={20} />
          </div>
        </div>

        {/* Sedekah */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Sedekah Harian</span>
            <span className="text-3xl font-bold text-emerald-600 mt-1 block">
              {stats.sedekahCount} <span className="text-xs text-slate-400 font-normal">hari</span>
            </span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <Heart size={20} />
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          Riwayat Amaliah Harian Siswa
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Hari</th>
                <th className="pb-3 font-semibold">Tanggal</th>
                <th className="pb-3 font-semibold text-center">Shalat 5 Waktu</th>
                <th className="pb-3 font-semibold text-center">Mengaji/Tadarrus</th>
                <th className="pb-3 font-semibold text-center">Shalat Sunnah</th>
                <th className="pb-3 font-semibold text-center">Sedekah</th>
                <th className="pb-3 font-semibold text-right">Skor Harian</th>
                <th className="pb-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentLogs.map((record, idx) => {
                const items = [record.shalat5Waktu, record.tadarrus, record.shalatSunnah, record.sedekah];
                const completed = items.filter(Boolean).length;
                const score = Math.round((completed / items.length) * 100);

                return (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 pr-2 font-semibold text-slate-700">
                      {getDayName(record.date)}
                    </td>
                    <td className="py-3.5 pr-2 text-slate-600 text-xs">
                      {formatDateString(record.date)}
                    </td>
                    <td className="py-3.5 text-center pr-2">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${record.shalat5Waktu ? "bg-emerald-500" : "bg-slate-200"}`} />
                    </td>
                    <td className="py-3.5 text-center pr-2">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${record.tadarrus ? "bg-emerald-500" : "bg-slate-200"}`} />
                    </td>
                    <td className="py-3.5 text-center pr-2">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${record.shalatSunnah ? "bg-emerald-500" : "bg-slate-200"}`} />
                    </td>
                    <td className="py-3.5 text-center pr-2">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${record.sedekah ? "bg-emerald-500" : "bg-slate-200"}`} />
                    </td>
                    <td className="py-3.5 text-right font-bold text-slate-800 pr-2">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          score === 100
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : score >= 50
                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                            : "bg-rose-50 text-rose-700 border border-rose-100"
                        }`}
                      >
                        {score}% ({completed}/4)
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => handleStartEdit(record)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Amaliah"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {studentLogs.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 italic">
                    Belum ada riwayat amaliah yang terekam untuk siswa ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Single Amaliah Record Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Ubah Amaliah Siswa
            </DialogTitle>
            <DialogDescription>
              Ubah daftar checklist ibadah harian {student.name} untuk tanggal {selectedRecord ? formatDateString(selectedRecord.date) : ""}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveEdit} className="space-y-4 pt-2">
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <span>Shalat 5 Waktu</span>
                <input
                  type="checkbox"
                  checked={editShalat5Waktu}
                  onChange={(e) => setEditShalat5Waktu(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <span>Tadarrus / Mengaji</span>
                <input
                  type="checkbox"
                  checked={editTadarrus}
                  onChange={(e) => setEditTadarrus(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <span>Shalat Sunnah</span>
                <input
                  type="checkbox"
                  checked={editShalatSunnah}
                  onChange={(e) => setEditShalatSunnah(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <span>Sedekah Harian</span>
                <input
                  type="checkbox"
                  checked={editSedekah}
                  onChange={(e) => setEditSedekah(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
