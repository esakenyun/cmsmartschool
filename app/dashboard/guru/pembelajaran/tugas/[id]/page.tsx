import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import TugasDetailClient from "./client-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TugasDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <ContentLayout title="Detail Tugas & Penilaian">
      <TugasDetailClient id={id} />
    </ContentLayout>
  );
}
