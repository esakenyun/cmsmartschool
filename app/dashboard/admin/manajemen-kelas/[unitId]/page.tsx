import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import { units } from "@/features/admin/data/mock-data";
import UnitDetailView from "./unit-detail-view";

export default async function DetailManajemenUnit({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;

  // Check if ID matches a Unit (e.g., "sma", "tk")
  const unit = units.find((u) => u.id === unitId);

  if (!unit) {
    return <div>Unit not found</div>;
  }

  return (
    <ContentLayout title={`Manajemen Kelas - ${unit.name}`}>
      <UnitDetailView unitId={unitId} />
    </ContentLayout>
  );
}
