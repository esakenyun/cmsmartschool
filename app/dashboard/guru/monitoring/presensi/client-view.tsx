"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, CheckCircle2, Plus,
  UserCheck, X, ChevronRight
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
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
  date: string; // YYYY-MM-DD
  studentName: string;
  classGroup: string;
  status: "Hadir" | "Sakit" | "Izin" | "Alpa";
  notes?: string;
}

const SEED_LOGS: PresensiRecord[] = [];
// Generate mock data for the last 5 days
const dates = ["2026-07-01", "2026-07-02", "2026-07-03", "2026-07-04", "2026-07-05"];
dates.forEach((d) => {
  STUDENTS_LIST.forEach((s, idx) => {
    // Randomize presence status
    let status: "Hadir" | "Sakit" | "Izin" | "Alpa" = "Hadir";
    let notes = "";
    if (idx === 2 && d === "2026-07-03") {
      status = "Sakit";
      notes = "Demam tinggi";
    } else if (idx === 5 && d === "2026-07-04") {
      status = "Izin";
      notes = "Acara keluarga di luar kota";
    } else if (idx === 8 && d === "2026-07-02") {
      status = "Alpa";
    }

    SEED_LOGS.push({
      id: `pres-${d}-${s.name.replace(/\s+/g, "-").toLowerCase()}`,
      date: d,
      studentName: s.name,
      classGroup: s.classGroup,
      status,
      notes,
    });
  });
});

