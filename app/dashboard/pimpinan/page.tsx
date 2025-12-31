import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import DashboardPimpinanContent from "./client-view";

export default function DashboardPimpinan() {
  return (
    <ContentLayout title="Ringkasan Ekslusif">
      <DashboardPimpinanContent />
    </ContentLayout>
  );
}
