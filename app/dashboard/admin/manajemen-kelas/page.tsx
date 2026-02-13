import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import ManajemenKelasContent from "./client-view";

export default function ManajemenKelas() {
  return (
    <ContentLayout title="Manajemen Kelas">
      <ManajemenKelasContent />
    </ContentLayout>
  );
}
