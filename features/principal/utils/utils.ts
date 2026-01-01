import { DashboardStats } from "../types/dashboard-types";
import {
  differenceInDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  format,
} from "date-fns";
import { id } from "date-fns/locale";

export const COLORS = ["#10b981", "#f59e0b", "#ef4444"]; // Green, Amber, Red

// Helper to generate consistent random stats based on inputs
export const getTeacherStats = (
  teacherId: string,
  startDate: Date | string,
  endDate: Date | string
): DashboardStats => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Hash seed calculation
  const inputString = teacherId + start.toISOString() + end.toISOString();
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const seed = Math.abs(hash);

  const isAll = teacherId === "all";
  // If single teacher: max 1 attendance per day. If all: approx 8 teachers per day (from dummy data size)
  const dailyAttendanceCount = isAll ? 8 : 1;

  // Determine trend data based on range
  const daysDiff = differenceInDays(end, start) + 1; // Inclusive days
  let trendData = [];

  const createDailyStats = (seedBase: number, label: string) => {
    // Randomize lateness
    // For single teacher: either 0 or 1 late, never part-late part-ontime
    let onTime = 0;
    let late = 0;

    if (isAll) {
      // Aggregate: simpler randomization
      const lateCount = Math.floor(
        (seedBase % 3) + (seedBase % 10 > 7 ? 1 : 0)
      );
      late = Math.min(dailyAttendanceCount, lateCount);
      onTime = dailyAttendanceCount - late;
    } else {
      // Single Teacher: Binary state (0 or 1)
      const isLate = seedBase % 100 < 15; // 15% chance of being late
      // Also slight chance of being absent (not logged)? Assuming always present for now or high presence
      const isAbsent = seedBase % 100 > 95; // 5% absent

      if (!isAbsent) {
        if (isLate) {
          late = 1;
          onTime = 0;
        } else {
          late = 0;
          onTime = 1;
        }
      }
    }

    return {
      date: label,
      onTime,
      late,
    };
  };

  // Adjust logic for interval
  // Note: daysDiff calculation above is simple diff, but we need to handle the specific logic loops

  const diffDays = differenceInDays(end, start);

  if (diffDays <= 7) {
    // Daily View
    const days = eachDayOfInterval({ start, end });
    trendData = days.map((day, i) => {
      const daySeed = seed + i * 123;
      return createDailyStats(daySeed, format(day, "EEEE", { locale: id }));
    });
  } else if (diffDays <= 35) {
    // Weekly View
    const weeks = eachWeekOfInterval(
      { start, end },
      { locale: id, weekStartsOn: 1 }
    );
    trendData = weeks.map((week, i) => {
      const weekSeed = seed + i * 456;
      // For weekly/monthly view, we sum up simulated daily stats
      // Simulating approximation: 5 working days/week
      const workingDays = 5;
      let wOnTime = 0;
      let wLate = 0;

      for (let d = 0; d < workingDays; d++) {
        const dStat = createDailyStats(weekSeed + d, "");
        wOnTime += dStat.onTime;
        wLate += dStat.late;
      }

      return {
        date: `Minggu ${i + 1}`,
        onTime: wOnTime,
        late: wLate,
      };
    });
  } else {
    // Monthly View
    const months = eachMonthOfInterval({ start, end });
    trendData = months.map((month, i) => {
      const monthSeed = seed + i * 789;
      // Approx 20 working days
      const workingDays = 20;
      let mOnTime = 0;
      let mLate = 0;

      for (let d = 0; d < workingDays; d++) {
        const dStat = createDailyStats(monthSeed + d, "");
        mOnTime += dStat.onTime;
        mLate += dStat.late;
      }

      return {
        date: format(month, "MMMM", { locale: id }),
        onTime: mOnTime,
        late: mLate,
      };
    });
  }

  // Recalculate totals based on trendData
  const totalOnTime = trendData.reduce((acc, curr) => acc + curr.onTime, 0);
  const totalLate = trendData.reduce((acc, curr) => acc + curr.late, 0);
  const totalLogs = totalOnTime + totalLate;

  // Jurnal Stats - Decoupled from Attendance (TotalLogs)
  // Assume ~4 classes per day per teacher
  const classesPerDay = isAll ? 32 : 4; // 8 teachers * 4 classes
  // Total Days covered by valid trend data points (approximation)
  // Actually we should estimate total working days in range
  let estimatedWorkingDays = 0;
  if (diffDays <= 7) estimatedWorkingDays = trendData.length;
  else if (diffDays <= 35) estimatedWorkingDays = trendData.length * 5;
  else estimatedWorkingDays = trendData.length * 20;

  const totalJournals = estimatedWorkingDays * classesPerDay;

  const completeRate = 0.7 + (seed % 20) / 100;
  const complete = Math.floor(totalJournals * completeRate);
  const incomplete = Math.floor(totalJournals * ((1 - completeRate) / 2));
  const missing = Math.max(0, totalJournals - complete - incomplete);

  const mutabaahVariance = seed % 15; // Keep this from original for consistency
  const avgMutabaah = Math.min(100, Math.max(60, 85 + mutabaahVariance - 7));

  const mutabaahActivities = [
    {
      name: "Sholat Wajib",
      value: Math.floor((totalLogs * 0.9 + (seed % 50)) * (isAll ? 1 : 5)), // Multiply for single teacher to look nice? No, stick to scale
    },
    {
      name: "Sholat Duha",
      value: Math.floor(
        (totalLogs * 0.7 + ((seed * 2) % 50)) * (isAll ? 1 : 5)
      ),
    },
    {
      name: "Infaq",
      value: Math.floor(
        (totalLogs * 0.4 + ((seed * 4) % 50)) * (isAll ? 1 : 5)
      ),
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
