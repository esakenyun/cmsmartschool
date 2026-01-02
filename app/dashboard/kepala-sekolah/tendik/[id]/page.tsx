import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import { getTeacherById } from "@/features/teachers/services/teacher-service";
import { notFound } from "next/navigation";
import TendikKepalaSekolahContent from "./client-view";
import { getTendikDetailData } from "@/features/teachers/data/tendik-dummy-detail";
import { TendikDetailSchema } from "@/features/teachers/schemas/tendik-detail-schema";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DetailTenagaPendidikPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { from, to } = await searchParams;

  const guru = await getTeacherById(id);
  if (!guru) return notFound();

  // Default to June 2025 as per dummy data context if no params
  const startDate = from ? new Date(from as string) : new Date(2025, 5, 1);
  const endDate = to ? new Date(to as string) : new Date(2025, 5, 30);

  const rawData = getTendikDetailData(id, startDate, endDate);

  // Validate data with Zod
  const validationResult = TendikDetailSchema.safeParse(rawData);

  if (!validationResult.success) {
    console.error("Data validation failed:", validationResult.error);
    // Handle error appropriately, maybe return generic error or empty data
  }

  const detailData = validationResult.success
    ? validationResult.data
    : {
        attendance: [],
        mutabaah: [],
        journal: [],
      };

  return (
    <ContentLayout title="Detail Tenaga Pendidik">
      <TendikKepalaSekolahContent
        guru={guru}
        initialData={detailData}
        initialDateRange={{ from: startDate, to: endDate }}
      />
    </ContentLayout>
  );
}
