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
    id: "dian",
    name: "Dian Mulyawati S.PD",
    role: "Guru Informatika",
    stats: { presence: 0, mutabaah: 0, journal: 0 }, // Stats will be calculated dynamically
  },
  {
    id: "ahmad",
    name: "Ahmad Fauzan S.PD",
    role: "Guru Matematika",
    stats: { presence: 0, mutabaah: 0, journal: 0 },
  },
  {
    id: "siti",
    name: "Siti Rahmawati S.PD",
    role: "Guru Bahasa Indonesia",
    stats: { presence: 0, mutabaah: 0, journal: 0 },
  },
  // Keep some old ones for fullness if needed, or stick to the ones we have dummy data for
  // {
  //   id: "budi",
  //   name: "Budi Santoso, S.Kom",
  //   role: "Staff IT",
  //   stats: { presence: 0, mutabaah: 0, journal: 0 },
  // },
];
