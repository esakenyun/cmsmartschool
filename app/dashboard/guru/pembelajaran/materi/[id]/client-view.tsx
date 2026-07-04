"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ClipboardList,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { Materi, Tugas, INITIAL_MATERI_LIST, INITIAL_TUGAS_LIST } from "../../mock-data";

// Import Shadcn Components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

interface MateriDetailClientProps {
  id: string;
}

export default function MateriDetailClient({ id }: MateriDetailClientProps) {
  const [loading, setLoading] = useState(true);
  const [materi, setMateri] = useState<Materi | null>(null);
  const [relatedTugas, setRelatedTugas] = useState<Tugas[]>([]);
  const [showAddTugas, setShowAddTugas] = useState(false);

  // Form states
  const [newClassGroup, setNewClassGroup] = useState("7-A");
  const [newDueDate, setNewDueDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    // 1. Load Materi
    const storedMateri = localStorage.getItem("guru_materi_list");
    let loadedMateriList: Materi[] = [];
    if (storedMateri) {
      loadedMateriList = JSON.parse(storedMateri);
    } else {
      loadedMateriList = INITIAL_MATERI_LIST;
      localStorage.setItem("guru_materi_list", JSON.stringify(INITIAL_MATERI_LIST));
    }
    const foundMateri = loadedMateriList.find((m) => m.id === id);
    setMateri(foundMateri || null);

    // 2. Load Tugas
    const storedTugas = localStorage.getItem("guru_tugas_list");
    let loadedTugasList: Tugas[] = [];
    if (storedTugas) {
      loadedTugasList = JSON.parse(storedTugas);
    } else {
      loadedTugasList = INITIAL_TUGAS_LIST;
      localStorage.setItem("guru_tugas_list", JSON.stringify(INITIAL_TUGAS_LIST));
    }
    const filteredTugas = loadedTugasList.filter((t) => t.materiId === id);
    setRelatedTugas(filteredTugas);

    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleToggleStatus = () => {
    if (!materi) return;
    const storedMateri = localStorage.getItem("guru_materi_list");
    if (!storedMateri) return;
    const list: Materi[] = JSON.parse(storedMateri);
    const updatedStatus = materi.status === "Published" ? "Draft" : "Published";

    const updatedList = list.map((m) => {
      if (m.id === id) {
        return { ...m, status: updatedStatus };
      }
      return m;
    });

    localStorage.setItem("guru_materi_list", JSON.stringify(updatedList));
    setMateri({ ...materi, status: updatedStatus });
    toast.success(`Status materi diubah menjadi ${updatedStatus}`);
  };

  const handleAddTugas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!materi) return;

    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const descInput = form.elements.namedItem("description") as HTMLTextAreaElement;

    if (!titleInput.value || !newDueDate) {
      toast.error("Harap isi semua kolom wajib!");
      return;
    }

    const storedTugas = localStorage.getItem("guru_tugas_list");
    const currentTugasList: Tugas[] = storedTugas ? JSON.parse(storedTugas) : INITIAL_TUGAS_LIST;

    const newTugas: Tugas = {
      id: `tugas-${Date.now()}`,
      title: titleInput.value,
      classGroup: newClassGroup,
      dueDate: newDueDate.toISOString(),
      submittedCount: 0,
      totalStudents: 30,
      status: "Draft",
      materiId: id,
      description: descInput.value || "Tugas pengerjaan berdasarkan materi terkait.",
    };

    const updated = [newTugas, ...currentTugasList];
    localStorage.setItem("guru_tugas_list", JSON.stringify(updated));
    setRelatedTugas((prev) => [newTugas, ...prev]);
    toast.success(`Tugas "${newTugas.title}" berhasil dibuat untuk materi ini!`);
    setShowAddTugas(false);
    form.reset();
    setNewClassGroup("7-A");
    setNewDueDate(undefined);
  };

  const handleDeleteTugas = (tugasId: string, title: string) => {
    const storedTugas = localStorage.getItem("guru_tugas_list");
    if (!storedTugas) return;
    const currentTugasList: Tugas[] = JSON.parse(storedTugas);
    const updated = currentTugasList.filter((t) => t.id !== tugasId);
    localStorage.setItem("guru_tugas_list", JSON.stringify(updated));
    setRelatedTugas((prev) => prev.filter((t) => t.id !== tugasId));
    toast.success(`Tugas "${title}" berhasil dihapus.`);
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
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!materi) {
    return (
      <div className="space-y-6 text-center py-12">
        <h4 className="text-xl font-bold text-slate-800">Materi tidak ditemukan</h4>
        <p className="text-slate-500">Materi yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link
          href="/dashboard/guru/pembelajaran/materi"
          className="inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-all"
        >
          <ArrowLeft size={16} /> Kembali ke Daftar Materi
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Button */}
      <div>
        <Link
          href="/dashboard/guru/pembelajaran/materi"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium transition-all"
        >
          <ArrowLeft size={16} /> Kembali ke Daftar Materi
        </Link>
      </div>

      {/* Main Material Detail Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 font-semibold mb-2">
              {materi.category} • {materi.type}
            </span>
            <h2 className="text-2xl font-bold text-slate-900">{materi.title}</h2>
            <p className="text-xs text-slate-400 mt-1">Diunggah pada: {materi.dateAdded}</p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleToggleStatus}
              className={`flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                materi.status === "Published"
                  ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                  : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
              }`}
            >
              {materi.status === "Published" ? (
                <>
                  <Eye size={14} /> Published
                </>
              ) : (
                <>
                  <EyeOff size={14} /> Draft / Private
                </>
              )}
            </button>

            <a
              href={materi.link}
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all"
            >
              <ExternalLink size={14} /> Buka Tautan
            </a>
          </div>
        </div>

        <div className="pt-5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Deskripsi Materi</h4>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
            {materi.description}
          </p>
        </div>
      </div>

      {/* Related Assignments (Tugas Terkait) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
                Tugas Terkait ({relatedTugas.length})
              </h3>
              {!showAddTugas && (
                <button
                  onClick={() => setShowAddTugas(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                >
                  <Plus size={14} /> Tambah Tugas Terkait
                </button>
              )}
            </div>

            {/* List of related assignments */}
            <div className="space-y-3">
              {relatedTugas.map((tugas) => (
                <div
                  key={tugas.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-all gap-4"
                >
                  <div>
                    <Link
                      href={`/dashboard/guru/pembelajaran/tugas/${tugas.id}`}
                      className="font-bold text-slate-800 hover:text-emerald-600 hover:underline transition-all text-sm"
                    >
                      {tugas.title}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span>Kelas: {tugas.classGroup}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> Tenggat: {formatDateString(tugas.dueDate)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                      <Users size={12} className="text-slate-400" />
                      {tugas.submittedCount} / {tugas.totalStudents} Kumpul
                    </div>

                    <div className="flex items-center gap-1">
                      <Link
                        href={`/dashboard/guru/pembelajaran/tugas/${tugas.id}`}
                        className="text-xs font-semibold text-emerald-600 hover:underline bg-white hover:bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-all"
                      >
                        Detail & Nilai
                      </Link>
                      <button
                        onClick={() => handleDeleteTugas(tugas.id, tugas.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Tugas"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {relatedTugas.length === 0 && (
                <div className="text-center py-8 text-slate-400 italic text-sm">
                  Belum ada tugas yang dikaitkan dengan materi ini.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Assignment form specific to this Material */}
        {showAddTugas && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                Buat Tugas Terkait
              </h4>
              <button
                onClick={() => setShowAddTugas(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
              >
                Batal
              </button>
            </div>
            <form onSubmit={handleAddTugas} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Nama Tugas <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="text"
                  name="title"
                  required
                  placeholder="Contoh: Laporan Praktikum"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Pilih Kelas
                </label>
                <Select value={newClassGroup} onValueChange={setNewClassGroup}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Pilih Kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7-A">Kelas 7-A</SelectItem>
                    <SelectItem value="7-B">Kelas 7-B</SelectItem>
                    <SelectItem value="7-C">Kelas 7-C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Tenggat Waktu <span className="text-rose-500">*</span>
                </label>
                <DatePicker
                  value={newDueDate}
                  onChange={setNewDueDate}
                  placeholder="Pilih Tenggat"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Deskripsi / Instruksi
                </label>
                <Textarea
                  name="description"
                  rows={3}
                  placeholder="Petunjuk pengerjaan bagi siswa..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 active:scale-98 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus size={16} /> Buat & Simpan Draft
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
