import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import ProfilePage from "./client-view";
import { getUserByRole } from "@/features/auth/services/auth-service";

export default async function ProfileKepalaSekolah() {
  const kepsek = await getUserByRole("kepala-sekolah");

  return (
    <ContentLayout title="Profile Kepala Sekolah">
      <ProfilePage initialData={kepsek} />
    </ContentLayout>
  );
}
