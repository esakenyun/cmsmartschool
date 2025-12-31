export interface TeacherStats {
  presence: number;
  mutabaah: number;
  journal: number;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  stats: TeacherStats;
}

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Ahmad Fauzi, S.Pd",
    role: "Guru Matematika",
    stats: { presence: 98, mutabaah: 95, journal: 100 },
  },
  {
    id: "2",
    name: "Siti Aisyah, M.Pd",
    role: "Guru IPA",
    stats: { presence: 95, mutabaah: 92, journal: 98 },
  },
  {
    id: "3",
    name: "Budi Santoso, S.Kom",
    role: "Staff IT",
    stats: { presence: 90, mutabaah: 88, journal: 95 },
  },
  {
    id: "4",
    name: "Dewi Sartika, S.Pd",
    role: "Guru Bahasa Inggris",
    stats: { presence: 92, mutabaah: 90, journal: 96 },
  },
  {
    id: "5",
    name: "Rina Wati, S.Pd",
    role: "Guru Bahasa Indonesia",
    stats: { presence: 88, mutabaah: 85, journal: 90 },
  },
  {
    id: "6",
    name: "Joko Anwar, S.Pd",
    role: "Guru Penjasorkes",
    stats: { presence: 96, mutabaah: 94, journal: 99 },
  },
  {
    id: "7",
    name: "Nina Marlina, S.Pd",
    role: "Guru Seni Budaya",
    stats: { presence: 94, mutabaah: 91, journal: 97 },
  },
  {
    id: "8",
    name: "Rudi Hartono, S.Kom",
    role: "Staff Administrasi",
    stats: { presence: 99, mutabaah: 98, journal: 100 },
  },
];
