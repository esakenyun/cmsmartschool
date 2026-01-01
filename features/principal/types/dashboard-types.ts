export interface DashboardStats {
  totalLogs: number;
  totalOnTime: number;
  totalLate: number;
  avgMutabaah: number;
  journalStats: {
    complete: number;
    incomplete: number;
    missing: number;
  };
  dailyTrend: {
    date: string;
    onTime: number;
    late: number;
  }[];
  mutabaahActivities: {
    name: string;
    value: number;
  }[];
}
