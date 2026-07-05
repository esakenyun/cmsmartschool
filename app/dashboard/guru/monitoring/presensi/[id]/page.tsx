import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import PresensiDetailClient from "./client-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Detail Kehadiran Siswa - Smart School",
  description: "Lihat riwayat kehadiran lengkap siswa.",
};

export default async function PresensiDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <ContentLayout title="Detail Kehadiran Siswa">
      <PresensiDetailClient studentNameParam={id} />
    </ContentLayout>
  );
}
