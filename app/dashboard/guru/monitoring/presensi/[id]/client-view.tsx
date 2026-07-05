"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Pencil,
  Info,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { toast } from "sonner";

// Import Shadcn Components
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface PresensiRecord {
  id: string;
  date: string;
  studentName: string;
  classGroup: string;
  status: "Hadir" | "Sakit" | "Izin" | "Alpa";
  notes?: string;
}

interface PresensiDetailClientProps {
  studentNameParam: string;
}

export default function PresensiDetailClient({
  studentNameParam,
}: PresensiDetailClientProps) {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);
  const [studentLogs, setStudentLogs] = useState<PresensiRecord[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    hadir: 0,
    sakit: 0,
    izin: 0,
    alpa: 0,
    rate: 100,
  });

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PresensiRecord | null>(null);
  const [editStatus, setEditStatus] = useState<"Hadir" | "Sakit" | "Izin" | "Alpa">("Hadir");
  const [editNotes, setEditNotes] = useState("");

  const loadData = () => {
    const decodedName = decodeURIComponent(studentNameParam);
    const foundStudent = STUDENTS_LIST.find((s) => s.name === decodedName);
    setStudent(foundStudent || null);

    if (foundStudent) {
      const stored = localStorage.getItem("guru_presensi_logs");
      const allLogs: PresensiRecord[] = stored ? JSON.parse(stored) : [];
      
      // Filter logs for this specific student and sort by date descending
      const filtered = allLogs
        .filter((l) => l.studentName === foundStudent.name)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setStudentLogs(filtered);

      const total = filtered.length;
      const hadir = filtered.filter((l) => l.status === "Hadir").length;
      const sakit = filtered.filter((l) => l.status === "Sakit").length;
      const izin = filtered.filter((l) => l.status === "Izin").length;
      const alpa = filtered.filter((l) => l.status === "Alpa").length;
      const rate = total > 0 ? Math.round((hadir / total) * 100) : 100;

      setStats({ total, hadir, sakit, izin, alpa, rate });
    }
  };

  useEffect(() => {
    loadData();
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [studentNameParam]);

  const handleStartEdit = (record: PresensiRecord) => {
    setSelectedRecord(record);
    setEditStatus(record.status);
    setEditNotes(record.notes || "");
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord) return;

    const stored = localStorage.getItem("guru_presensi_logs");
    const allLogs: PresensiRecord[] = stored ? JSON.parse(stored) : [];

    const updatedLogs = allLogs.map((l) => {
      if (l.id === selectedRecord.id) {
        return {
          ...l,
          status: editStatus,
          notes: editStatus === "Hadir" ? undefined : editNotes,
        };
      }
      return l;
    });

    localStorage.setItem("guru_presensi_logs", JSON.stringify(updatedLogs));
    toast.success(`Data kehadiran tanggal ${formatDateString(selectedRecord.date)} berhasil diperbarui.`);
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
          Data detail kehadiran siswa ini tidak dapat ditemukan.
        </p>
        <Link
          href="/dashboard/guru/monitoring/presensi"
          className="inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-all"
        >
          <ArrowLeft size={16} /> Kembali ke Presensi
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Button */}
      <div>
        <Link
          href="/dashboard/guru/monitoring/presensi"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium transition-all"
        >
          <ArrowLeft size={16} /> Kembali ke Presensi
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
              Kelas {student.classGroup} • Rekapitulasi & Riwayat Kehadiran Harian
            </p>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Attendance Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between col-span-2 md:col-span-1">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Tingkat Hadir</span>
            <span className={`text-3xl font-bold mt-1 block ${stats.rate >= 90 ? "text-emerald-600" : "text-amber-600"}`}>
              {stats.rate}%
            </span>
          </div>
          <div className={`p-3 rounded-xl ${stats.rate >= 90 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
            <UserCheck size={20} />
          </div>
        </div>

        {/* Hadir */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Hadir</span>
            <span className="text-3xl font-bold text-slate-800 mt-1 block">{stats.hadir}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-slate-700">
            <CheckCircle2 size={20} />
          </div>
        </div>

        {/* Sakit */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Sakit</span>
            <span className="text-3xl font-bold text-amber-600 mt-1 block">{stats.sakit}</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <Info size={20} />
          </div>
        </div>

        {/* Izin */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Izin</span>
            <span className="text-3xl font-bold text-blue-600 mt-1 block">{stats.izin}</span>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Calendar size={20} />
          </div>
        </div>

        {/* Alpa */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Alpa</span>
            <span className="text-3xl font-bold text-rose-600 mt-1 block">{stats.alpa}</span>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
            <AlertCircle size={20} />
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          Riwayat Kehadiran Siswa
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Hari</th>
                <th className="pb-3 font-semibold">Tanggal</th>
                <th className="pb-3 font-semibold text-center">Status</th>
                <th className="pb-3 font-semibold">Keterangan</th>
                <th className="pb-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentLogs.map((record, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 pr-2 font-semibold text-slate-700">
                    {getDayName(record.date)}
                  </td>
                  <td className="py-3.5 pr-2 text-slate-600 text-xs">
                    {formatDateString(record.date)}
                  </td>
                  <td className="py-3.5 text-center pr-2">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        record.status === "Hadir"
                          ? "bg-green-50 text-green-700 border border-green-100"
                          : record.status === "Sakit"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : record.status === "Izin"
                          ? "bg-blue-50 text-blue-700 border border-blue-100"
                          : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-600">
                    {record.notes ? (
                      <span className="text-slate-800">{record.notes}</span>
                    ) : record.status === "Hadir" ? (
                      <span className="text-slate-400 italic text-xs">Hadir tepat waktu</span>
                    ) : (
                      <span className="text-slate-400 italic text-xs">-</span>
                    )}
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => handleStartEdit(record)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Presensi"
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {studentLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 italic">
                    Belum ada riwayat presensi yang terekam untuk siswa ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Single Attendance Record Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Ubah Kehadiran Siswa
            </DialogTitle>
            <DialogDescription>
              Ubah status presensi {student.name} untuk tanggal {selectedRecord ? formatDateString(selectedRecord.date) : ""}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveEdit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                Status Kehadiran
              </label>
              <Select
                value={editStatus}
                onValueChange={(val: "Hadir" | "Sakit" | "Izin" | "Alpa") => setEditStatus(val)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hadir">Hadir</SelectItem>
                  <SelectItem value="Sakit">Sakit</SelectItem>
                  <SelectItem value="Izin">Izin</SelectItem>
                  <SelectItem value="Alpa">Alpa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {editStatus !== "Hadir" && (
              <div className="animate-in fade-in duration-200">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Keterangan Alasan
                </label>
                <Input
                  type="text"
                  placeholder="Contoh: Sakit demam, Izin acara keluarga, dll."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
            )}

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
