"use client";

import { BookOpen, FileText, FolderSync, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function MataPelajaranGuruContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-5 w-52" />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-linear-to-r from-slate-800 to-slate-900 text-white rounded-xl p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">
            Ilmu Pengetahuan Alam (IPA)
          </h2>
          <p className="text-slate-300">Kelas 2 • </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
          <BookOpen className="w-44 h-44" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Modul Ajar",
            count: "12 Bab",
            icon: <FileText className="w-6 h-6 text-blue-600" />,
            color: "bg-blue-50",
          },
          {
            label: "Hybrid Learning",
            count: "24 Klip",
            icon: <Video className="w-6 h-6 text-red-600" />,
            color: "bg-red-50",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-3`}
            >
              {item.icon}
            </div>
            <h4 className="font-bold text-slate-800">{item.count}</h4>
            <p className="text-sm text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h4 className="font-bold text-slate-800 mb-4">
          Materi Modul Ajar (Semester Genap)
        </h4>
        <div className="space-y-3">
          {[
            {
              title: "Klasifikasi Makhluk Hidup",
              type: "Docs",
              date: "18 Des 2024",
              status: "Published",
            },
            {
              title: "Energi dalam Sistem Kehidupan",
              type: "PDF",
              date: "15 Des 2024",
              status: "Published",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.status === "Published"
                      ? "bg-green-500"
                      : "bg-slate-400"
                  }`}
                ></div>
                <div>
                  <p className="font-bold text-slate-700 text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.type} • {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="pt-5 text-sm text-slate-500">
        Update terakhir: Senin, 19 Des 2024 - 08:00 WIB
      </p>
      <div className="p-6 bg-white shadow-sm rounded-xl">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-slate-800 mb-4">
            Playlist Hybrid Learning
          </h4>
          <div>
            <button className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <FolderSync />
              Sinkronasi Data
            </button>
          </div>
        </div>
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  No
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Judul
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Tanggal
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-600">1</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  Pertemuan 1
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">18 Des 2024</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    Published
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-600">2</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  Pertemuan 2
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">18 Des 2024</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    Published
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-600">3</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  Pertemuan 3
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">18 Des 2024</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    Published
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-600">4</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  Pertemuan 4
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">18 Des 2024</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    Published
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-5">
        <iframe
          src="https://www.youtube.com/embed/videoseries?list=PLwfaMHT5HFc9srYrrBZZkdI4VUIh_n9ch"
          width="100%"
          height="500"
          className="rounded-lg"
          title="Playlist Guru"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
