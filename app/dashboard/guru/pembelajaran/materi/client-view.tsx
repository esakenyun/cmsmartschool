"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Search,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
  FileText,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { INITIAL_MATERI_LIST, Materi } from "../mock-data";

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

export default function MateriGuruContent() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [materiList, setMateriList] = useState<Materi[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMateri, setEditingMateri] = useState<Materi | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [newCategory, setNewCategory] = useState("Biologi");
  const [newType, setNewType] = useState("PDF");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("guru_materi_list");
    if (stored) {
      setMateriList(JSON.parse(stored));
    } else {
      setMateriList(INITIAL_MATERI_LIST);
      localStorage.setItem("guru_materi_list", JSON.stringify(INITIAL_MATERI_LIST));
    }
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const saveToStorage = (updated: Materi[]) => {
    setMateriList(updated);
    localStorage.setItem("guru_materi_list", JSON.stringify(updated));
  };

  const handleToggleStatus = (id: string) => {
    const updated = materiList.map((item) => {
      if (item.id === id) {
        const nextStatus: "Published" | "Draft" = item.status === "Published" ? "Draft" : "Published";
        toast.info(`Status "${item.title}" diubah menjadi ${nextStatus}`);
        return { ...item, status: nextStatus };
      }
      return item;
    });
    saveToStorage(updated);
  };

  const handleDelete = (id: string, titleStr: string) => {
    const updated = materiList.filter((item) => item.id !== id);
    saveToStorage(updated);
    toast.success(`Materi "${titleStr}" berhasil dihapus.`);
  };

  const handleOpenAddModal = () => {
    setEditingMateri(null);
    setTitle("");
    setLink("");
    setDescription("");
    setNewCategory("Biologi");
    setNewType("PDF");
    setIsModalOpen(true);
  };

  const handleStartEdit = (materi: Materi) => {
    setEditingMateri(materi);
    setTitle(materi.title);
    setLink(materi.link);
    setDescription(materi.description);
    setNewCategory(materi.category);
    setNewType(materi.type);
    setIsModalOpen(true);
  };

  const handleSubmitMateri = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !link) {
      toast.error("Harap isi semua kolom yang wajib!");
      return;
    }

    if (editingMateri) {
      // Edit mode
      const updated = materiList.map((m) => {
        if (m.id === editingMateri.id) {
          return {
            ...m,
            title,
            category: newCategory,
            type: newType,
            link,
            description,
          };
        }
        return m;
      });
      saveToStorage(updated);
      toast.success(`Materi "${title}" berhasil diubah!`);
    } else {
      // Add mode
      const newMateri: Materi = {
        id: `materi-${Date.now()}`,
        title,
        category: newCategory,
        type: newType,
        dateAdded: new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Draft",
        link,
        description: description || "Tidak ada deskripsi materi.",
      };
      const updated = [newMateri, ...materiList];
      saveToStorage(updated);
      toast.success(`Materi "${newMateri.title}" ditambahkan sebagai Draft!`);
    }

    setIsModalOpen(false);
  };

  const categories = ["Semua", ...Array.from(new Set(materiList.map((m) => m.category)))];

  const filteredMateri = materiList.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
      {/* Header section with theme colors */}
      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-emerald-900 font-bold text-xl flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            Kelola Materi Pembelajaran
          </h3>
          <p className="text-emerald-700 text-sm mt-1">
            Unggah, atur, dan publikasikan materi ajar untuk para siswa. Klik pada nama materi untuk melihat detail.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-xs transition-colors active:scale-98 w-full md:w-auto cursor-pointer"
          >
            <Plus size={16} />
            Tambah Materi Baru
          </button>
        </div>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium uppercase">Total Materi</span>
          <h4 className="text-2xl font-bold text-slate-800 mt-1">{materiList.length} Item</h4>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium uppercase">Sudah Publish</span>
          <h4 className="text-2xl font-bold text-emerald-600 mt-1">
            {materiList.filter((m) => m.status === "Published").length} Item
          </h4>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium uppercase">Draft / Privat</span>
          <h4 className="text-2xl font-bold text-amber-600 mt-1">
            {materiList.filter((m) => m.status === "Draft").length} Item
          </h4>
        </div>
      </div>

      {/* Main Workspace - Full Width for Clean UI */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        {/* Filter and search bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari judul materi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white">
                <SelectValue placeholder="Mata Pelajaran" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Materials Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Judul Materi</th>
                <th className="pb-3 font-semibold">Mata Pelajaran</th>
                <th className="pb-3 font-semibold">Tipe</th>
                <th className="pb-3 font-semibold text-center">Status</th>
                <th className="pb-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredMateri.map((materi) => (
                <tr key={materi.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 pr-2">
                    <Link
                      href={`/dashboard/guru/pembelajaran/materi/${materi.id}`}
                      className="font-semibold text-slate-800 hover:text-emerald-600 hover:underline transition-all block"
                    >
                      {materi.title}
                    </Link>
                    <div className="text-xs text-slate-400 mt-0.5">Dibuat: {materi.dateAdded}</div>
                  </td>
                  <td className="py-3.5 pr-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600 font-medium">
                      {materi.category}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2">
                    <span className="text-xs font-semibold text-slate-500">{materi.type}</span>
                  </td>
                  <td className="py-3.5 text-center pr-2">
                    <button
                      onClick={() => handleToggleStatus(materi.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                        materi.status === "Published"
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      }`}
                      title="Klik untuk ubah status"
                    >
                      {materi.status === "Published" ? (
                        <>
                          <Eye size={12} /> Published
                        </>
                      ) : (
                        <>
                          <EyeOff size={12} /> Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/dashboard/guru/pembelajaran/materi/${materi.id}`}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                      >
                        <FileText size={16} />
                      </Link>
                      <a
                        href={materi.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Buka Tautan Google Drive"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => handleStartEdit(materi)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Materi"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(materi.id, materi.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMateri.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 italic">
                    Tidak ada materi yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog Modal for adding/editing material */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              {editingMateri ? "Ubah Materi Ajar" : "Tambah Materi Ajar Baru"}
            </DialogTitle>
            <DialogDescription>
              {editingMateri
                ? "Sesuaikan informasi materi pembelajaran di bawah ini."
                : "Lengkapi informasi di bawah ini untuk membuat dokumen materi pembelajaran baru."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitMateri} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                Judul Materi <span className="text-rose-500">*</span>
              </label>
              <Input
                type="text"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Struktur Sel Tumbuhan"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Mata Pelajaran
                </label>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Mata Pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Biologi">Biologi</SelectItem>
                    <SelectItem value="Fisika">Fisika</SelectItem>
                    <SelectItem value="Kimia">Kimia</SelectItem>
                    <SelectItem value="Umum">Umum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Tipe File
                </label>
                <Select value={newType} onValueChange={setNewType}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Tipe File" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="Slides">Slides / Presentasi</SelectItem>
                    <SelectItem value="Video">Video Tutorial</SelectItem>
                    <SelectItem value="Docs">Dokumen / Word</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                Link Tautan (URL) <span className="text-rose-500">*</span>
              </label>
              <Input
                type="url"
                name="link"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://docs.google.com/..."
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                Deskripsi Singkat
              </label>
              <Textarea
                name="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Masukkan deskripsi atau instruksi pengerjaan..."
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
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 active:scale-98 transition-all flex items-center gap-1 cursor-pointer"
              >
                {editingMateri ? "Simpan Perubahan" : "Simpan Draft"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
