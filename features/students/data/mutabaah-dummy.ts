import { MutabaahRecapitulation } from "../types/mutabaah-types";

const generateMockData = (): MutabaahRecapitulation[] => {
  const data: MutabaahRecapitulation[] = [];
  const year = 2026;
  const month = 1; // February (0-indexed is 1)
  const daysInMonth = 28; // 2026 is not a leap year

  for (let i = 1; i <= daysInMonth; i++) {
    const day = String(i).padStart(2, "0");
    const dateStr = `${day}/02/${year}`;
    const dateObj = new Date(year, month, i);
    const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 1 = Monday, ...

    // Logic for specific fields based on frequency targets
    // Prayer Targets: ~80 times Early Prayer in Mosque (20/week).
    // Total 5 prayers * 7 days = 35 prayers/week. Target 20/week in Mosque.
    // Randomly assign mosque/home status.

    const isMosque = Math.random() > 0.4; // Slightly more than half
    const prayerStatus = isMosque
      ? "JAMAAH AWAL WAKTU DI MASJID"
      : "JAMAAH AWAL WAKTU DI RUMAH";

    // Fasting: Mon & Thu
    const isMondayOrThursday = dayOfWeek === 1 || dayOfWeek === 4;
    const isFasting = isMondayOrThursday && Math.random() > 0.2; // 80% chance on Mon/Thu

    // Literacy: daily-ish
    const isReading = Math.random() > 0.7;

    // Al-Matsurat: Morning & Evening
    const almatsuratPagi = Math.random() > 0.3 ? "YA" : "TIDAK";
    const almatsuratPetang = Math.random() > 0.3 ? "YA" : "TIDAK";

    data.push({
      bulan: "Februari",
      tanggal_jam: `${dateStr} 00:00:00`,
      tanggal: dateStr,
      nis: "25 26 10 022",
      nama_siswa: "Budi Santoso",
      jabatan: "Ikhwan",
      kelas: "10",
      email_user: "budi.santoso@cendekiamuda.sch.id",
      email_kepala_sekolah: "yudi.karviandi@cendekiamuda.sch.id",
      email_wakil_kepala_sekolah: "hilal.ladiyar@cendekiamuda.sch.id",
      email_guru_kelas:
        "agung.prayogo@cendekiamuda.sch.id ; dede.sukma@cendekiamuda.sch.id",

      shalat_shubuh:
        Math.random() > 0.2
          ? "JAMAAH AWAL WAKTU DI MASJID"
          : "SHALAT SENDIRIAN",
      shalat_zhuhur: prayerStatus,
      shalat_ashar: prayerStatus,
      shalat_maghrib: prayerStatus,
      shalat_isya: prayerStatus,

      rawatib_qabliyah_shubuh: Math.random() > 0.3 ? "YA" : "TIDAK",
      rawatib_qabliyah_zhuhur: Math.random() > 0.3 ? "YA" : "TIDAK",
      rawatib_bada_zhuhur: Math.random() > 0.3 ? "YA" : "TIDAK",
      rawatib_qabliyah_ashar: Math.random() > 0.8 ? "YA" : "TIDAK", // Less common
      rawatib_bada_maghrib: Math.random() > 0.3 ? "YA" : "TIDAK",
      rawatib_bada_isya: Math.random() > 0.3 ? "YA" : "TIDAK",

      sunnah_dhuha: Math.random() > 0.3 ? "YA" : "",
      sunnah_witir: Math.random() > 0.6 ? "YA" : "TIDAK",
      sunnah_tahajud: Math.random() > 0.7 ? "YA" : "TIDAK",
      sunnah_tarawih: "TIDAK", // Feb 2026 is not Ramadhan

      shaum_sunnah: isFasting ? "YA" : "TIDAK",
      keterangan_shaum_sunnah: isFasting ? "Puasa Senin Kamis" : "",

      shaum_ramadhan: "TIDAK",
      shaum_yaumul_bidh: i >= 13 && i <= 15 && Math.random() > 0.5 ? "YA" : "",
      shaum_lainnya: "TIDAK",
      keterangan_puasa: "",

      itikaf: "TIDAK",
      lokasi_itikaf: "",

      literasi_membaca: isReading ? "YA" : "TIDAK",
      keterangan_membaca: isReading ? "Membaca Buku Paket" : "",

      kajian_media: Math.random() > 0.8 ? "ONLINE" : "",
      kajian_judul: Math.random() > 0.8 ? "Kajian Rutin" : "",

      al_matsurat_pagi: almatsuratPagi,
      al_matsurat_petang: almatsuratPetang,
      infaq: dayOfWeek === 5 ? "YA" : "TIDAK", // Friday Infaq
      bersosialisasi_dengan_tetangga: Math.random() > 0.8 ? "YA" : "",
      tidur_dalam_keadaan_berwudhu: Math.random() > 0.2 ? "YA" : "TIDAK",
      olahraga_mandiri: dayOfWeek === 0 || dayOfWeek === 6 ? "YA" : "", // Weekend exercise

      tilawah_halaman: Math.floor(Math.random() * 10),
      murojaah_halaman: Math.floor(Math.random() * 5),
      ziyadah_juz: "30",
      ziyadah_surah: "An-Naba",
      ziyadah_ayat: Math.floor(Math.random() * 40),
      membaca_terjemah_halaman: Math.floor(Math.random() * 2),
    });
  }
  return data;
};

export const MOCK_MUTABAAH_DATA = generateMockData();
