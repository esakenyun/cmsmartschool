import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import { getTeacherById } from "@/features/teachers/services/teacher-service";
import { notFound } from "next/navigation";
import TendikKepalaSekolahContent from "./client-view";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DetailTenagaPendidikPage({ params }: PageProps) {
  const { id } = await params;

  const guru = await getTeacherById(id);

  if (!guru) return notFound();

  return (
    <ContentLayout title="Detail Tenaga Pendidik">
      <TendikKepalaSekolahContent guru={guru} />
    </ContentLayout>
  );
}
