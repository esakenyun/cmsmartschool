"use client";

import { ArrowRight, Book, CheckCircle, UploadCloud } from "lucide-react";
import { useState } from "react";

type Tab = "modul-ajar" | "tugas-pengumpulan";

export default function DetailMataPelajaranClient() {
  const [tab, setTab] = useState<Tab>("modul-ajar");

  return (
    <>
      {/* TAB HEADER */}
      <div className="border-b border-slate-200 mb-6">
        <nav aria-label="Tabs" className="flex space-x-8">
          <button
            onClick={() => setTab("modul-ajar")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all
              ${
                tab === "modul-ajar"
                  ? "border-rose-500 text-rose-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Modul Ajar
          </button>

          <button
            onClick={() => setTab("tugas-pengumpulan")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all
              ${
                tab === "tugas-pengumpulan"
                  ? "border-rose-500 text-rose-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Tugas &amp; Pengumpulan
          </button>
        </nav>
      </div>

      {/* TAB CONTENT */}
      {tab === "modul-ajar" && (
        <div id="modul-ajar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Book className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">
                Struktur Sel Hewan
              </h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                Mempelajari bagian-bagian terkecil dari makhluk hidup dan
                fungsinya.
              </p>
              <button className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                Pelajari Materi
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "tugas-pengumpulan" && (
        <div id="tugas-pengumpulan">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">
                Daftar Penugasan Aktif
              </h3>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-slate-500">
                  3 Tugas sedang berlangsung
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100">
                    <th className="px-6 py-4 font-semibold">Judul Tugas</th>
                    <th className="px-6 py-4 font-semibold">Deadline</th>
                    <th className="px-6 py-4 font-semibold text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">
                          Laporan Praktikum Fotosintesis
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 uppercase">
                          Praktikum Mandiri
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-slate-700">24 Okt 2023</span>
                        <span className="text-[10px] text-red-500 font-medium">
                          Sisa 2 Hari
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-500/90 transition-all">
                        <UploadCloud className="w-4 h-4" />
                        Upload Submission
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">
                          Kuis Sistem Pencernaan
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 uppercase">
                          Ujian Harian
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-slate-700">27 Okt 2023</span>
                        <span className="text-[10px] text-slate-500">
                          Sisa 5 Hari
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-500/90 transition-all">
                        <UploadCloud className="w-4 h-4" />
                        Upload Submission
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">
                          Makalah Energi Terbarukan
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 uppercase">
                          Projek Kelompok
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-slate-700">05 Nov 2023</span>
                        <span className="text-[10px] text-slate-500">
                          Sisa 14 Hari
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg cursor-not-allowed">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Sudah Dikumpulkan
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 text-center">
              <button className="text-xs text-slate-500 hover:text-rose-500 font-medium transition-colors">
                Lihat Semua Riwayat Tugas
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
