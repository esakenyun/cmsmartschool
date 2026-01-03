import {
  TendikAttendanceSchema,
  TendikMutabaahSchema,
  TendikJournalSchema,
  TendikDetailSchema,
  TendikDetailData,
  TendikAttendance,
  TendikMutabaah,
  TendikJournal,
} from "../schemas/tendik-detail-schema";
import { guruList } from "./data-guru";

export const generateTendikDetail = (): TendikDetailData => {
  const attendance: TendikAttendance[] = [];
  const mutabaah: TendikMutabaah[] = [];
  const journal: TendikJournal[] = [];

  const months = [
    { name: "Juni", month: 6, year: 2025 },
    { name: "Juli", month: 7, year: 2025 },
  ];

  let idCounter = 1;

  months.forEach(({ name, month, year }) => {
    // Determine days in month
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      guruList.forEach((guru) => {
        // Skip Sundays or specific logic if needed, but for now generate all

        const tanggal = `${String(day).padStart(2, "0")}/${String(
          month
        ).padStart(2, "0")}/${year}`;

        // ================= ATTENDANCE =================
        const isLate = Math.random() > 0.9; // 10% chance of being late
        attendance.push(
          TendikAttendanceSchema.parse({
            id: String(idCounter++),
            bulan: name,
            tanggal,
            waktu: isLate ? "07:15" : "07:00",
            scan: "IN",
            lokasiAbsen: "Sekolah",
            lokasiKantor: "SMP",
            jarak: "0",
            reportJarak: "AMAN",
            foto: "-",
            nama: guru.nama,
            nik: guru.nik,
            jabatan: guru.jabatan,
            departemen: guru.departemen,
            emailUser: guru.emailUser,
            emailManager: guru.emailManager,
            reportKehadiran: isLate ? "Terlambat" : "Tepat Waktu",
            keterangan: isLate ? "Terlambat hadir" : "Tepat waktu",
          })
        );

        // ================= MUTABAAH =================
        mutabaah.push(
          TendikMutabaahSchema.parse({
            id: String(idCounter++),
            tanggal,
            nama: guru.nama,
            shalatSubuh: "JAMAAH",
            shalatDzuhur: "JAMAAH",
            shalatAshar: "JAMAAH",
            shalatMaghrib: "JAMAAH",
            shalatIsya: "JAMAAH",
            shalatDhuha: "YA",
            dhuha: "YA",
            qiyamulail: day % 3 === 0 ? "YA" : "TIDAK",
            tilawah: day % 2 === 0 ? "10" : "-",
            shaum: day % 2 === 0 ? "YA" : "TIDAK",
            sedekah: "YA",
            sholawat: "YA",
            witir: "YA",
            istighfar: "-",
          })
        );

        // ================= JOURNAL =================
        journal.push(
          TendikJournalSchema.parse({
            id: String(idCounter++),
            bulan: name,
            tanggal,
            waktu: "07:00 - 15:00",
            nama: guru.nama,
            nik: guru.nik,
            jabatan: guru.jabatan,
            departemen: guru.departemen,
            emailUser: guru.emailUser,
            emailManager: guru.emailManager,
            kehadiran: "HADIR",
            sesi1: "Mengajar",
            sesi2: "Administrasi",
            sesi3: "Pendampingan",
            sesi4: "Makan Siang",
            sesi5: "Mengajar",
            tambahan: "-",
            keterangan: "Aktif",
          })
        );
      });
    }
  });

  // ================= FINAL WRAP =================
  return TendikDetailSchema.parse({
    attendance,
    mutabaah,
    journal,
  });
};
