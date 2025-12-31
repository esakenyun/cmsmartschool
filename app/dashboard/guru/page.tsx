import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import GuruDashboardContent from "./client-view";

export default function DashboardGuru() {
  return (
    <ContentLayout title="Dashboard Guru">
      <GuruDashboardContent />
    </ContentLayout>
  );
}
