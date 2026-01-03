export type Guru = {
  nama: string;
  nik: string;
  jabatan: string;
  departemen: string;
  emailUser: string;
  emailManager: string;
};

export const guruList: Guru[] = [
  {
    nama: "Dian Mulyawati S.PD",
    nik: "1987654321",
    jabatan: "Guru Informatika",
    departemen: "SMP",
    emailUser: "gurusmp@cm.id",
    emailManager: "principal@cm.id",
  },
  {
    nama: "Ahmad Fauzan S.PD",
    nik: "1987654322",
    jabatan: "Guru Matematika",
    departemen: "SMP",
    emailUser: "ahmad@cm.id",
    emailManager: "principal@cm.id",
  },
  {
    nama: "Siti Rahmawati S.PD",
    nik: "1987654323",
    jabatan: "Guru Bahasa Indonesia",
    departemen: "SMP",
    emailUser: "siti@cm.id",
    emailManager: "principal@cm.id",
  },
];
