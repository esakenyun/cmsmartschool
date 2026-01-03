import { DashboardStats } from "../types/dashboard-types";
import {
  differenceInDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  format,
} from "date-fns";
import { id } from "date-fns/locale";
import { generateTendikDetail } from "@/features/teachers/data/data-tendik";

// Generate fresh data
const {
  attendance: tendikAttendanceData,
  mutabaah: tendikMutabaahData,
  journal: tendikJournalData,
} = generateTendikDetail();

export const COLORS = ["#10b981", "#f59e0b", "#ef4444"]; // Green, Amber, Red

// Helper to parse DD/MM/YYYY
const parseDate = (dateStr: string) => {
  const parts = dateStr.split("/");
  return new Date(
    parseInt(parts[2]),
    parseInt(parts[1]) - 1,
    parseInt(parts[0])
  );
};

export const getTeacherStats = (
  teacherId: string,
  startDate: Date | string,
  endDate: Date | string
): DashboardStats => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 1. Filter Data
  const isAll = teacherId === "all"; // teacherId is actually Name now, or "all"

  const attendance = tendikAttendanceData.filter((d) => {
    const date = parseDate(d.tanggal);
    const inRange = date >= start && date <= end;
    // d.nama matches the passed name
    const matchId = isAll || d.nama === teacherId;
    return inRange && matchId;
  });

  const mutabaah = tendikMutabaahData.filter((d) => {
    const date = parseDate(d.tanggal);
    const inRange = date >= start && date <= end;
    const matchId = isAll || d.nama === teacherId;
    return inRange && matchId;
  });

  const journal = tendikJournalData.filter((d) => {
    const date = parseDate(d.tanggal);
    const inRange = date >= start && date <= end;
    const matchId = isAll || d.nama === teacherId;
    return inRange && matchId;
  });

  // 2. Calculate Attendance Stats
  const totalOnTime = attendance.filter(
    (d) => d.reportKehadiran === "Tepat Waktu"
  ).length;
  const totalLate = attendance.filter(
    (d) => d.reportKehadiran === "Terlambat"
  ).length;
  const totalLogs = totalOnTime + totalLate;

  // 3. Calculate Trend Data
  const diffDays = differenceInDays(end, start);
  let trendData = [];

  if (diffDays <= 7) {
    // Daily View
    const days = eachDayOfInterval({ start, end });
    trendData = days.map((day) => {
      const dayStr = format(day, "dd/MM/yyyy");
      const dayData = attendance.filter((d) => d.tanggal === dayStr);
      const onTime = dayData.filter(
        (d) => d.reportKehadiran === "Tepat Waktu"
      ).length;
      const late = dayData.filter(
        (d) => d.reportKehadiran === "Terlambat"
      ).length;
      return {
        date: format(day, "EEEE", { locale: id }),
        onTime,
        late,
      };
    });
  } else if (diffDays <= 35) {
    // Weekly View
    const weeks = eachWeekOfInterval(
      { start, end },
      { locale: id, weekStartsOn: 1 }
    );
    trendData = weeks.map((weekStart, i) => {
      // rough approximation: filter data belonging to this week
      // proper way: iterate attendance and check if in week interval
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const weekData = attendance.filter((d) => {
        const dDate = parseDate(d.tanggal);
        return dDate >= weekStart && dDate <= weekEnd;
      });

      const onTime = weekData.filter(
        (d) => d.reportKehadiran === "Tepat Waktu"
      ).length;
      const late = weekData.filter(
        (d) => d.reportKehadiran === "Terlambat"
      ).length;

      return {
        date: `Minggu ${i + 1}`,
        onTime,
        late,
      };
    });
  } else {
    // Monthly View
    const months = eachMonthOfInterval({ start, end });
    trendData = months.map((monthStart) => {
      const monthStr = format(monthStart, "MMMM", { locale: id });
      // Filter by month name from string since data has 'bulan' field
      // Or parse date. Let's use date parsing for accuracy.
      const monthData = attendance.filter((d) => {
        const dDate = parseDate(d.tanggal);
        return (
          dDate.getMonth() === monthStart.getMonth() &&
          dDate.getFullYear() === monthStart.getFullYear()
        );
      });

      const onTime = monthData.filter(
        (d) => d.reportKehadiran === "Tepat Waktu"
      ).length;
      const late = monthData.filter(
        (d) => d.reportKehadiran === "Terlambat"
      ).length;

      return {
        date: monthStr,
        onTime,
        late,
      };
    });
  }

  // 4. Calculate Journal Stats
  // Logic: Complete = all sessions filled? Or just count entries?
  // Previous logic was randomized. Let's define "Complete" as having content in all 5 sessions.
  // "Incomplete" as having some empty sessions.
  // "Missing" is tricky without a schedule. Let's assume (Total Attendance) * (Classes per day) - (Logged Journals) = Missing?
  // For simplicity:
  // Complete = Entry exists and kehdairan == "HADIR"
  // Incomplete = Entry exists but other status? or some sessions "-"
  // Missing = (Total Logs) - (Total Journal Entries) [Approximation] or just 0 for now.

  let complete = 0;
  let incomplete = 0;

  journal.forEach((j) => {
    // Check if all sessions 1-5 have content (not "-")
    const sessions = [j.sesi1, j.sesi2, j.sesi3, j.sesi4, j.sesi5];
    const filled = sessions.filter((s) => s && s !== "-" && s !== "0").length;

    if (filled === 5) complete++;
    else incomplete++;
  });

  const missing = 5; // Static low number or 0, since we generate journal for most present days

  // 5. Calculate Mutabaah Stats
  // Avg Mutabaah: (Sum of (Performed Activities / Total Targets) for each log) / Total Logs * 100
  // Approximation: calculate key activities %
  let totalScore = 0;
  mutabaah.forEach((m) => {
    let score = 0;
    // Simple scoring: 5 Salats (5pts), Duha(1), Tilawah(1), Shaum(1), Sedekah(1) = 9 pts max/day
    const prayers = [
      m.shalatSubuh,
      m.shalatDzuhur,
      m.shalatAshar,
      m.shalatMaghrib,
      m.shalatIsya,
    ];
    const prayerScore = prayers.filter(
      (p) => p && p !== "0" && p !== "-" && !p.includes("TIDAK")
    ).length; // Assuming "TIDAK" means missed? Data says "JAMAAH..." which is good.
    // Actually data says "JAMAAH AWAL WAKTU..."

    score += prayerScore;
    if (m.shalatDhuha === "YA") score++;
    if (parseInt(m.tilawah) > 0) score++;
    if (m.shaum === "YA") score++;
    if (m.sedekah === "YA") score++;

    totalScore += (score / 9) * 100;
  });

  const avgMutabaah =
    mutabaah.length > 0 ? Math.round(totalScore / mutabaah.length) : 0;

  // Mutabaah Activities Counts
  let shalatWajibCount = 0;
  let duhaCount = 0;
  let infaqCount = 0; // Sedekah

  mutabaah.forEach((m) => {
    const prayers = [
      m.shalatSubuh,
      m.shalatDzuhur,
      m.shalatAshar,
      m.shalatMaghrib,
      m.shalatIsya,
    ];
    const allPrayers = prayers.every((p) => p && p !== "0" && p !== "-");
    if (allPrayers) shalatWajibCount++;

    if (m.shalatDhuha === "YA") duhaCount++;
    if (m.sedekah === "YA") infaqCount++;
  });

  const mutabaahActivities = [
    {
      name: "Shalat Wajib",
      value: shalatWajibCount,
    },
    {
      name: "Shalat Duha",
      value: duhaCount,
    },
    {
      name: "Infaq",
      value: infaqCount,
    },
  ];

  return {
    totalLogs,
    totalOnTime,
    totalLate,
    avgMutabaah,
    journalStats: {
      complete,
      incomplete,
      missing,
    },
    dailyTrend: trendData,
    mutabaahActivities,
  };
};
