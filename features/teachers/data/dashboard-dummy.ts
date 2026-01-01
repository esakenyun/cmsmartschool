// Helper to generate consistent pseudo-random numbers based on a seed
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export interface DayData {
  date: Date;
  isWorkDay: boolean; // Mon-Sat
  workHours: number;
  planningScore: number;
  implementationScore: number;
  evaluationScore: number;
  // Derived metrics
  performanceScore: number;
}

// Generate a large dataset for the year 2024-2025
const generateDataset = (): DayData[] => {
  const data: DayData[] = [];
  const startDate = new Date(2024, 0, 1);
  const endDate = new Date(2025, 11, 31);
  const oneDay = 24 * 60 * 60 * 1000;

  for (
    let dt = startDate;
    dt <= endDate;
    dt = new Date(dt.getTime() + oneDay)
  ) {
    const dayOfWeek = dt.getDay();
    // Assuming Mon(1) - Sat(6) are work days in some schools, or Mon-Fri.
    // Let's assume Mon-Fri (1-5) are standard work days.
    const isWorkDay = dayOfWeek >= 1 && dayOfWeek <= 5;

    // Use timestamp as seed for consistent data
    const seed = dt.getTime();

    let workHours = 0;
    let planning = 0;
    let implementation = 0;
    let evaluation = 0;

    if (isWorkDay) {
      // Create a base daily factor (0.0 - 1.0) representing "how good the day was"
      const dailyFactor = seededRandom(seed);

      // Random work hours between 6 and 9, strongly correlated with dailyFactor
      // 0.0-0.25 -> 6, 0.25-0.5 -> 7, 0.5-0.75 -> 8, 0.75-1.0 -> 9
      workHours = 6 + Math.floor(dailyFactor * 4);

      // Scores between 60 and 100, correlated with dailyFactor but with slight random variance
      // We mix dailyFactor (80%) and a random noise (20%)
      const getScore = (offset: number) => {
        const noise = seededRandom(seed + offset);
        const blended = dailyFactor * 0.7 + noise * 0.3; // High correlation
        return 60 + Math.floor(blended * 41);
      };

      planning = getScore(1);
      implementation = getScore(2);
      evaluation = getScore(3);
    }

    const performanceScore = isWorkDay
      ? Math.round((planning + implementation + evaluation) / 3)
      : 0;

    data.push({
      date: dt,
      isWorkDay,
      workHours,
      planningScore: planning,
      implementationScore: implementation,
      evaluationScore: evaluation,
      performanceScore,
    });
  }
  return data;
};

// Singleton dataset
const FULL_DATASET = generateDataset();

export interface DashboardSummary {
  totalWorkDays: number;
  totalWorkHours: number;
  avgPlanningScore: number;
  avgImplementationScore: number;
  avgEvaluationScore: number;
  avgPerformanceScore: number;

  // For charts
  chartData: {
    label: string; // Date or Week
    performance: number;
    workHours: number;
  }[];

  adminScores: {
    name: string;
    completed: number; // Avg score
    target: number;
  }[];
}

export function getTeacherDashboardData(
  startDate: Date,
  endDate: Date
): DashboardSummary {
  // Normalize dates to start of day
  const start = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const end = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
    23,
    59,
    59
  );

  // Filter data within range
  const filteredData = FULL_DATASET.filter(
    (d) => d.date >= start && d.date <= end
  );
  const workDaysData = filteredData.filter((d) => d.isWorkDay);

  const totalWorkDays = workDaysData.length;
  const totalWorkHours = workDaysData.reduce(
    (acc, curr) => acc + curr.workHours,
    0
  );

  // Averages (using only work days)
  const avgPlanning =
    totalWorkDays > 0
      ? Math.round(
          workDaysData.reduce((acc, curr) => acc + curr.planningScore, 0) /
            totalWorkDays
        )
      : 0;
  const avgImplementation =
    totalWorkDays > 0
      ? Math.round(
          workDaysData.reduce(
            (acc, curr) => acc + curr.implementationScore,
            0
          ) / totalWorkDays
        )
      : 0;
  const avgEvaluation =
    totalWorkDays > 0
      ? Math.round(
          workDaysData.reduce((acc, curr) => acc + curr.evaluationScore, 0) /
            totalWorkDays
        )
      : 0;

  const avgPerformance = Math.round(
    (avgPlanning + avgImplementation + avgEvaluation) / 3
  );

  // Determine chart granularity
  const dayDiff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

  let chartData: { label: string; performance: number; workHours: number }[] =
    [];

  if (dayDiff <= 7) {
    // Show Daily Trend
    chartData = filteredData
      .filter((d) => d.isWorkDay)
      .map((d) => ({
        label: d.date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        }),
        performance: d.performanceScore,
        workHours: d.workHours,
      }));
  } else {
    // Show Weekly Trend
    // Group by week
    const weeks: Record<
      string,
      { totalPerf: number; totalHours: number; count: number }
    > = {};

    // Helper to get week key (e.g., "Week 1 Jan")
    // Simple approach: start of week date
    filteredData.forEach((d) => {
      // Find Monday of the week
      const tempDate = new Date(d.date);
      const key = `${d.date.getFullYear()}-W${getWeekNumber(tempDate)}`; // Year-Week unique key

      if (!weeks[key]) {
        weeks[key] = { totalPerf: 0, totalHours: 0, count: 0 };
      }
      if (d.isWorkDay) {
        weeks[key].totalPerf += d.performanceScore;
        weeks[key].totalHours += d.workHours;
        weeks[key].count += 1;
      }
    });

    chartData = Object.keys(weeks).map((key) => {
      const w = weeks[key];
      // We want average performance per week, but maybe total work hours per week?
      // User said: "if 1 moth you can display per week"
      return {
        label: key,
        performance: w.count > 0 ? Math.round(w.totalPerf / w.count) : 0,
        workHours:
          w.count > 0 ? Number((w.totalHours / w.count).toFixed(1)) : 0,
      };
    });
  }

  return {
    totalWorkDays,
    totalWorkHours,
    avgPlanningScore: avgPlanning,
    avgImplementationScore: avgImplementation,
    avgEvaluationScore: avgEvaluation,
    avgPerformanceScore: avgPerformance,
    chartData,
    adminScores: [
      { name: "Perencanaan", completed: avgPlanning, target: 100 },
      { name: "Pelaksanaan", completed: avgImplementation, target: 100 },
      { name: "Evaluasi", completed: avgEvaluation, target: 100 },
    ],
  };
}

// Simple week number helper
function getWeekNumber(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
