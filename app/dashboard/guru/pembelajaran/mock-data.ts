export interface Materi {
  id: string;
  title: string;
  category: string;
  type: string;
  dateAdded: string;
  status: "Published" | "Draft";
  link: string;
  description: string;
}

export interface Tugas {
  id: string;
  title: string;
  classGroup: string;
  dueDate: string;
  submittedCount: number;
  totalStudents: number;
  status: "Aktif" | "Selesai" | "Draft";
  materiId: string; // Related Materi
  description: string;
}

export interface Submission {
  id: string;
  studentName: string;
  submittedAt: string;
  status: "Graded" | "Needs Grading" | "Not Submitted";
  grade?: number;
}

export const INITIAL_MATERI_LIST: Materi[] = [
  {
    id: "materi-1",
    title: "Klasifikasi Makhluk Hidup",
    category: "Biologi",
    type: "PDF",
    dateAdded: "18 Des 2024",
    status: "Published",
    link: "https://docs.google.com/document/d/dummy-materi-1",
    description: "Mempelajari pengelompokan makhluk hidup berdasarkan karakteristik persamaan dan perbedaan yang dimiliki.",
  },
  {
    id: "materi-2",
    title: "Energi dalam Sistem Kehidupan",
    category: "Fisika",
    type: "Slides",
    dateAdded: "15 Des 2024",
    status: "Published",
    link: "https://docs.google.com/presentation/d/dummy-materi-2",
    description: "Membahas konsep usaha, jenis-jenis energi, serta perubahannya di kehidupan sehari-hari.",
  },
  {
    id: "materi-3",
    title: "Suhu dan Kalor",
    category: "Fisika",
    type: "PDF",
    dateAdded: "10 Des 2024",
    status: "Draft",
    link: "https://docs.google.com/document/d/dummy-materi-3",
    description: "Menjelaskan tentang tingkat panas dingin benda, pemuaian zat, serta perpindahan kalor secara konduksi, konveksi, dan radiasi.",
  },
  {
    id: "materi-4",
    title: "Sistem Organ Manusia",
    category: "Biologi",
    type: "Video",
    dateAdded: "05 Des 2024",
    status: "Published",
    link: "https://youtube.com/watch?v=dummy-video",
    description: "Video pengenalan sistem pencernaan, pernapasan, dan peredaran darah manusia.",
  },
];

export const INITIAL_TUGAS_LIST: Tugas[] = [
  {
    id: "tugas-1",
    title: "Laporan Praktikum Fotosintesis",
    classGroup: "7-A",
    dueDate: "2026-07-10",
    submittedCount: 3,
    totalStudents: 5,
    status: "Aktif",
    materiId: "materi-1",
    description: "Buatlah laporan praktikum mengenai faktor-faktor yang mempengaruhi laju fotosintesis sesuai panduan di materi Klasifikasi Makhluk Hidup.",
  },
  {
    id: "tugas-2",
    title: "Latihan Soal Klasifikasi Hewan",
    classGroup: "7-B",
    dueDate: "2026-07-05",
    submittedCount: 4,
    totalStudents: 5,
    status: "Aktif",
    materiId: "materi-1",
    description: "Kerjakan latihan soal pengelompokan vertebrata dan invertebrata di lembar kerja yang disediakan.",
  },
  {
    id: "tugas-3",
    title: "Evaluasi Konsep Usaha dan Energi",
    classGroup: "7-A",
    dueDate: "2026-06-30",
    submittedCount: 5,
    totalStudents: 5,
    status: "Selesai",
    materiId: "materi-2",
    description: "Uji pemahaman Anda mengenai rumus usaha dan kekekalan energi mekanik.",
  },
];

export const MOCK_SUBMISSIONS: Record<string, Submission[]> = {
  "tugas-1": [
    { id: "sub-1", studentName: "Aditya Pratama", submittedAt: "04 Jul 2026, 09:30", status: "Needs Grading" },
    { id: "sub-2", studentName: "Budi Santoso", submittedAt: "04 Jul 2026, 10:15", status: "Needs Grading" },
    { id: "sub-3", studentName: "Citra Lestari", submittedAt: "04 Jul 2026, 14:02", status: "Graded", grade: 85 },
    { id: "sub-4", studentName: "Dedi Wijaya", submittedAt: "-", status: "Not Submitted" },
    { id: "sub-5", studentName: "Eka Rahayu", submittedAt: "-", status: "Not Submitted" },
  ],
  "tugas-2": [
    { id: "sub-6", studentName: "Fadel Muhammad", submittedAt: "03 Jul 2026, 11:20", status: "Graded", grade: 90 },
    { id: "sub-7", studentName: "Gita Gutawa", submittedAt: "03 Jul 2026, 16:45", status: "Graded", grade: 95 },
    { id: "sub-8", studentName: "Hendra Wijaya", submittedAt: "04 Jul 2026, 08:00", status: "Needs Grading" },
    { id: "sub-9", studentName: "Indah Permata", submittedAt: "04 Jul 2026, 11:10", status: "Needs Grading" },
    { id: "sub-10", studentName: "Joko Widodo", submittedAt: "-", status: "Not Submitted" },
  ],
  "tugas-3": [
    { id: "sub-11", studentName: "Kiki Amelia", submittedAt: "29 Jun 2026, 08:30", status: "Graded", grade: 80 },
    { id: "sub-12", studentName: "Lutfi Hakim", submittedAt: "29 Jun 2026, 09:00", status: "Graded", grade: 88 },
    { id: "sub-13", studentName: "Mega Utami", submittedAt: "29 Jun 2026, 09:45", status: "Graded", grade: 92 },
    { id: "sub-14", studentName: "Naufal Abdi", submittedAt: "30 Jun 2026, 10:00", status: "Graded", grade: 75 },
    { id: "sub-15", studentName: "Oki Setiana", submittedAt: "30 Jun 2026, 11:30", status: "Graded", grade: 85 },
  ],
};
