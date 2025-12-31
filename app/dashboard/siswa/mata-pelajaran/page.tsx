import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import MataPelajaranSiswaContent from "./client-view";

export default function MataPelajaranSiswa() {
  return (
    <ContentLayout title="Ruang Belajar">
      <MataPelajaranSiswaContent />
    </ContentLayout>
  );
}
