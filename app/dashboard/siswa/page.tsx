import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import DashboardSiswaContent from "./client-view";

export default function DashboardSiswa() {
  return (
    <ContentLayout title="Beranda Siswa">
      <DashboardSiswaContent />
    </ContentLayout>
  );
}
