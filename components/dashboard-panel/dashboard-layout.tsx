"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";

export default function DashboardPanelLayout({
  children,
  unit,
}: {
  children: React.ReactNode;
  unit?: string;
}) {
  const sidebar = useStore(useSidebar, (x) => x);
  const pathname = usePathname();
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;

  // Role determination logic
  let sidebarBg = "bg-white"; // default
  let sidebarText = "text-black";
  let activeColor = "bg-emerald-500"; // default fallback
  let activeHoverColor = "hover:bg-emerald-500";
  let roleTitle = "Smart School";
  let dashboardHref = "/dashboard";

  if (pathname.includes("/dashboard/pimpinan")) {
    sidebarBg = "bg-slate-900";
    sidebarText = "text-white";
    activeColor = "bg-indigo-500 text-white";
    activeHoverColor = "hover:bg-indigo-500 hover:text-white";
    roleTitle = "Pimpinan";
    dashboardHref = "/dashboard/pimpinan";
  } else if (pathname.includes("/dashboard/kepala-sekolah")) {
    sidebarBg = "bg-blue-900";
    sidebarText = "text-white";
    activeColor = "bg-blue-500 text-white";
    activeHoverColor = "hover:bg-blue-500 hover:text-white";
    roleTitle = "Kepala Sekolah";
    dashboardHref = "/dashboard/kepala-sekolah";
  } else if (pathname.includes("/dashboard/guru")) {
    sidebarBg = "bg-white";
    sidebarText = "text-black";
    activeColor = "bg-emerald-500 text-white";
    activeHoverColor = "hover:bg-emerald-500 hover:text-white";
    roleTitle = "Guru";
    dashboardHref = "/dashboard/guru";
  } else if (pathname.includes("/dashboard/siswa")) {
    sidebarBg = "bg-white";
    sidebarText = "text-black";
    activeColor = "bg-orange-500 text-white";
    activeHoverColor = "hover:bg-orange-500 hover:text-white";
    roleTitle = "Siswa";
    dashboardHref = "/dashboard/siswa";
  }

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
