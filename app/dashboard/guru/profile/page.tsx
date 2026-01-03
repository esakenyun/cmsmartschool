import { ContentLayout } from "@/components/dashboard-panel/content-layout";
import ProfileGuruContent from "./client-view";
import { getUserByRole } from "@/features/users/services/user-service";

export default async function ProfileGuru() {
  const guru = await getUserByRole("guru");

  return (
    <ContentLayout title="Profile Guru">
      <ProfileGuruContent initialData={guru} />
    </ContentLayout>
  );
}
