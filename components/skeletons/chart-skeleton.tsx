import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-full">
      <div className="mb-6 flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="flex items-end gap-4 h-64 w-full px-4 pb-4">
        <Skeleton className="h-32 w-full rounded-t-lg" />
        <Skeleton className="h-48 w-full rounded-t-lg" />
        <Skeleton className="h-64 w-full rounded-t-lg" />
        <Skeleton className="h-40 w-full rounded-t-lg" />
        <Skeleton className="h-56 w-full rounded-t-lg" />
        <Skeleton className="h-24 w-full rounded-t-lg" />
        <Skeleton className="h-44 w-full rounded-t-lg" />
      </div>
    </div>
  );
}

export function DonutChartSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-full flex flex-col items-center justify-center">
      <Skeleton className="h-5 w-48 mb-6 self-start" />
      <Skeleton className="h-48 w-48 rounded-full" />
    </div>
  );
}
