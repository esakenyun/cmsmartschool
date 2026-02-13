"use client";

import { students, teachers } from "@/features/admin/data/mock-data";
import { ArrowLeft, GraduationCap, Plus, Trash2, Users } from "lucide-react";
import Link from "next/link";

export default function DetailManajemenContent({
  kelas,
}: {
  kelas: {
    id: number;
    name: string;
    wali: string;
    students: number;
    teachers: number;
    room: string;
  };
}) {
  return (
    <div className="space-y-8">
      <Link
        href={"/dashboard/admin/manajemen-kelas"}
        className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:underline"
      >
        <ArrowLeft size={16} />
        Kembali ke Daftar Kelas
      </Link>

      <div className="bg-linear-to-r from-teacher-500 to-emerald-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Kelas {kelas.name}</h1>
        <p className="opacity-80">Wali Kelas: {kelas.wali}</p>
        <div className="flex gap-4 mt-6">
          <div className="bg-white/10 px-4 py-2 rounded-lg">
            <span className="text-xs block">Total Murid</span>
            <span className="text-xl font-bold">{kelas.students} Orang</span>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg">
            <span className="text-xs block">Total Guru</span>
            <span className="text-xl font-bold">{kelas.teachers} Orang</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Guru */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <GraduationCap size={20} /> Guru Pengajar
          </h2>

          {teachers.map((t) => (
            <div
              key={t.id}
              className="bg-white p-4 rounded-xl border flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center font-bold">
                {t.avatar}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-xs text-gray-500">{t.subject}</p>
              </div>
              <button className="cursor-pointer text-gray-500 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Murid */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Users size={20} /> Daftar Murid
            </h2>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 cursor-pointer hover:bg-green-600">
              <Plus size={16} /> Murid Baru
            </button>
          </div>

          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold uppercase">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-xs font-bold uppercase">
                    NISN
                  </th>
                  <th className="px-6 py-3 text-xs font-bold uppercase">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter((s) => s.class === kelas.name)
                  .map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="px-6 py-4 text-sm font-semibold">
                        {s.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {s.nisn}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="cursor-pointer text-gray-500 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
