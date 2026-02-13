import {
  BookOpen,
  Building2,
  GraduationCap,
  Users,
  ShieldCheck,
} from "lucide-react";
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
    color: "bg-leader-600",
    hoverColor: "hover:bg-leader-700",
    lightColor: "bg-leader-50",
    textColor: "text-leader-600",
    ringColor: "ring-leader-200",
  },
  {
    id: "kepala-sekolah",
    title: "Pimpinan Unit",
    subtitle: "Kepala Sekolah",
    description:
      "Manajemen unit sekolah, supervisi guru, dan laporan akademik.",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "bg-principal-600",
    hoverColor: "hover:bg-principal-700",
    lightColor: "bg-principal-50",
    textColor: "text-principal-600",
    ringColor: "ring-principal-200",
  },
  {
    id: "guru",
    title: "Guru",
    subtitle: "Tenaga Pengajar",
    description: "Administrasi kurikulum dan pemantauan kinerja pembelajaran.",
    icon: <BookOpen className="w-8 h-8" />,
    color: "bg-teacher-600",
    hoverColor: "hover:bg-teacher-700",
    lightColor: "bg-teacher-50",
    textColor: "text-teacher-600",
    ringColor: "ring-teacher-200",
  },
  {
    id: "siswa",
    title: "Siswa & Orangtua",
    subtitle: "Wali Murid",
    description:
      "Cek rapot, tagihan SPP, jadwal pelajaran, dan presensi harian.",
    icon: <Users className="w-8 h-8" />,
    color: "bg-student-500",
    hoverColor: "hover:bg-student-600",
    lightColor: "bg-student-50",
    textColor: "text-student-600",
    ringColor: "ring-student-200",
  },
  {
    id: "admin",
    title: "Administrator",
    subtitle: "System Administrator",
    description: "Akses penuh ke pengaturan sistem dan manajemen user.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "bg-slate-800",
    hoverColor: "hover:bg-slate-900",
    lightColor: "bg-slate-100",
    textColor: "text-slate-800",
    ringColor: "ring-slate-300",
  },
];
