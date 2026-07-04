"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ClipboardList,
  Plus,
  Search,
  Calendar,
  Users,
  Award,
  Trash2,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { INITIAL_MATERI_LIST, INITIAL_TUGAS_LIST, Materi, Tugas } from "../mock-data";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";

export default function TugasGuruContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [selectedMapel, setSelectedMapel] = useState("Semua");

  const [tugasList, setTugasList] = useState<Tugas[]>([]);
  const [materiList, setMateriList] = useState<Materi[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add form states
  const [newMateriId, setNewMateriId] = useState("");
  const [newClassGroup, setNewClassGroup] = useState("7-A");
  const [newDueDate, setNewDueDate] = useState<Date | undefined>(undefined);

  // Load from localStorage on mount
  useEffect(() => {
    // Load Materi
    const storedMateri = localStorage.getItem("guru_materi_list");
    let loadedMateri: Materi[] = [];
    if (storedMateri) {
      loadedMateri = JSON.parse(storedMateri);
      setMateriList(loadedMateri);
    } else {
      loadedMateri = INITIAL_MATERI_LIST;
      setMateriList(loadedMateri);
      localStorage.setItem("guru_materi_list", JSON.stringify(INITIAL_MATERI_LIST));
    }

    // Load Tugas
    const storedTugas = localStorage.getItem("guru_tugas_list");
    if (storedTugas) {
      setTugasList(JSON.parse(storedTugas));
    } else {
      setTugasList(INITIAL_TUGAS_LIST);
      localStorage.setItem("guru_tugas_list", JSON.stringify(INITIAL_TUGAS_LIST));
    }

    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const saveToStorage = (updated: Tugas[]) => {
    setTugasList(updated);
    localStorage.setItem("guru_tugas_list", JSON.stringify(updated));
  };

  const handleDelete = (id: string, title: string) => {
    const updated = tugasList.filter((item) => item.id !== id);
    saveToStorage(updated);
    toast.success(`Tugas "${title}" berhasil dihapus.`);
  };

  const handleAddTugas = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const descInput = form.elements.namedItem("description") as HTMLTextAreaElement;

    if (!titleInput.value || !newDueDate || !newMateriId) {
      toast.error("Harap isi semua kolom wajib!");
      return;
    }

    const newTugas: Tugas = {
      id: `tugas-${Date.now()}`,
      title: titleInput.value,
      classGroup: newClassGroup,
      dueDate: newDueDate.toISOString(),
      submittedCount: 0,
      totalStudents: 30,
      status: "Draft",
      materiId: newMateriId,
      description: descInput.value || "Selesaikan tugas ini berdasarkan materi yang ditautkan.",
    };

    const updated = [newTugas, ...tugasList];
    saveToStorage(updated);
    toast.success(`Tugas "${newTugas.title}" berhasil dibuat sebagai Draft!`);
    setIsModalOpen(false);
    form.reset();
    setNewMateriId("");
    setNewClassGroup("7-A");
    setNewDueDate(undefined);
  };

  const handleGradeTask = (id: string) => {
    router.push(`/dashboard/guru/pembelajaran/tugas/${id}`);
  };

  const getMateriTitle = (materiId: string) => {
    const materi = materiList.find((m) => m.id === materiId);
    return materi ? materi.title : "Materi tidak ditemukan";
  };

  const getMateriMapel = (materiId: string) => {
    const materi = materiList.find((m) => m.id === materiId);
    return materi ? materi.category : "-";
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

  // Get unique Mata Pelajaran lists dynamically from Materi categories
  const mapels = ["Semua", ...Array.from(new Set(materiList.map((m) => m.category)))];

  const filteredTugas = tugasList.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.classGroup.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "Semua" || t.status === selectedStatus;
    
    // Relational lookup for mapel (category)
    const linkedMateri = materiList.find((m) => m.id === t.materiId);
    const mapel = linkedMateri ? linkedMateri.category : "Umum";
    const matchesMapel = selectedMapel === "Semua" || mapel === selectedMapel;

    return matchesSearch && matchesStatus && matchesMapel;
  });

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Skeleton className="h-44 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <Skeleton className="h-10 w-full rounded-lg" />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header section */}
      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-emerald-900 font-bold text-xl flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-emerald-600" />
            Kelola Tugas & Penilaian
          </h3>
          <p className="text-emerald-700 text-sm mt-1">
            Buat tugas baru, pantau pengumpulan siswa, dan lakukan penilaian secara langsung. Setiap tugas dapat ditautkan ke materi ajar.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-xs transition-colors active:scale-98 w-full md:w-auto cursor-pointer"
          >
            <Plus size={16} />
            Tambah Tugas Baru
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium uppercase">Tugas Aktif</span>
          <h4 className="text-2xl font-bold text-slate-800 mt-1">
            {tugasList.filter((t) => t.status === "Aktif").length} Tugas
          </h4>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium uppercase">Menunggu Nilai</span>
          <h4 className="text-2xl font-bold text-amber-600 mt-1">
            {tugasList.filter((t) => t.submittedCount > 0 && t.status !== "Selesai").length} Tugas
          </h4>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium uppercase">Tugas Selesai</span>
          <h4 className="text-2xl font-bold text-emerald-600 mt-1">
            {tugasList.filter((t) => t.status === "Selesai").length} Tugas
          </h4>
        </div>
      </div>

      {/* Main Workspace - Full Width for Clean UI */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari tugas atau kelas..."
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

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[140px] bg-white">
                <SelectValue placeholder="Status Tugas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semua">Semua Status</SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Nama Tugas</th>
                <th className="pb-3 font-semibold">Mata Pelajaran</th>
                <th className="pb-3 font-semibold">Materi Terkait</th>
                <th className="pb-3 font-semibold">Tenggat Waktu</th>
                <th className="pb-3 font-semibold text-center">Pengumpulan</th>
                <th className="pb-3 font-semibold text-center">Status</th>
                <th className="pb-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredTugas.map((tugas) => (
                <tr key={tugas.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 pr-2">
                    <Link
                      href={`/dashboard/guru/pembelajaran/tugas/${tugas.id}`}
                      className="font-semibold text-slate-800 hover:text-emerald-600 hover:underline transition-all block"
                    >
                      {tugas.title}
                    </Link>
                    <div className="text-xs text-slate-400 mt-0.5">Kelas: {tugas.classGroup}</div>
                  </td>
                  <td className="py-3.5 pr-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600 font-medium">
                      {getMateriMapel(tugas.materiId)}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2">
                    <Link
                      href={`/dashboard/guru/pembelajaran/materi/${tugas.materiId}`}
                      className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:underline font-medium"
                    >
                      <BookOpen size={12} />
                      <span className="max-w-[120px] truncate">{getMateriTitle(tugas.materiId)}</span>
                    </Link>
                  </td>
                  <td className="py-3.5 pr-2">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-xs">{formatDateString(tugas.dueDate)}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-center pr-2">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                        <Users size={12} className="text-slate-400" />
                        {tugas.submittedCount} / {tugas.totalStudents}
                      </div>
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{
                            width: `${(tugas.submittedCount / (tugas.totalStudents || 1)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-center pr-2">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        tugas.status === "Aktif"
                          ? "bg-sky-50 text-sky-700"
                          : tugas.status === "Selesai"
                          ? "bg-green-50 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {tugas.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleGradeTask(tugas.id)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                        title="Detail & Nilai Tugas"
                      >
                        <Award size={14} /> Detail
                      </button>
                      <button
                        onClick={() => handleDelete(tugas.id, tugas.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTugas.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                    Tidak ada tugas yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog Modal for adding new task */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-600" />
              Buat Tugas Baru
            </DialogTitle>
            <DialogDescription>
              Lengkapi informasi di bawah ini untuk membuat tugas baru bagi siswa Anda.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTugas} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                Nama Tugas <span className="text-rose-500">*</span>
              </label>
              <Input
                type="text"
                name="title"
                required
                placeholder="Contoh: Latihan Soal Fotosintesis"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                Tautkan ke Materi <span className="text-rose-500">*</span>
              </label>
              <Select value={newMateriId} onValueChange={setNewMateriId}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Pilih Materi Ajar" />
                </SelectTrigger>
                <SelectContent>
                  {materiList.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      [{m.category}] {m.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[10px] text-slate-400 mt-1">
                Tugas harus didasarkan pada materi yang telah dibuat.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                Deskripsi / Instruksi
              </label>
              <Textarea
                name="description"
                rows={3}
                placeholder="Instruksi pengerjaan tugas bagi siswa..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 active:scale-98 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus size={16} /> Simpan Draft
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
