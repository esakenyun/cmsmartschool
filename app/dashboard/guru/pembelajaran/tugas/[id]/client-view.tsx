"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ClipboardList,
  CheckCircle2,
  Users,
  Award,
  Book,
} from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import {
  Tugas,
  Materi,
  Submission,
  INITIAL_MATERI_LIST,
  INITIAL_TUGAS_LIST,
  MOCK_SUBMISSIONS,
} from "../../mock-data";

// Import Shadcn Components
import { Input } from "@/components/ui/input";

interface TugasDetailClientProps {
  id: string;
}

export default function TugasDetailClient({ id }: TugasDetailClientProps) {
  const [loading, setLoading] = useState(true);
  const [tugas, setTugas] = useState<Tugas | null>(null);
  const [relatedMateri, setRelatedMateri] = useState<Materi | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editingSubmissionId, setEditingSubmissionId] = useState<string | null>(null);
  const [tempGrade, setTempGrade] = useState<string>("");

  useEffect(() => {
    // 1. Load Tugas
    const storedTugas = localStorage.getItem("guru_tugas_list");
    let loadedTugasList: Tugas[] = [];
    if (storedTugas) {
      loadedTugasList = JSON.parse(storedTugas);
    } else {
      loadedTugasList = INITIAL_TUGAS_LIST;
      localStorage.setItem("guru_tugas_list", JSON.stringify(INITIAL_TUGAS_LIST));
    }
    const foundTugas = loadedTugasList.find((t) => t.id === id);
    setTugas(foundTugas || null);

    // 2. Load Materi list to find relationship
    if (foundTugas) {
      const storedMateri = localStorage.getItem("guru_materi_list");
      let loadedMateriList: Materi[] = [];
      if (storedMateri) {
        loadedMateriList = JSON.parse(storedMateri);
      } else {
        loadedMateriList = INITIAL_MATERI_LIST;
        localStorage.setItem("guru_materi_list", JSON.stringify(INITIAL_MATERI_LIST));
      }
      const foundMateri = loadedMateriList.find((m) => m.id === foundTugas.materiId);
      setRelatedMateri(foundMateri || null);
    }

    // 3. Load Submissions for this Tugas
    const storedSubmissions = localStorage.getItem(`submissions_${id}`);
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    } else {
      const initialSubs = MOCK_SUBMISSIONS[id] || [
        { id: "sub-d1", studentName: "Siswa A", submittedAt: "04 Jul 2026", status: "Needs Grading" },
        { id: "sub-d2", studentName: "Siswa B", submittedAt: "-", status: "Not Submitted" },
      ];
      setSubmissions(initialSubs);
      localStorage.setItem(`submissions_${id}`, JSON.stringify(initialSubs));
    }

    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleToggleStatus = () => {
    if (!tugas) return;
    const storedTugas = localStorage.getItem("guru_tugas_list");
    if (!storedTugas) return;
    const list: Tugas[] = JSON.parse(storedTugas);
    
    // Rotate status
    const statusOrder: ("Aktif" | "Selesai" | "Draft")[] = ["Draft", "Aktif", "Selesai"];
    const nextIndex = (statusOrder.indexOf(tugas.status) + 1) % statusOrder.length;
    const nextStatus = statusOrder[nextIndex];

    const updatedList = list.map((t) => {
      if (t.id === id) {
        return { ...t, status: nextStatus };
      }
      return t;
    });

    localStorage.setItem("guru_tugas_list", JSON.stringify(updatedList));
    setTugas({ ...tugas, status: nextStatus });
    toast.success(`Status tugas diubah menjadi ${nextStatus}`);
  };

  const handleStartEditGrade = (sub: Submission) => {
    setEditingSubmissionId(sub.id);
    setTempGrade(sub.grade !== undefined ? sub.grade.toString() : "");
  };

  const handleSaveGrade = (subId: string) => {
    const gradeNum = parseInt(tempGrade, 10);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      toast.error("Masukkan nilai yang valid antara 0 - 100");
      return;
    }

    const updatedSubmissions = submissions.map((sub) => {
      if (sub.id === subId) {
        return {
          ...sub,
          grade: gradeNum,
          status: "Graded" as const,
        };
      }
      return sub;
    });

    setSubmissions(updatedSubmissions);
    localStorage.setItem(`submissions_${id}`, JSON.stringify(updatedSubmissions));
    setEditingSubmissionId(null);
    toast.success("Nilai berhasil disimpan!");

    // Dynamically update the submittedCount in the parent tugas if needed
    const submittedCount = updatedSubmissions.filter((s) => s.status !== "Not Submitted").length;
    if (tugas) {
      const storedTugas = localStorage.getItem("guru_tugas_list");
      if (storedTugas) {
        const list: Tugas[] = JSON.parse(storedTugas);
        const updatedList = list.map((t) => {
          if (t.id === id) {
            return { ...t, submittedCount };
          }
          return t;
        });
        localStorage.setItem("guru_tugas_list", JSON.stringify(updatedList));
        setTugas({ ...tugas, submittedCount });
      }
    }
  };

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
        <CardSkeleton />
        <TableSkeleton />
      </div>
    );
  }

  if (!tugas) {
    return (
      <div className="space-y-6 text-center py-12">
        <h4 className="text-xl font-bold text-slate-800">Tugas tidak ditemukan</h4>
        <p className="text-slate-500">Tugas yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link
          href="/dashboard/guru/pembelajaran/tugas"
          className="inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-all"
        >
          <ArrowLeft size={16} /> Kembali ke Daftar Tugas
        </Link>
      </div>
    );
  }

  const averageGrade = (() => {
    const graded = submissions.filter((s) => s.status === "Graded" && s.grade !== undefined);
    if (graded.length === 0) return "-";
    const sum = graded.reduce((acc, curr) => acc + (curr.grade || 0), 0);
    return Math.round(sum / graded.length);
  })();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Button */}
      <div>
        <Link
          href="/dashboard/guru/pembelajaran/tugas"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium transition-all"
        >
          <ArrowLeft size={16} /> Kembali ke Daftar Tugas
        </Link>
      </div>

      {/* Main Assignment Details */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 font-semibold">
                Kelas: {tugas.classGroup}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                <Calendar size={12} /> Tenggat: {formatDateString(tugas.dueDate)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">{tugas.title}</h2>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleToggleStatus}
              className={`flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                tugas.status === "Aktif"
                  ? "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100"
                  : tugas.status === "Selesai"
                  ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
              title="Klik untuk ubah status"
            >
              Status: {tugas.status}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="pt-4 border-b border-slate-100 pb-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Instruksi Tugas</h4>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
            {tugas.description}
          </p>
        </div>

        {/* Related Material Relationship */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Materi Ajar Rujukan</p>
              {relatedMateri ? (
                <Link
                  href={`/dashboard/guru/pembelajaran/materi/${relatedMateri.id}`}
                  className="text-sm font-bold text-slate-800 hover:text-emerald-600 hover:underline transition-all"
                >
                  {relatedMateri.title}
                </Link>
              ) : (
                <p className="text-sm font-bold text-slate-400 italic">Materi tidak ditemukan</p>
              )}
            </div>
          </div>
          {relatedMateri && (
            <Link
              href={`/dashboard/guru/pembelajaran/materi/${relatedMateri.id}`}
              className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 bg-emerald-50/50 px-2.5 py-1.5 rounded-lg border border-emerald-100"
            >
              Lihat Rujukan Materi <Book size={12} />
            </Link>
          )}
        </div>
      </div>

      {/* Stats and Submission Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of Submissions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              Daftar Pengumpulan Siswa
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead>
                  <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Nama Siswa</th>
                    <th className="pb-3 font-semibold">Tanggal Kirim</th>
                    <th className="pb-3 font-semibold text-center">Status</th>
                    <th className="pb-3 font-semibold text-right">Nilai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 font-semibold text-slate-800 pr-2">{sub.studentName}</td>
                      <td className="py-3.5 text-slate-500 text-xs pr-2">{sub.submittedAt}</td>
                      <td className="py-3.5 text-center pr-2">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            sub.status === "Graded"
                              ? "bg-green-50 text-green-700"
                              : sub.status === "Needs Grading"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {sub.status === "Graded"
                            ? "Sudah Dinilai"
                            : sub.status === "Needs Grading"
                            ? "Perlu Dinilai"
                            : "Belum Kumpul"}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        {editingSubmissionId === sub.id ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={tempGrade}
                              onChange={(e) => setTempGrade(e.target.value)}
                              className="w-16 h-8 text-center text-xs"
                            />
                            <button
                              onClick={() => handleSaveGrade(sub.id)}
                              className="px-2 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors cursor-pointer"
                            >
                              Simpan
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            {sub.grade !== undefined ? (
                              <span className="font-bold text-slate-800 text-sm">{sub.grade}</span>
                            ) : (
                              <span className="text-slate-400 italic text-xs">-</span>
                            )}
                            {sub.status !== "Not Submitted" && (
                              <button
                                onClick={() => handleStartEditGrade(sub)}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded transition-colors cursor-pointer"
                              >
                                <Award size={12} /> {sub.grade !== undefined ? "Ubah" : "Nilai"}
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Statistics */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Statistik Kelas
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Rata-rata Kelas</span>
                <span className="font-bold text-slate-800 text-lg bg-slate-50 px-2.5 py-0.5 rounded-lg border border-slate-100">
                  {averageGrade}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Pengumpulan</span>
                <span className="font-bold text-slate-800">
                  {submissions.filter((s) => s.status !== "Not Submitted").length} / {submissions.length} siswa
                </span>
              </div>

              <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Selesai Dinilai</span>
                <span className="font-bold text-green-600">
                  {submissions.filter((s) => s.status === "Graded").length} / {submissions.filter((s) => s.status !== "Not Submitted").length} siswa
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Belum Dinilai</span>
                <span className="font-bold text-amber-600">
                  {submissions.filter((s) => s.status === "Needs Grading").length} siswa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
