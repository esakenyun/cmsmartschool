"use client";

import { BarChart3, FileText, CheckCircle2, FolderSync } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdministrasiGuruContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const [syncingSection, setSyncingSection] = useState<
    "planning" | "evaluasi" | null
  >(null);

  // ... (rest of the state definitions)
  // State for dynamic planning items
  const [planningItems, setPlanningItems] = useState<
    {
      id: string;
      label: string;
      link: string;
      verified: boolean;
    }[]
  >([
    {
      id: "1",
      label: "Program Tahunan",
      link: "https://docs.google.com/document/d/dummy-doc",
      verified: true,
    },
  ]);

  // State for other fixed links (Evaluasi)
  const [evaluasiLinks, setEvaluasiLinks] = useState({
    kisi: "https://docs.google.com/spreadsheets/d/dummy-kisi",
    rekap: "",
    raport: "",
  });

  const handleSyncData = (type: "planning" | "evaluasi") => {
    setSyncingSection(type);
    // Simulate API call
    setTimeout(() => {
      setSyncingSection(null);

      if (type === "planning") {
        setPlanningItems((prev) => [
          ...prev,
          {
            id: "2",
            label: "Program Semester",
            link: "https://docs.google.com/document/d/dummy-doc-2",
            verified: true,
          },
          {
            id: "3",
            label: "Modul Ajar Bab 1",
            link: "https://docs.google.com/document/d/dummy-doc-3",
            verified: true,
          },
        ]);
      } else {
        setEvaluasiLinks((prev) => ({
          ...prev,
          rekap: "https://docs.google.com/spreadsheets/d/dummy-rekap",
          raport: "https://docs.google.com/spreadsheets/d/dummy-raport",
        }));
      }

      toast.success(`Data ${type} berhasil disinkronisasi!`);
    }, 1500);
  };

  const calculateProgress = () => {
    const planningFilled = planningItems.filter(
      (item) => item.link !== ""
    ).length;
    const planningTotal = planningItems.length;

    const evaluasiTotal = Object.keys(evaluasiLinks).length;
    const evaluasiFilled = Object.values(evaluasiLinks).filter(
      (val) => val !== ""
    ).length;

    const totalFields = planningTotal + evaluasiTotal;
    if (totalFields === 0) return 0;

    return Math.round(((planningFilled + evaluasiFilled) / totalFields) * 100);
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-12 w-full md:w-1/3 rounded-lg" />
        </div>
        <div className="space-y-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Progress */}
      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-emerald-900 font-bold text-lg">
            Administrasi Guru IPA - Kelas 7
          </h3>
          <p className="text-emerald-700 text-sm">
            Tahun Ajaran: 2024 / 2025 • Semester Genap
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <div className="flex justify-between text-xs font-bold text-emerald-800 mb-1">
            <span>Kelengkapan Dokumen</span>
            <span>{calculateProgress()}%</span>
          </div>
          <div className="w-full bg-white h-2.5 rounded-full">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Kolom 1: Perencanaan */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800">Perencanaan</h4>
            </div>
            <button
              onClick={() => handleSyncData("planning")}
              disabled={!!syncingSection}
              className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FolderSync
                className={syncingSection === "planning" ? "animate-spin" : ""}
              />
              {syncingSection === "planning"
                ? "Mensinkronisasi..."
                : "Sinkronasi Data"}
            </button>
          </div>
          <div className="space-y-4">
            {planningItems.map((item) => (
              <div key={item.id} className="group relative">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 text-sm border border-slate-200 bg-slate-50 rounded px-3 py-2 text-slate-600 truncate">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          Link Dokumen Terlampir
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">
                          Belum ada data (Klik Sinkronasi)
                        </span>
                      )}
                    </div>
                    {item.link && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {planningItems.length === 0 && (
              <p className="text-center text-sm text-slate-400 py-4 italic">
                Belum ada item perencanaan. Klik &quot;Sinkronasi Data&quot;
                untuk mengambil data terbaru.
              </p>
            )}
          </div>
        </div>

        {/* Kolom 3: Evaluasi */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800">Evaluasi</h4>
            </div>
            <button
              onClick={() => handleSyncData("evaluasi")}
              disabled={!!syncingSection}
              className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FolderSync
                className={syncingSection === "evaluasi" ? "animate-spin" : ""}
              />
              {syncingSection === "evaluasi"
                ? "Mensinkronisasi..."
                : "Sinkronasi Data"}
            </button>
          </div>
          <div className="space-y-4">
            {!Object.values(evaluasiLinks).every((v) => v === "") ? (
              ["kisi", "rekap", "raport"].map((key) => (
                <div key={key}>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">
                    {key === "kisi"
                      ? "Kisi-Kisi Soal"
                      : key === "rekap"
                      ? "Rekap Nilai"
                      : "Leger Raport"}
                  </label>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 text-sm border border-slate-200 bg-slate-50 rounded px-3 py-2 text-slate-600 truncate">
                      {evaluasiLinks[key as keyof typeof evaluasiLinks] ? (
                        <a
                          href={
                            evaluasiLinks[key as keyof typeof evaluasiLinks]
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          Link Dokumen Terlampir
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">
                          Belum ada data
                        </span>
                      )}
                    </div>
                    {evaluasiLinks[key as keyof typeof evaluasiLinks] && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-slate-400 py-4 italic">
                Belum ada data evaluasi. Klik &quot;Sinkronasi Data&quot; untuk
                mengambil data terbaru.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
