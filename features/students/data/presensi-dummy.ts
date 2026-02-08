export interface StudentIds {
  id: string;
  nama: string;
  kelas: string;
  nis: string;
}

export interface StudentAttendance {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: "Hadir" | "Sakit" | "Izin" | "Alpha" | "Terlambat";
  notes?: string;
}

export const DUMMY_STUDENTS: StudentIds[] = [
  { id: "S001", nama: "Budi Santoso", kelas: "XTKJ1", nis: "12345" },
];

export const generateDummyAttendance = (
  month: number,
  year: number,
): StudentAttendance[] => {
  const data: StudentAttendance[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();

  DUMMY_STUDENTS.forEach((student) => {
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();

      // Skip weekends (0=Sunday, 6=Saturday)
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      const dateStr = date.toISOString().split("T")[0];

      // Randomize status
      const rand = Math.random();
      let status: StudentAttendance["status"] = "Hadir";
      let time = "07:00";
      let notes = "-";

      if (rand < 0.05) {
        status = "Sakit";
        time = "-";
        notes = "Flu";
      } else if (rand < 0.1) {
        status = "Izin";
        time = "-";
        notes = "Acara Keluarga";
      } else if (rand < 0.15) {
        status = "Alpha";
        time = "-";
        notes = "Tanpa Keterangan";
      } else if (rand < 0.25) {
        status = "Terlambat";
        time = "07:45";
        notes = "Bangun Kesangan";
      }

      data.push({
        id: `${student.id}-${dateStr}`,
        studentId: student.id,
        date: dateStr,
        time,
        status,
        notes,
      });
    }
  });

  return data;
};

// Generate data for current month
const now = new Date();
export const CURRENT_MONTH_ATTENDANCE = generateDummyAttendance(
  now.getMonth() + 1,
  now.getFullYear(),
);
export const getStudentAttendance = (studentId: string) =>
  CURRENT_MONTH_ATTENDANCE.filter((a) => a.studentId === studentId);
