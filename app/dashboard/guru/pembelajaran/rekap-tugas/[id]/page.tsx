import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import RekapTugasDetailClient from "./client-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Detail Hasil Tugas Siswa - Smart School",
  description: "Lihat rincian pengumpulan tugas dan berikan nilai.",
};

export default async function RekapTugasDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <ContentLayout title="Detail Hasil Tugas Siswa">
      <RekapTugasDetailClient submissionId={id} />
    </ContentLayout>
  );
}
