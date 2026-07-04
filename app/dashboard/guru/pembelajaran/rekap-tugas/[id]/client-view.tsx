"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle2,
  FileText,
  GraduationCap,
  XCircle,
  ExternalLink,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import {
  INITIAL_TUGAS_LIST,
  INITIAL_MATERI_LIST,
  MOCK_SUBMISSIONS,
  Tugas,
  Submission,
  Materi,
} from "../../mock-data";

interface RekapTugasDetailClientProps {
  submissionId: string; // This holds the encoded student name
}

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

export default function RekapTugasDetailClient({
  submissionId,
}: RekapTugasDetailClientProps) {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);
  const [tugasList, setTugasList] = useState<Tugas[]>([]);
  const [materiList, setMateriList] = useState<Materi[]>([]);
  const [studentTasks, setStudentTasks] = useState<Array<{
    tugasId: string;
    tugasTitle: string;
    dueDate: string;
    submittedAt: string;
    status: "Graded" | "Needs Grading" | "Not Submitted";
    grade?: number;
    mapel: string;
  }>>([]);

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedCount: 0,
    averageGrade: 0,
    missedCount: 0,
  });

  useEffect(() => {
    const studentName = decodeURIComponent(submissionId);
    const foundStudent = STUDENTS_LIST.find((s) => s.name === studentName);
    setStudent(foundStudent || null);

    if (foundStudent) {
      // 1. Load Tugas list
      const storedTugas = localStorage.getItem("guru_tugas_list");
      const loadedTugasList: Tugas[] = storedTugas ? JSON.parse(storedTugas) : INITIAL_TUGAS_LIST;
      setTugasList(loadedTugasList);

      // 2. Load Materi list
      const storedMateri = localStorage.getItem("guru_materi_list");
      const loadedMateriList: Materi[] = storedMateri ? JSON.parse(storedMateri) : INITIAL_MATERI_LIST;
      setMateriList(loadedMateriList);

      // Filter tasks assigned to student's class
      const classTasks = loadedTugasList.filter((t) => t.classGroup === foundStudent.classGroup);

      let completedCount = 0;
      let gradedCount = 0;
      let totalGrade = 0;

      const tasksData = classTasks.map((t) => {
        // Resolve subject
        const linkedMateri = loadedMateriList.find((m) => m.id === t.materiId);
        const mapel = linkedMateri ? linkedMateri.category : "Umum";

        // Find submission
        const storedSub = localStorage.getItem(`submissions_${t.id}`);
        const subs: Submission[] = storedSub ? JSON.parse(storedSub) : (MOCK_SUBMISSIONS[t.id] || []);
        const foundSub = subs.find((s) => s.studentName === foundStudent.name);

        if (foundSub) {
          if (foundSub.status !== "Not Submitted") {
            completedCount++;
          }
          if (foundSub.status === "Graded" && foundSub.grade !== undefined) {
            gradedCount++;
            totalGrade += foundSub.grade;
          }
          return {
            tugasId: t.id,
            tugasTitle: t.title,
            dueDate: t.dueDate,
            submittedAt: foundSub.submittedAt,
            status: foundSub.status,
            grade: foundSub.grade,
            mapel,
          };
        } else {
          return {
            tugasId: t.id,
            tugasTitle: t.title,
            dueDate: t.dueDate,
            submittedAt: "-",
            status: "Not Submitted" as const,
            mapel,
          };
        }
      });

      setStudentTasks(tasksData);
      setStats({
        totalTasks: classTasks.length,
        completedCount,
        averageGrade: gradedCount > 0 ? Math.round(totalGrade / gradedCount) : 0,
        missedCount: classTasks.length - completedCount,
      });
    }

    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [submissionId]);

  const formatDateString = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          Data detail rekap tugas untuk siswa ini tidak dapat ditemukan.
        </p>
        <Link
          href="/dashboard/guru/pembelajaran/rekap-tugas"
          className="inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-all cursor-pointer"
        >
          <ArrowLeft size={16} /> Kembali ke Rekap Tugas
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Button */}
      <div>
        <Link
          href="/dashboard/guru/pembelajaran/rekap-tugas"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium transition-all"
        >
          <ArrowLeft size={16} /> Kembali ke Rekap Tugas
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
              Kelas {student.classGroup} • Rekapitulasi Pembelajaran & Evaluasi Tugas
            </p>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Tugas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Total Tugas</span>
            <span className="text-3xl font-bold text-slate-900 mt-1 block">{stats.totalTasks}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-slate-600">
            <FileText size={20} />
          </div>
        </div>

        {/* Terkumpul */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Terkumpul</span>
            <span className="text-3xl font-bold text-emerald-600 mt-1 block">{stats.completedCount}</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CheckCircle2 size={20} />
          </div>
        </div>

        {/* Rata-rata Nilai */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Rata-rata Nilai</span>
            <span className="text-3xl font-bold text-blue-600 mt-1 block">
              {stats.averageGrade > 0 ? stats.averageGrade : "-"}
            </span>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Award size={20} />
          </div>
        </div>

        {/* Belum Kirim */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Belum Kirim</span>
            <span className="text-3xl font-bold text-rose-600 mt-1 block">{stats.missedCount}</span>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
            <XCircle size={20} />
          </div>
        </div>
      </div>

      {/* Full Task Summary Table */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          Daftar Nilai Tugas
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Nama Tugas</th>
                <th className="pb-3 font-semibold">Mata Pelajaran</th>
                <th className="pb-3 font-semibold">Tenggat</th>
                <th className="pb-3 font-semibold text-center">Tanggal Kirim</th>
                <th className="pb-3 font-semibold text-center">Status</th>
                <th className="pb-3 font-semibold text-right">Nilai</th>
                <th className="pb-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentTasks.map((task, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 pr-2">
                    <Link
                      href={`/dashboard/guru/pembelajaran/tugas/${task.tugasId}`}
                      className="font-semibold text-slate-800 hover:text-emerald-600 hover:underline transition-all"
                    >
                      {task.tugasTitle}
                    </Link>
                  </td>
                  <td className="py-3.5 pr-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600 font-medium">
                      {task.mapel}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2 text-slate-500 text-xs">
                    {formatDateString(task.dueDate)}
                  </td>
                  <td className="py-3.5 text-center pr-2 text-slate-500 text-xs">
                    {task.submittedAt}
                  </td>
                  <td className="py-3.5 text-center pr-2">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        task.status === "Graded"
                          ? "bg-green-50 text-green-700 border border-green-100"
                          : task.status === "Needs Grading"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}
                    >
                      {task.status === "Graded"
                        ? "Sudah Dinilai"
                        : task.status === "Needs Grading"
                        ? "Perlu Dinilai"
                        : "Belum Kumpul"}
                    </span>
                  </td>
                  <td className="py-3.5 text-right font-bold text-slate-800 pr-2">
                    {task.grade !== undefined ? (
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {task.grade}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-normal italic">-</span>
                    )}
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href={`/dashboard/guru/pembelajaran/tugas/${task.tugasId}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg transition-colors"
                    >
                      Buka Tugas <ChevronRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
              {studentTasks.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                    Belum ada tugas yang ditugaskan ke kelas siswa ini.
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
