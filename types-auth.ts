export interface Subject {
  id: number;
  name: string;
  code?: string;
  unit?: string;
  teacher_name?: string;
}

export interface Class {
  id: number;
  name: string;
  unit?: string;
  grade: string;
  gender: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  unit?: string | null;
  image?: string | null;
  imageUrl?: string;
  ttl?: string;
  address?: string;
  tmt?: string;
  numberhandphone?: number | null;
  nip?: string | null;
  academic_position?: string;
  subjects?: Subject[];
  classes?: Class[];
}

export interface Training {
  id: number;
  user_id: number;
  name: string;
  date: string;
  end_date?: string;
  organizer: string;
  created_at?: string;
}

export interface YoutubeVideo {
  no: number;
  title: string;
  date: string;
  status: string;
  video_id: string;
}

export interface YoutubePlaylistResponse {
  playlist_url?: string;
  playlist_id?: string;
  last_synced_at?: string;
  videos: YoutubeVideo[];
  cached?: boolean;
}

export interface AuthResponse {
  success?: boolean;
  message?: string;
  redirectUrl?: string;
}

export interface ModulAjar {
  id: number;
  drive_file_id: string;
  file_name: string;
  file_extension: string;
  mime_type: string;
  web_view_link: string;
  web_content_link: string;
  unit: string;
  subject_id?: number | null;
  class_id?: number | null;
  grade?: string | null;
  semester: string;
  tahun: string;
  last_synced_at: string;
  uploaded_by_email: string;
  approval_status?: string;
  approval_feedback?: string | null;
  approved_by?: number | null;
  approved_at?: string | null;
  hybrid_mode?: string;
  youtube_video_id?: string;
  notes?: string | null;
}

export interface EvaluasiModulAjar {
  id: number;
  drive_file_id: string;
  file_name: string;
  file_extension: string;
  mime_type: string;
  web_view_link: string;
  web_content_link: string;
  unit: string;
  subject_id?: number | null;
  class_id?: number | null;
  academic_term_id?: number | null;
  grade?: string | null;
  semester: string;
  tahun: string;
  last_synced_at: string;
  uploaded_by_email: string;
  ingestion_status?: string;
  approval_status?: string;
  approval_feedback?: string | null;
  approved_by?: number | null;
  approved_at?: string | null;
  notes?: string | null;
}

export interface Presensi {
  id: number;
  bulan: string;
  tanggal: string;
  waktu: string;
  nama: string;
  jabatan: string;
  status_kehadiran: string;
  unit: string;
  shift?: string;
  keterangan?: string;
  last_synced_at: string;
}

export interface StudentPresensi {
  id: number;
  bulan: string;
  tanggal: string;
  kelas: string;
  jabatan: string;
  nama_siswa: string;
  email: string;
  report_kehadiran: string;
  keterangan?: string;
  unit: string;
  user_id?: number;
  created_at: string;
  last_synced_at: string;
}

export interface MutabaahRecord {
  id: number;
  user_id: number;
  nama: string;
  jabatan: string;
  unit: string;
  tanggal: string;
  subuh: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  dhuha: boolean;
  tilawah_lembar: number;
  shaum: boolean;
  sedekah: boolean;
  haid: boolean;
  created_at: string;
  last_synced_at: string;
}

export interface StudentMutabaahRecord {
  id: number;
  bulan: string;
  tanggal: string;
  kelas: string;
  jabatan: string;
  nama_siswa: string;
  email: string;

  shubuh: string;
  zhuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;

  qabliyah_shubuh: string;
  qabliyah_zhuhur: string;
  bada_zhuhur: string;
  qabliyah_ashar: string;
  bada_maghrib: string;
  bada_isya: string;

  dhuha: string;
  witir: string;
  tahajud: string;
  tarawih: string;

  shaum: string;
  keterangan_shaum_sunnah: string;

  itikaf: string;
  lokasi_itikaf: string;

