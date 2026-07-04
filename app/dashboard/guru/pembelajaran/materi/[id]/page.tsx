import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import MateriDetailClient from "./client-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MateriDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <ContentLayout title="Detail Materi Pembelajaran">
      <MateriDetailClient id={id} />
    </ContentLayout>
  );
}
