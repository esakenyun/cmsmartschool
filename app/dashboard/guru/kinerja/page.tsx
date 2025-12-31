import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import KinerjaGuruContent from "./client-view";

export default function LaporanKinerjaGuru() {
  return (
    <ContentLayout title="Laporan Kinerja Guru">
      <KinerjaGuruContent />
    </ContentLayout>
  );
}