  shaum_ramadhan: string;

  literasi_membaca: string;
  keterangan_membaca: string;

  tidur_berwudhu: string;
  almatsurat_pagi: string;
  almatsurat_petang: string;
  tilawah: string;
  murojaah: string;
  infaq: string;
  olahraga_mandiri: string;

  kajian_media: string;
  kajian_judul: string;

  unit: string;
  user_id?: number;
  created_at: string;
  last_synced_at: string;
}

export interface JurnalRecord {
  id: number;
  user_id: number;
  nama: string;
  nik: string;
  jabatan: string;
  departemen: string;
  tanggal: string;
  kehadiran: string;
  sesi_awal: string;
  sesi_awal_detail?: string;
  sesi_1: string;
  sesi_1_detail?: string;
  sesi_2: string;
  sesi_2_detail?: string;
  sesi_3: string;
  sesi_3_detail?: string;
  sesi_4: string;
  sesi_4_detail?: string;
  sesi_5: string;
  sesi_5_detail?: string;
  tambahan: string;
  tambahan_detail?: string;
  session_details?: Record<string, string>;
  created_at?: string;
}

export interface AcademicTerm {
  id: number;
  year: string;
  semester: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
}

export interface TeacherImplementation {
  id: number;
  user_id: number;
  modul_ajar_id?: number | null;
  subject_id: number;
  class_id: number;
  unit: string;
  date: string;
  time_start: string;
  time_end: string;
  status: "scheduled" | "ongoing" | "completed";
  mode: "face_to_face" | "online" | "hybrid";
  youtube_link?: string | null;
  external_link?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;

  subject_name?: string;
  class_name?: string;
  modul_ajar_name?: string;
}

export interface HybridProgressPayload {
  subject_id: number;
  class_id: number;
  unit: string;
  semester: string;
  tahun: string;
  target_count: number;
}

export interface DashboardEksternalPayload {
  subject_id: number;
  class_id: number;
  unit: string;
  semester: string;
  tahun: string;
  external_link: string;
  academic_term_id: number;
}

export interface ClassRoomLinkPayload {
  subject_id: number;
  class_id: number;
  unit: string;
  semester: string;
  tahun: string;
  classroom_link: string;
  academic_term_id: number;
}

export interface HybridProgressResponse {
  targetCount?: number;
  actualCount?: number;
}

export interface TargetedSyncPayload {
  file_id: string;
  file_name: string;
  subject_id: number;
  class_id: number;
  grade: string;
  unit: string;
  semester: string;
  tahun: string;
  notes: string;
}

export interface UpdateModulAjarPayload {
  id: number;
  file_name: string;
  subject_id: number;
  class_id: number;
  grade?: string;
  semester: string;
  tahun: string;
  drive_file_id?: string;
  file_extension?: string;
  mime_type?: string;
  web_view_link?: string;
  web_content_link?: string;
  notes: string;
}

export interface TeachingAssignmentClassroom {
  id: number;
  user_id: number;
  subject_id: number;
  class_id: number;
  unit: string;
  classroom_link: string;
  academic_term_id: number;
  created_at: string;
  updated_at: string;
}

export interface TeachingAssignmentExternal {
  id: number;
  user_id: number;
  subject_id: number;
  class_id: number;
  unit: string;
  external_link: string;
  academic_term_id: number;
  created_at: string;
  updated_at: string;
}

export interface TeachingAssignment {
  id: number;
  user_id: number;
  subject_id: number;
  class_id: number;
  unit: string | null;
  academic_term_id: number;
  web_content_link: string | null;
  external_link: string | null;
  youtube_link: string | null;
  classroom_link: string | null;
  drive_file_id?: string | null;
  file_name?: string | null;
  time_start?: string | null;
  time_end?: string | null;
  pertemuan?: number | null;
  created_at: string;
}

export interface Jabatan {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}
