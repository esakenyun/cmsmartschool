import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import KepalaSekolahKurikulumContent from "./client-view";

export default function KurikulumKepalaSekolah() {
  return (
    <ContentLayout title="Kurikulum Kepala Sekolah">
      <KepalaSekolahKurikulumContent />
    </ContentLayout>
  );
}
