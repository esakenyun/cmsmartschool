import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import AmaliahDetailClient from "./client-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Detail Amaliah Harian Siswa - Smart School",
  description: "Lihat riwayat pembiasaan ibadah harian siswa.",
};

export default async function AmaliahDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <ContentLayout title="Detail Amaliah Harian Siswa">
      <AmaliahDetailClient studentNameParam={id} />
    </ContentLayout>
  );
}
