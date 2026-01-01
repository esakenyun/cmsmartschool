import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";
import { ContentLayout } from "@/components/dashboard-panel/content-layout";

export default function Loading() {
  return (
    <ContentLayout title="Profile Kepala Sekolah">
      <ProfileSkeleton />
    </ContentLayout>
  );
}
