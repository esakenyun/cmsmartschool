import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import PimpinanKurikulumContent from "./client-view";

export default function KurikulumYayasan() {
  return (
    <ContentLayout title="Kurikulum Yayasan">
      <PimpinanKurikulumContent />
    </ContentLayout>
  );
}
