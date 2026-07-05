import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import PresensiClientView from "./client-view";

export const metadata = {
  title: "Presensi Siswa - Smart School",
  description: "Monitoring kehadiran harian siswa.",
};

export default function PresensiPage() {
  return (
    <ContentLayout title="Presensi Harian Siswa">
      <PresensiClientView />
    </ContentLayout>
  );
}
