import { getTeacherById } from "@/services/teacher-service";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DetailGuruPage({ params }: PageProps) {
  const { id } = await params;

  const guru = await getTeacherById(id);

  if (!guru) return notFound();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h1 className="text-xl font-bold text-slate-800">{guru.name}</h1>
        <p className="text-sm text-emerald-600">{guru.role}</p>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <Stat label="Presensi Kehadiran" value={guru.stats.presence} />
        <Stat label="Mutabaah Yaumiyah" value={guru.stats.mutabaah} />
        <Stat label="Jurnal Kerja" value={guru.stats.journal} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-500">{label}</span>
        <span className="font-bold">{value}%</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full">
        <div
          className="bg-emerald-500 h-2 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
