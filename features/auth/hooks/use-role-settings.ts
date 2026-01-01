import { usePathname } from "next/navigation";

export function useRoleSettings() {
  const pathname = usePathname();

  let sidebarBg = "bg-white"; // default
  let sidebarText = "text-black";
  let activeColor = "bg-emerald-500 text-white"; // default fallback - note: previously just bg-emerald-500 in dashboard-layout, but text-white included in sheet-menu. Consolidating to include text-white for safety or consistency.
  // Actually dashboard-layout spread activeColor and activeHoverColor, but dashboard-layout used "bg-emerald-500" (no text color) as default fallback, but specific blocks had "bg-indigo-500 text-white".
  // Let's standardise.

  let activeHoverColor = "hover:bg-emerald-500 hover:text-white";
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

  // Handle default fallback for DashboardLayout which was:
  // activeColor = "bg-emerald-500";
  // activeHoverColor = "hover:bg-emerald-500";
  // But SheetMenu had "bg-emerald-500 text-white".
  // I'll stick to text-white inclusion for implementation consistency.

  // Also, for 'default' fallback in loop, it was just "Smart School" and "/dashboard".

  return {
    sidebarBg,
    sidebarText,
    activeColor,
    activeHoverColor,
    roleTitle,
    dashboardHref,
  };
}
