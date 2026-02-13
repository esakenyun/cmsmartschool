"use client";
import { classes } from "@/features/admin/data/mock-data";
import {
  ArrowRight,
  GraduationCap,
  MoreVertical,
  Plus,
  Users,
} from "lucide-react";
import Link from "next/link";

// Data Mock

export default function ManajemenKelasContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Daftar Kelas</h1>
          <p className="text-gray-500 text-sm">
            Pilih kelas untuk mengatur guru dan murid
          </p>
        </div>
        <button className="bg-teacher-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teacher-600">
          <Plus size={18} /> Tambah Kelas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {cls.room}
                </div>
                <MoreVertical size={18} className="text-gray-400" />
              </div>

              <p className="text-sm text-gray-500 mb-1">Kelas</p>
              <h3 className="text-xl font-bold mb-6">{cls.name}</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-gray-400" />
                  <span>{cls.students} Murid</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap size={16} className="text-gray-400" />
                  <span>{cls.teachers} Guru</span>
                </div>
              </div>

              <Link
                href={`/dashboard/admin/manajemen-kelas/${cls.id}`}
                className="w-full flex items-center justify-center gap-2 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                Atur Relasi <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
