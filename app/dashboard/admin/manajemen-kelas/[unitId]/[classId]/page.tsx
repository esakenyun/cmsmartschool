import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import { classes } from "@/features/admin/data/mock-data";
import DetailManajemenContent from "./client-view";

export default async function DetailManajemenKelas({
  params,
}: {
  params: Promise<{ unitId: string; classId: string }>;
}) {
  const { unitId, classId } = await params;

  // Check if ID matches a Class (e.g., "1", "2")
  const kelas = classes.find((c) => c.id === Number(classId));

  if (!kelas) return <div>Data tidak ditemukan</div>;

  // Ideally, we should also check if kelas.unitId === unitId
  // but for now, we'll just display the class if found

  return (
    <ContentLayout title={`Detail ${kelas.name}`}>
      <DetailManajemenContent kelas={kelas} unitId={unitId} />
    </ContentLayout>
  );
}
