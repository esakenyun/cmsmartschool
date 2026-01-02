export interface TendikAttendance {
  id: string; // teacherId
  bulan: string;
  tanggal: string; // DD/MM/YYYY
  waktu: string; // HH.mm.ss
  scan: string; // Time like 06.24.44
  nik: string;
  nama: string;
  jabatan: string;
  departemen: string;
  emailUser: string;
  emailManager: string;
  reportKehadiran: string; // e.g., "HADIR TEPAT WAKTU"
  foto: string;
  lokasiKantor: string;
  lokasiAbsen: string;
  jarak: string;
  reportJarak: string;
  keterangan: string;
}

export interface TendikMutabaah {
  id: string; // teacherId
  bulan: string;
  tanggal: string; // DD/MM/YYYY
  waktu: string;
  nama: string;
  jabatan: string;
  departemen: string;
  emailUser: string;
  emailManager: string;
  subuh: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  dhuha: string;
  tilawah: string; // lembar
  shaum: string;
  sedekah: string;
  shalatSubuh: string;
  shalatDzuhur: string;
  shalatAshar: string;
  shalatMaghrib: string;
  shalatIsya: string;
  shalatDhuha: string;
  qiyamulail: string;
  witir: string;
  qoblaSubuh: string;
  matsuratPagi: string;
  qoblaDzuhur: string;
  badaDzuhur: string;
  matsuratSore: string;
  badaMaghrib: string;
  badaIsya: string;
  tarawih: string;
  hafalan: string;
  surah: string;
  ayatTerakhir: string;
  judulBuku: string;
  itikaf: string;
  lokasiItikaf: string;
  shaumRamadhan: string;
  sholawat: string;
}

export interface TendikJournal {
  id: string; // teacherId
  bulan: string;
  tanggal: string; // DD/MM/YYYY
  waktu: string;
  nama: string;
  nik: string;
  jabatan: string;
  departemen: string;
  emailUser: string;
  emailManager: string;
  kehadiran: string;
  sesi1: string;
  sesi2: string;
  sesi3: string;
  sesi4: string;
  sesi5: string;
  tambahan: string;
  keterangan: string;
}

// --- DATA GENERATION ---

// Teacher IDs from data-teacher.ts: "1" to "8"
const TEACHER_IDS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const TEACHER_NAMES: Record<string, string> = {
  "1": "Ahmad Fauzi, S.Pd",
  "2": "Siti Aisyah, M.Pd",
  "3": "Budi Santoso, S.Kom",
  "4": "Dewi Sartika, S.Pd",
  "5": "Rina Wati, S.Pd",
  "6": "Joko Anwar, S.Pd",
  "7": "Nina Marlina, S.Pd",
  "8": "Rudi Hartono, S.Kom",
};
const TEACHER_ROLES: Record<string, string> = {
  "1": "Guru Matematika",
  "2": "Guru IPA",
  "3": "Staff IT",
  "4": "Guru Bahasa Inggris",
  "5": "Guru Bahasa Indonesia",
  "6": "Guru Penjasorkes",
  "7": "Guru Seni Budaya",
  "8": "Staff Administrasi",
};
const TEACHER_DEPTS: Record<string, string> = {
  "1": "SMA",
  "2": "SMP",
  "3": "IT",
  "4": "SD",
  "5": "SMA",
  "6": "SMP",
  "7": "SD",
  "8": "ADM",
};
const TEACHER_NIKS: Record<string, string> = {
  "1": "20-0901",
  "2": "20-0902",
  "3": "20-0903",
  "4": "20-0904",
  "5": "20-0905",
  "6": "20-0906",
  "7": "20-0907",
  "8": "20-0908",
};

const MONTHS_DATA = [
  { name: "Januari", monthIndex: 0 }, // Jan 2025
  { name: "Februari", monthIndex: 1 }, // Feb 2025
  { name: "Juni", monthIndex: 5 }, // June 2025
];

export const tendikAttendanceData: TendikAttendance[] = [];
export const tendikMutabaahData: TendikMutabaah[] = [];
export const tendikJournalData: TendikJournal[] = [];