export default function PresensiClientView() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua");
  const [logs, setLogs] = useState<PresensiRecord[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputDate, setInputDate] = useState<Date | undefined>(new Date());
  const [inputClass, setInputClass] = useState("7-A");
  
  // Selected students for the new attendance sheet
  const [selectedStudentCombobox, setSelectedStudentCombobox] = useState("");
  const [attendanceSheet, setAttendanceSheet] = useState<Array<{
    studentName: string;
    classGroup: string;
    hadir: boolean;
    status: "Hadir" | "Sakit" | "Izin" | "Alpa";
    notes: string;
  }>>([]);

  useEffect(() => {
    const stored = localStorage.getItem("guru_presensi_logs");
    if (stored) {
      setLogs(JSON.parse(stored));
    } else {
      setLogs(SEED_LOGS);
      localStorage.setItem("guru_presensi_logs", JSON.stringify(SEED_LOGS));
    }
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const saveLogs = (updated: PresensiRecord[]) => {
    setLogs(updated);
    localStorage.setItem("guru_presensi_logs", JSON.stringify(updated));
  };

  // Populate default students in sheet when class changes
  useEffect(() => {
    const filtered = STUDENTS_LIST.filter((s) => s.classGroup === inputClass);
    setAttendanceSheet(
      filtered.map((s) => ({
        studentName: s.name,
        classGroup: s.classGroup,
        hadir: true,
        status: "Hadir",
        notes: "",
      }))
    );
    setSelectedStudentCombobox("");
  }, [inputClass, isModalOpen]);

  // Compute student stats based on all logs
  const getStudentStats = (studentName: string) => {
    const studentLogs = logs.filter((l) => l.studentName === studentName);
    const total = studentLogs.length;
    const hadir = studentLogs.filter((l) => l.status === "Hadir").length;
    const sakit = studentLogs.filter((l) => l.status === "Sakit").length;
    const izin = studentLogs.filter((l) => l.status === "Izin").length;
    const alpa = studentLogs.filter((l) => l.status === "Alpa").length;
    const rate = total > 0 ? Math.round((hadir / total) * 100) : 100;

    return { total, hadir, sakit, izin, alpa, rate };
  };

  // Add student from combobox list if not already in sheet
  const handleAddStudentFromCombobox = (val: string) => {
    if (!val) return;
    const alreadyExists = attendanceSheet.some((item) => item.studentName === val);
    if (alreadyExists) {
      toast.warning(`${val} sudah ada di dalam lembar presensi.`);
      return;
    }
    const studentInfo = STUDENTS_LIST.find((s) => s.name === val);
    if (studentInfo) {
      setAttendanceSheet((prev) => [
        ...prev,
        {
          studentName: studentInfo.name,
          classGroup: studentInfo.classGroup,
          hadir: true,
          status: "Hadir",
          notes: "",
        },
      ]);
      toast.success(`${val} ditambahkan ke lembar presensi.`);
    }
    setSelectedStudentCombobox("");
  };

  // Remove student from sheet
  const handleRemoveStudentFromSheet = (name: string) => {
    setAttendanceSheet((prev) => prev.filter((item) => item.studentName !== name));
  };

  const handleToggleHadir = (idx: number, checked: boolean) => {
    setAttendanceSheet((prev) => {
      const copy = [...prev];
      copy[idx].hadir = checked;
      if (checked) {
        copy[idx].status = "Hadir";
        copy[idx].notes = "";
      } else {
        copy[idx].status = "Sakit"; // default absent status
      }
      return copy;
    });
  };

  const handleStatusChange = (idx: number, newStatus: "Sakit" | "Izin" | "Alpa") => {
    setAttendanceSheet((prev) => {
      const copy = [...prev];
      copy[idx].status = newStatus;
      return copy;
    });
  };

  const handleNotesChange = (idx: number, text: string) => {
    setAttendanceSheet((prev) => {
      const copy = [...prev];
      copy[idx].notes = text;
      return copy;
    });
  };

  const handleSubmitPresensi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputDate) {
      toast.error("Harap tentukan tanggal presensi!");
      return;
    }

    const dateStr = inputDate.toISOString().split("T")[0];

    // Filter out existing logs for this date and class to avoid duplicate records
    let updatedLogs = logs.filter(
      (l) => !(l.date === dateStr && l.classGroup === inputClass)
    );

    // Append new records
    attendanceSheet.forEach((item) => {
      updatedLogs.push({
        id: `pres-${dateStr}-${item.studentName.replace(/\s+/g, "-").toLowerCase()}`,
        date: dateStr,
        studentName: item.studentName,
        classGroup: item.classGroup,
        status: item.hadir ? "Hadir" : item.status,
        notes: item.hadir ? undefined : item.notes,
      });
    });

    saveLogs(updatedLogs);
    toast.success(`Presensi Kelas ${inputClass} tanggal ${dateStr} berhasil disimpan!`);
    setIsModalOpen(false);
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

  // Available students in combobox based on the selected class group that are NOT currently in the sheet
  const availableStudentsForCombobox = STUDENTS_LIST.filter(
    (s) => s.classGroup === inputClass && !attendanceSheet.some((item) => item.studentName === s.name)
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header section */}
      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-emerald-900 font-bold text-xl flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-emerald-600" />
            Monitoring Presensi Siswa
          </h3>
          <p className="text-emerald-700 text-sm mt-1">
            Pantau ringkasan tingkat kehadiran harian siswa dan input data absensi kelas.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-xs transition-colors active:scale-98 w-full md:w-auto cursor-pointer"
          >
            <Plus size={16} />
            Input Presensi Harian
          </button>
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
          const stats = getStudentStats(student.name);

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

                {/* Presence Summary */}
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Tingkat Kehadiran</span>
                    <span className={`font-bold ${stats.rate >= 90 ? "text-emerald-600" : "text-amber-600"}`}>
                      {stats.rate}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        stats.rate >= 90 ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${stats.rate}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Hadir</span>
                      <span className="text-sm font-bold text-slate-700 mt-0.5 block">{stats.hadir}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Sakit</span>
                      <span className="text-sm font-bold text-amber-600 mt-0.5 block">{stats.sakit}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Izin</span>
                      <span className="text-sm font-bold text-blue-600 mt-0.5 block">{stats.izin}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Alpa</span>
                      <span className="text-sm font-bold text-rose-600 mt-0.5 block">{stats.alpa}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={`/dashboard/guru/monitoring/presensi/${encodeURIComponent(student.name)}`}
                className="w-full border-t border-slate-100 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 py-3 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border-t border-slate-100"
              >
                Lihat Detail Presensi <ChevronRight size={14} />
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

      {/* Input Presensi Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              Input Presensi Harian
            </DialogTitle>
            <DialogDescription>
              Tentukan tanggal, kelas, dan status kehadiran siswa. Gunakan combobox untuk menambahkan siswa spesifik.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitPresensi} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Tanggal Presensi
                </label>
                <DatePicker value={inputDate} onChange={setInputDate} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Pilih Kelas
                </label>
                <Select value={inputClass} onValueChange={setInputClass}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Pilih Kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7-A">Kelas 7-A</SelectItem>
                    <SelectItem value="7-B">Kelas 7-B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Combobox Student Selector */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                Pilih Siswa (Combobox)
              </label>
              <Select value={selectedStudentCombobox} onValueChange={handleAddStudentFromCombobox}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Pilih atau tambah siswa ke lembar..." />
                </SelectTrigger>
                <SelectContent>
                  {availableStudentsForCombobox.length === 0 ? (
                    <SelectItem value="_empty" disabled>
                      Semua siswa kelas ini sudah ada di dalam lembar
                    </SelectItem>
                  ) : (
                    availableStudentsForCombobox.map((s) => (
                      <SelectItem key={s.name} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Attendance Input List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
                Lembar Presensi Siswa ({attendanceSheet.length})
              </h4>
              <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-1">
                {attendanceSheet.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2.5 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800">{item.studentName}</span>
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                          {item.classGroup}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1 text-xs font-bold text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.hadir}
                            onChange={(e) => handleToggleHadir(idx, e.target.checked)}
                            className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                          />
                          Hadir
                        </label>
                        <button
                          type="button"
                          onClick={() => handleRemoveStudentFromSheet(item.studentName)}
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                          title="Hapus dari lembar"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Absent detail input showing if uncheck (hadir is false) */}
                    {!item.hadir && (
                      <div className="grid grid-cols-3 gap-2 items-center animate-in fade-in duration-200">
                        <div>
                          <Select
                            value={item.status}
                            onValueChange={(val: any) => handleStatusChange(idx, val)}
                          >
                            <SelectTrigger className="bg-white text-xs h-8">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Sakit">Sakit</SelectItem>
                              <SelectItem value="Izin">Izin</SelectItem>
                              <SelectItem value="Alpa">Alpa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="text"
                            placeholder={`Keterangan ${item.studentName}`}
                            value={item.notes}
                            onChange={(e) => handleNotesChange(idx, e.target.value)}
                            className="h-8 text-xs bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {attendanceSheet.length === 0 && (
                  <p className="text-center py-6 text-slate-400 italic text-xs">
                    Belum ada siswa di lembar presensi. Pilih siswa dari combobox di atas.
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 mt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={attendanceSheet.length === 0}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 size={16} />
                Simpan Presensi
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
