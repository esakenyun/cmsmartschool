import { z } from "zod";

export const TendikAttendanceSchema = z.object({
  id: z.string(),
  bulan: z.string(),
  tanggal: z.string(),
  waktu: z.string(),
  scan: z.string(),
  lokasiAbsen: z.string(),
  lokasiKantor: z.string(),
  jarak: z.string(),
  reportJarak: z.string(),
  foto: z.string(),
  nama: z.string(),
  nik: z.string().optional(),
  jabatan: z.string(),
  departemen: z.string().optional(),
  emailUser: z.string().optional(),
  emailManager: z.string().optional(),
  reportKehadiran: z.string(),
  keterangan: z.string(),
});

export type TendikAttendance = z.infer<typeof TendikAttendanceSchema>;

export const TendikMutabaahSchema = z.object({
  id: z.string(),
  tanggal: z.string(),
  nama: z.string(),
  shalatSubuh: z.string(),
  shalatDzuhur: z.string(),
  shalatAshar: z.string(),
  shalatMaghrib: z.string(),
  shalatIsya: z.string(),
  shalatDhuha: z.enum(["YA", "TIDAK", "-", "0"]), // Adjust as needed based on actual data
  dhuha: z.string().optional(), // Alias or specific field? checking dummy data usage
  qiyamulail: z.enum(["YA", "TIDAK", "-", "0"]),
  tilawah: z.string(), // Pages count as string "10" or "-"
  shaum: z.enum(["YA", "TIDAK", "-", "0"]),
  sedekah: z.enum(["YA", "TIDAK", "-", "0"]),
  sholawat: z.enum(["YA", "TIDAK", "-", "0"]),
  witir: z.enum(["YA", "TIDAK", "-", "0"]),
  istighfar: z.string().optional(),
});

export type TendikMutabaah = z.infer<typeof TendikMutabaahSchema>;

export const TendikJournalSchema = z.object({
  id: z.string(),
  bulan: z.string(),
  tanggal: z.string(),
  waktu: z.string(),
  nama: z.string(),
  nik: z.string(),
  jabatan: z.string(),
  departemen: z.string(),
  emailUser: z.string().email(),
  emailManager: z.string().email(),
  kehadiran: z.string(),
  sesi1: z.string(),
  sesi2: z.string(),
  sesi3: z.string(),
  sesi4: z.string(),
  sesi5: z.string(),
  tambahan: z.string(),
  keterangan: z.string(),
});

export type TendikJournal = z.infer<typeof TendikJournalSchema>;

export const TendikDetailSchema = z.object({
  attendance: z.array(TendikAttendanceSchema),
  mutabaah: z.array(TendikMutabaahSchema),
  journal: z.array(TendikJournalSchema),
});

export type TendikDetailData = z.infer<typeof TendikDetailSchema>;



