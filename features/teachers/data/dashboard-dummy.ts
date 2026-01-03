import { generateTendikDetail } from "./data-tendik";
import { getAggregatedTeacherStats } from "../utils/data-mapper";

export interface DashboardSummary {
  totalWorkDays: number;
  totalWorkHours: number;
  avgPlanningScore: number;
  avgImplementationScore: number;
  avgEvaluationScore: number;
  avgPerformanceScore: number;

  // For charts
  chartData: {
    label: string;
    performance: number;
    workHours: number;
    // Additional fields if needed for line chart
    date?: string;
    score?: number;
  }[];

  // For Bar Chart
  adminScores: {
    name: string;
    completed: number;
    target: number;
  }[];

  // Aliases for compatibility if needed
  performanceTrend?: {
    label: string;
    date: string;
    score: number;
    performance: number;
    workHours: number;
  }[];
  administrationProgress?: {
    category: string;
    completed: number;
    total: number;
  }[];
  journalCount?: number;
}

export const getTeacherDashboardData = (
  startDate: Date,
  endDate: Date
): DashboardSummary => {
  // 1. Generate the detailed data
  const allData = generateTendikDetail();

  // 2. Filter for "Dian"
  const loggedInTeacherName = "Dian Mulyawati S.PD";

  const stats = getAggregatedTeacherStats(
    allData,
    loggedInTeacherName,
    startDate,
    endDate
  );

  // Map to dashboard structure
  const performanceTrend = stats.mutabaahTrend.map((m) => ({
    label: m.date, // or format date
    date: m.date,
    score: m.score,
    performance: m.score, // alias
    workHours: 8, // Mock 8h
  }));

  const avgPlanning = Math.min(100, stats.performanceScore + 5);
  const avgImplementation = stats.performanceScore;
  const avgEvaluation = Math.max(0, stats.performanceScore - 5);

  return {
    avgPerformanceScore: stats.performanceScore,
    totalWorkDays: stats.totalPresence,
    totalWorkHours: stats.totalPresence * 8,

    avgPlanningScore: avgPlanning,
    avgImplementationScore: avgImplementation,
    avgEvaluationScore: avgEvaluation,

    chartData: performanceTrend,

    // Compatibility fields for the charts in client-view
    performanceTrend: performanceTrend,
    administrationProgress: [
      { category: "Perencanaan", completed: avgPlanning, total: 100 },
      { category: "Pelaksanaan", completed: avgImplementation, total: 100 },
      { category: "Evaluasi", completed: avgEvaluation, total: 100 },
    ],

    adminScores: [
      { name: "Perencanaan", completed: avgPlanning, target: 100 },
      { name: "Pelaksanaan", completed: avgImplementation, target: 100 },
      { name: "Evaluasi", completed: avgEvaluation, target: 100 },
    ],

    journalCount: stats.journalCount,
  };
};
