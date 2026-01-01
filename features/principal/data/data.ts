import { AdminStatus, TeacherAdminData } from "../types/types";

export const DUMMY_PDF_URL = "https://www.orimi.com/pdf-test.pdf";

export const generateDummyData = (): TeacherAdminData[] => {
  const teachers = [
    { id: "t1", name: "Pak Budi", subject: "Matematika", class: "7A" },
    { id: "t2", name: "Bu Siti", subject: "IPA", class: "8B" },
    { id: "t3", name: "Pak Joko", subject: "Bahasa Indonesia", class: "9C" },
    { id: "t4", name: "Bu Rina", subject: "Bahasa Inggris", class: "7B" },
    { id: "t5", name: "Pak Dedi", subject: "IPS", class: "8A" },
  ];

  const statuses: AdminStatus[] = ["null", "submitted", "approved"];

  return teachers.map((t) => ({
    ...t,
    planning: Array.from({ length: 5 }).map((_, i) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return {
        id: `p-${t.id}-${i}`,
        title:
          i === 0
            ? "Program Tahunan"
            : i === 1
            ? "Program Semester"
            : `Modul Ajar Bab ${i - 1}`,
        type: "Perencanaan",
        status: status,
        date: "2024-01-10",
        link: status !== "null" ? DUMMY_PDF_URL : undefined,
      };
    }),
    implementation: Array.from({ length: 4 }).map((_, i) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return {
        id: `i-${t.id}-${i}`,
        title: `Jurnal Pembelajaran Minggu ke-${i + 1}`,
        type: "Pelaksanaan",
        status: status,
        date: `2024-02-0${i + 1}`,
        link: status !== "null" ? DUMMY_PDF_URL : undefined,
      };
    }),
    evaluation: Array.from({ length: 3 }).map((_, i) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return {
        id: `e-${t.id}-${i}`,
        title:
          i === 0
            ? "Nilai UH 1"
            : i === 1
            ? "Nilai UH 2"
            : "Analisis Butir Soal",
        type: "Evaluasi",
        status: status,
        date: `2024-03-1${i}`,
        link: status !== "null" ? DUMMY_PDF_URL : undefined,
      };
    }),
  }));
};

export const INITIAL_DATA = generateDummyData();
