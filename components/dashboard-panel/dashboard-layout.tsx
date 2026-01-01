"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
// import { usePathname } from "next/navigation"; // Removed
import { useRoleSettings } from "@/features/auth/hooks/use-role-settings";

export default function DashboardPanelLayout({
  children,
  unit,
}: {
  children: React.ReactNode;
  unit?: string;
}) {
  const sidebar = useStore(useSidebar, (x) => x);
  const {
    sidebarBg,
    sidebarText,
    activeColor,
    activeHoverColor,
    roleTitle,
    dashboardHref,
  } = useRoleSettings();

  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;

  return (
    <>
      <Sidebar
        backgroundColor={sidebarBg}
        textColor={sidebarText}
        activeColor={activeColor}
        activeHoverColor={activeHoverColor}
        title={roleTitle}
        dashboardHref={dashboardHref}
        unit={unit}
      />
      <main
        className={cn(
          "min-h-screen bg-zinc-50 transition-[margin-left] ease-in-out duration-300",
          !settings.disabled &&
            (!getOpenState()
              ? "tablet-landscape-max:ml-[90px]"
              : "tablet-landscape-max:ml-60")
        )}
      >
        {children}
      </main>
    </>
  );
}
