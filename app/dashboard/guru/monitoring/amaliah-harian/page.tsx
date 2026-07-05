import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import AmaliahClientView from "./client-view";

export const metadata = {
  title: "Amaliah Harian Siswa - Smart School",
  description: "Monitoring pembiasaan ibadah harian siswa.",
};

export default function AmaliahPage() {
  return (
    <ContentLayout title="Amaliah Harian Siswa">
      <AmaliahClientView />
    </ContentLayout>
  );
}
