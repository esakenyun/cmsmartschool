import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import ManajemenBannerContent from "./client-view";
import { bannerData } from "@/features/admin/data/mock-data";

export default function ManajemenBanner() {
  return (
    <ContentLayout title="Manajemen Banner">
      <ManajemenBannerContent initialData={bannerData} />
    </ContentLayout>
  );
}