TEACHER_IDS.forEach((id) => {
  MONTHS_DATA.forEach(({ name, monthIndex }) => {
    // Generate ~20 days of data per month
    for (let i = 1; i <= 20; i++) {
      const day = i < 10 ? `0${i}` : `${i}`;
      const monthNum =
        monthIndex + 1 < 10 ? `0${monthIndex + 1}` : `${monthIndex + 1}`;
      const dateStr = `${day}/${monthNum}/2025`;

      // --- PRESENSI ---
      tendikAttendanceData.push({
        id,
        bulan: name,
        tanggal: dateStr,
        waktu: "06.24.44",
        scan: "06.24.44",
        nik: TEACHER_NIKS[id],
        nama: TEACHER_NAMES[id],
        jabatan: TEACHER_ROLES[id],
        departemen: TEACHER_DEPTS[id],
        emailUser: `${TEACHER_NAMES[id].split(" ")[0].toLowerCase()}@school.id`,
        emailManager: "principal@school.id",
        reportKehadiran:
          Math.random() > 0.1 ? "HADIR TEPAT WAKTU" : "TERLAMBAT",
        foto: "FOTO.jpg",
        lokasiKantor: "-6.921259, 107.674851",
        lokasiAbsen: "-6.921259, 107.674851",
        jarak: "5.33",
        reportJarak: "LOKASI ABSEN KANTOR",
        keterangan: "-",
      });

      // --- MUTABAAH ---
      const isFasting = Math.random() > 0.8 ? "YA" : "TIDAK";
      tendikMutabaahData.push({
        id,
        bulan: name,
        tanggal: dateStr,
        waktu: "05.00",
        nama: TEACHER_NAMES[id],
        jabatan: TEACHER_ROLES[id],
        departemen: TEACHER_DEPTS[id],
        emailUser: `${TEACHER_NAMES[id].split(" ")[0].toLowerCase()}@school.id`,
        emailManager: "principal@school.id",
        subuh: "JAMAAH AWAL WAKTU TIDAK DI MASJID",
        dzuhur: "JAMAAH AWAL WAKTU TIDAK DI MASJID",
        ashar: "JAMAAH AWAL WAKTU TIDAK DI MASJID",
        maghrib: "JAMAAH AWAL WAKTU TIDAK DI MASJID",
        isya: "JAMAAH AWAL WAKTU TIDAK DI MASJID",
        dhuha: "YA",
        tilawah: "2",
        shaum: isFasting,
        sedekah: "YA",
        // Mapping specific requested fields
        shalatSubuh: "JAMAAH AWAL WAKTU TIDAK DI MASJID",
        shalatDzuhur: "JAMAAH AWAL WAKTU TIDAK DI MASJID",
        shalatAshar: "JAMAAH AWAL WAKTU TIDAK DI MASJID",
        shalatMaghrib: "JAMAAH AWAL WAKTU TIDAK DI MASJID",
        shalatIsya: "JAMAAH AWAL WAKTU TIDAK DI MASJID",
        shalatDhuha: "YA",
        qiyamulail: "YA",
        witir: "YA",
        qoblaSubuh: "YA",
        matsuratPagi: "YA",
        qoblaDzuhur: "YA",
        badaDzuhur: "YA",
        matsuratSore: "TIDAK",
        badaMaghrib: "MUNFARID AWAL WAKTU",
        badaIsya: "YA",
        tarawih: "",
        hafalan: "",
        surah: "Al - Qalam",
        ayatTerakhir: "28",
        judulBuku: "-",
        itikaf: "",
        lokasiItikaf: "",
        shaumRamadhan: isFasting,
        sholawat: "YA",
      });

      // --- JURNAL ---
      // Only generate journal for teachers (ids 1, 2, 4, 5, 6, 7)
      if (["1", "2", "4", "5", "6", "7"].includes(id)) {
        // Simplified lists to ensure grouping in pie charts
        const subjects = [
          "Matematika",
          "B.Indo",
          "B.Inggris",
          "IPA",
          "IPS",
          "PKN",
          "Seni",
          "PJOK",
        ];
        const activities = ["Mengajar", "Ulangan", "Tugas", "Praktikum"];

        const getRandomActivity = () => {
          if (Math.random() > 0.3) {
            const subject =
              subjects[Math.floor(Math.random() * subjects.length)];
            const activity =
              activities[Math.floor(Math.random() * activities.length)];
            // Reduced variance: e.g. "Mengajar Matematika"
            return `${activity} ${subject}`;
          }
          return "-"; // Empty session
        };

        const isPresent = Math.random() > 0.1;

        tendikJournalData.push({
          id,
          bulan: name,
          tanggal: dateStr,
          waktu: "07.00",
          nama: TEACHER_NAMES[id],
          nik: TEACHER_NIKS[id],
          jabatan: TEACHER_ROLES[id],
          departemen: TEACHER_DEPTS[id],
          emailUser: `${TEACHER_NAMES[id]
            .split(" ")[0]
            .toLowerCase()}@school.id`,
          emailManager: "principal@school.id",
          kehadiran: isPresent
            ? "HADIR"
            : Math.random() > 0.5
            ? "SAKIT"
            : "IZIN",
          // Only fill sessions if present
          sesi1: isPresent ? getRandomActivity() : "-",
          sesi2: isPresent ? getRandomActivity() : "-",
          sesi3: isPresent ? getRandomActivity() : "-",
          sesi4: isPresent ? getRandomActivity() : "-",
          sesi5: isPresent ? getRandomActivity() : "-",
          tambahan: Math.random() > 0.8 ? "Ekskul" : "-",
          keterangan: isPresent ? "-" : "Tidak Masuk",
        });
      }
    }
  });
});

// Helper to filter by date range
const parseDate = (dateStr: string) => {
  // DD/MM/YYYY
  const parts = dateStr.split("/");
  return new Date(
    parseInt(parts[2]),
    parseInt(parts[1]) - 1,
    parseInt(parts[0])
  );
};

export const getTendikDetailData = (
  teacherId: string,
  startDate?: Date,
  endDate?: Date
) => {
  let attendance = tendikAttendanceData.filter((d) => d.id === teacherId);
  let mutabaah = tendikMutabaahData.filter((d) => d.id === teacherId);
  let journal = tendikJournalData.filter((d) => d.id === teacherId);

  if (startDate && endDate) {
    attendance = attendance.filter((d) => {
      const date = parseDate(d.tanggal);
      return date >= startDate && date <= endDate;
    });
    mutabaah = mutabaah.filter((d) => {
      const date = parseDate(d.tanggal);
      return date >= startDate && date <= endDate;
    });
    journal = journal.filter((d) => {
      const date = parseDate(d.tanggal);
      return date >= startDate && date <= endDate;
    });
  }

  return { attendance, mutabaah, journal };
};
