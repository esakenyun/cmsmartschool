import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import DetailManajemenContent from "./client-view";
import { classes } from "@/features/admin/data/mock-data";

export default async function DetailManajemenKelas({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const kelas = classes.find((c) => c.id === Number(id));

  if (!kelas) return <div>Kelas tidak ditemukan</div>;

  return (
    <ContentLayout title={`Detail ${kelas.name}`}>
      <DetailManajemenContent kelas={kelas} />
    </ContentLayout>
  );
}
