import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import { getTeacherById } from "@/features/teachers/services/teacher-service";
import { notFound } from "next/navigation";
import TendikKepalaSekolahContent from "./client-view";
import { generateTendikDetail } from "@/features/teachers/data/data-tendik";
import { getTeacherDetailData } from "@/features/teachers/utils/data-mapper";
import { TendikDetailSchema } from "@/features/teachers/schemas/tendik-detail-schema";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DetailTenagaPendidikPage({ params }: PageProps) {
  const { id } = await params;

  const guru = await getTeacherById(id);
  if (!guru) return notFound();

  // Fetch ALL data for the teacher (e.g., full year 2025) so client can filter locally
  const fullYearStart = new Date(2025, 0, 1); // Jan 1, 2025
  const fullYearEnd = new Date(2025, 11, 31); // Dec 31, 2025

  const allData = generateTendikDetail();
  // Pass guru.name because dummy data uses name for linkage
  const fetchedRawData = getTeacherDetailData(
    allData,
    guru.name,
    fullYearStart,
    fullYearEnd
  );

  // Validate data with Zod
  const validationResult = TendikDetailSchema.safeParse(fetchedRawData);

  if (!validationResult.success) {
    console.error("Data validation failed:", validationResult.error);
  }

  const detailData = validationResult.success
    ? validationResult.data
    : {
        attendance: [],
        mutabaah: [],
        journal: [],
      };

  // Default view range (June 2025)
  const defaultStart = new Date(2025, 5, 1);
  const defaultEnd = new Date(2025, 5, 30);

  return (
    <ContentLayout title="Detail Tenaga Pendidik">
      <TendikKepalaSekolahContent
        guru={guru}
        initialData={detailData}
        initialDateRange={{ from: defaultStart, to: defaultEnd }}
      />
    </ContentLayout>
  );
}
