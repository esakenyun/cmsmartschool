import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import RekapTugasClient from "./client-view";

export const metadata = {
  title: "Rekap Tugas - Smart School",
  description: "Rekapitulasi tugas dan nilai siswa.",
};

export default function RekapTugasPage() {
  return (
    <ContentLayout title="Rekap Tugas & Nilai Siswa">
      <RekapTugasClient />
    </ContentLayout>
  );
}
