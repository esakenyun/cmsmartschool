import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import PresensiSiswaContent from "./client-view";

export default function PresensiSiswa() {
  return (
    <ContentLayout title="Dashboard Presensi">
      <PresensiSiswaContent />
    </ContentLayout>
  );
}
