import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import { bannerData } from "@/features/admin/data/mock-data";
import BannerManager from "./client-view";

export default async function BannerDetailPage({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;

  return (
    <ContentLayout title={`Manajemen Banner - ${unitId.toUpperCase()}`}>
      <BannerManager unitId={unitId} initialData={bannerData} />
    </ContentLayout>
  );
}
