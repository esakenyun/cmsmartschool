import { BookOpen, Building2, GraduationCap } from "lucide-react";
import React from "react";

export interface RoleData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  lightColor: string;
  textColor: string;
  ringColor: string;
}

export const roles: RoleData[] = [
  {
    id: "pimpinan",
    title: "Yayasan",
    subtitle: "Direktur & Pengurus",
    description: "Dashboard eksekutif dan monitoring kinerja unit.",
    icon: <Building2 className="w-8 h-8" />,
    color: "bg-indigo-600",
    hoverColor: "hover:bg-indigo-700",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-600",
    ringColor: "ring-indigo-200",
  },
  {
    id: "kepala-sekolah",
    title: "Pimpinan Unit",
    subtitle: "Kepala Sekolah",
    description:
      "Manajemen unit sekolah, supervisi guru, dan laporan akademik.",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
    ringColor: "ring-blue-200",
  },
  {
    id: "guru",
    title: "Guru",
    subtitle: "Tenaga Pengajar",
    description: "Administrasi kurikulum dan pemantauan kinerja pembelajaran.",
    icon: <BookOpen className="w-8 h-8" />,
    color: "bg-emerald-600",
    hoverColor: "hover:bg-emerald-700",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    ringColor: "ring-emerald-200",
  },
  // {
  //   id: "siswa",
  //   title: "Siswa & Orangtua",
  //   subtitle: "Wali Murid",
  //   description:
  //     "Cek rapot, tagihan SPP, jadwal pelajaran, dan presensi harian.",
  //   icon: <Users className="w-8 h-8" />,
  //   color: "bg-orange-500",
  //   hoverColor: "hover:bg-orange-600",
  //   lightColor: "bg-orange-50",
  //   textColor: "text-orange-600",
  //   ringColor: "ring-orange-200",
  // },
];
