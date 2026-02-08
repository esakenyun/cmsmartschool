export interface MutabaahRecapitulation {
  bulan: string;
  tanggal_jam: string;
  tanggal: string;
  nis: string;
  nama_siswa: string;
  jabatan: string;
  kelas: string;
  email_user: string;
  email_kepala_sekolah: string;
  email_wakil_kepala_sekolah: string;
  email_guru_kelas: string;

  // Shalat Fardhu
  shalat_shubuh: string;
  shalat_zhuhur: string;
  shalat_ashar: string;
  shalat_maghrib: string;
  shalat_isya: string;

  // Shalat Rawatib
  rawatib_qabliyah_shubuh: string;
  rawatib_qabliyah_zhuhur: string;
  rawatib_bada_zhuhur: string;
  rawatib_qabliyah_ashar: string;
  rawatib_bada_maghrib: string;
  rawatib_bada_isya: string;

  // Shalat Sunnah
  sunnah_dhuha: string;
  sunnah_witir: string;
  sunnah_tahajud: string;
  sunnah_tarawih: string;

  // Shaum (Puasa)
  shaum_sunnah: string;
  keterangan_shaum_sunnah: string;
  shaum_ramadhan: string;
  shaum_yaumul_bidh: string;
  shaum_lainnya: string;
  keterangan_puasa: string;

  // Itikaf
  itikaf: string;
  lokasi_itikaf: string;

  // Budaya Literasi
  literasi_membaca: string;
  keterangan_membaca: string;

  // Mengikuti Kajian
  kajian_media: string; // ONLINE / OFFLINE
  kajian_judul: string;

  // Amalan Lain
  al_matsurat_pagi: string;
  al_matsurat_petang: string;
  infaq: string;
  bersosialisasi_dengan_tetangga: string;
  tidur_dalam_keadaan_berwudhu: string;
  olahraga_mandiri: string;

  // Interaksi Dengan Quran
  tilawah_halaman: number;
  murojaah_halaman: number;
  ziyadah_juz: string;
  ziyadah_surah: string; // Added this field
  ziyadah_ayat: number; // ayat terakhir
  membaca_terjemah_halaman: number;
}
