import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import ProfilePage from "./client-view";
import { getUserByRole } from "@/features/users/services/user-service";

export default async function ProfileKepalaSekolah() {
  const kepsek = await getUserByRole("kepala-sekolah");

  return (
    <ContentLayout title="Profile Kepala Sekolah">
      <ProfilePage initialData={kepsek} />
    </ContentLayout>
  );
}
