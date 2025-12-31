import { cookies } from "next/headers";
import DashboardPanelLayout from "@/components/dashboard-panel/dashboard-layout";

export default async function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userSession = cookieStore.get("user_session");
  let user = null;

  if (userSession) {
    try {
      user = JSON.parse(userSession.value);
    } catch (error) {
      console.error("Failed to parse user session:", error);
    }
  }

  return (
    <DashboardPanelLayout unit={user?.unit}>{children}</DashboardPanelLayout>
  );
}
