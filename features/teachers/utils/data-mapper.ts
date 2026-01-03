import { TendikDetailData } from "../schemas/tendik-detail-schema";
import { parse } from "date-fns";
// Helper to filter by date range
const isInRange = (dateStr: string, start: Date, end: Date) => {
  // dateStr format is "DD/MM/YYYY"
  const date = parse(dateStr, "dd/MM/yyyy", new Date());
  // Set time to 00:00:00 for accurate comparison if needed, or rely on start/end being 00:00:00
  // start and end are typically 00:00:00 from DateRangePicker/server
  return date >= start && date <= end;
};

import {
  TendikAttendance,
  TendikMutabaah,
  TendikJournal,
} from "../schemas/tendik-detail-schema";

// Helper: Filter by Teacher
const isTeacher = (
  item: TendikAttendance | TendikMutabaah | TendikJournal,
  teacherId: string | undefined
) => {
  if (!teacherId) return true;

  if (item.nama === teacherId) return true;

  // Check 'nik' if it exists in the item
  if ("nik" in item && item.nik === teacherId) return true;

  // Check 'emailUser' if it exists in the item
  if ("emailUser" in item && item.emailUser === teacherId) return true;

  return false;
};

export const getTeacherDetailData = (
  allData: TendikDetailData,
  teacherName: string,
  startDate: Date,
  endDate: Date
): TendikDetailData => {
  return {
    attendance: allData.attendance.filter(
      (a) =>
        isTeacher(a, teacherName) && isInRange(a.tanggal, startDate, endDate)
    ),
    mutabaah: allData.mutabaah.filter(
      (m) =>
        isTeacher(m, teacherName) && isInRange(m.tanggal, startDate, endDate)
    ),
    journal: allData.journal.filter(
      (j) =>
        isTeacher(j, teacherName) && isInRange(j.tanggal, startDate, endDate)
    ),
  };
};

/**
 * Utility to filter and aggregate Tendik/Teacher detailed data for dashboard views
 */
export const getAggregatedTeacherStats = (
  data: TendikDetailData,
  teacherId: string | undefined, // Expects Name
  startDate: Date,
  endDate: Date
) => {
  // Use the helper to filter first
  const filtered = getTeacherDetailData(
    data,
    teacherId || "",
    startDate,
    endDate
  );

  const { attendance, mutabaah, journal } = filtered;

  // 3. Calculate Stats

  // Presence: Count "Tepat Waktu" or "Terlambat"
  const totalPresence = attendance.filter(
    (a) =>
      a.reportKehadiran === "Tepat Waktu" || a.reportKehadiran === "Terlambat"
  ).length;
  const totalLate = attendance.filter(
    (a) => a.keterangan === "Terlambat"
  ).length;

  // Mutabaah Score (Avg)
  let totalMutabaahScore = 0;
  mutabaah.forEach((m) => {
    let score = 0;
    const items = [
      m.shalatSubuh,
      m.shalatDzuhur,
      m.shalatAshar,
      m.shalatMaghrib,
      m.shalatIsya,
      m.shalatDhuha,
      m.qiyamulail,
      m.shaum,
      m.sedekah,
      m.sholawat,
      m.witir,
    ];
    // Count "YA" or "JAMAAH"
    const positive = items.filter((i) => i === "YA" || i === "JAMAAH").length;
    score = (positive / items.length) * 100;
    totalMutabaahScore += score;
  });
  const avgMutabaah =
    mutabaah.length > 0 ? Math.round(totalMutabaahScore / mutabaah.length) : 0;

  // Journal: Count filled sessions
  const filledJournals = journal.length;

  // Performance Score (Mock based on the above)
  const performanceScore = Math.round(
    (totalPresence * 10 + avgMutabaah + filledJournals * 5) / 3
  );

  return {
    totalWorkDays: attendance.length,
    totalPresence,
    totalLate,
    avgMutabaah,
    journalCount: filledJournals,
    performanceScore: Math.min(100, performanceScore),

    // For Charts
    attendanceTrend: attendance.map((a) => ({
      date: a.tanggal,
      status: a.reportKehadiran,
    })),
    mutabaahTrend: mutabaah.map((m) => {
      // Recalculate daily score for trend
      let score = 0;
      const items = [
        m.shalatSubuh,
        m.shalatDzuhur,
        m.shalatAshar,
        m.shalatMaghrib,
        m.shalatIsya,
        m.shalatDhuha,
        m.qiyamulail,
        m.shaum,
        m.sedekah,
        m.sholawat,
        m.witir,
      ];
      const positive = items.filter((i) => i === "YA" || i === "JAMAAH").length;
      score = (positive / items.length) * 100;
      return {
        date: m.tanggal,
        score: Math.round(score),
      };
    }),
  };
};
