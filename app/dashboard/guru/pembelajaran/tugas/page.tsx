import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import TugasGuruContent from "./client-view";

export default function TugasGuru() {
  return (
    <ContentLayout title="Tugas & Penilaian">
      <TugasGuruContent />
    </ContentLayout>
  );
}
