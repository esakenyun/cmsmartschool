import { usePathname } from "next/navigation";

export function useRoleSettings() {
  const pathname = usePathname();

  let sidebarBg = "bg-white"; // default
  let sidebarText = "text-black";
  let activeColor = "bg-teacher-500 text-white";
  let activeHoverColor = "hover:bg-teacher-500 hover:text-white";
  let roleTitle = "Smart School";
  let dashboardHref = "/dashboard";

  if (pathname.includes("/dashboard/pimpinan")) {
    sidebarBg = "bg-leader-950";
    sidebarText = "text-white";
    activeColor = "bg-leader-500 text-white";
    activeHoverColor = "hover:bg-leader-500 hover:text-white";
    roleTitle = "Pimpinan";
    dashboardHref = "/dashboard/pimpinan";
  } else if (pathname.includes("/dashboard/kepala-sekolah")) {
    sidebarBg = "bg-principal-900";
    sidebarText = "text-white";
    activeColor = "bg-principal-500 text-white";
    activeHoverColor = "hover:bg-principal-500 hover:text-white";
    roleTitle = "Kepala Sekolah";
    dashboardHref = "/dashboard/kepala-sekolah";
  } else if (pathname.includes("/dashboard/guru")) {
    sidebarBg = "bg-white";
    sidebarText = "text-black";
    activeColor = "bg-teacher-500 text-white";
    activeHoverColor = "hover:bg-teacher-500 hover:text-white";
    roleTitle = "Guru";
    dashboardHref = "/dashboard/guru";
  } else if (pathname.includes("/dashboard/siswa")) {
    sidebarBg = "bg-white";
    sidebarText = "text-black";
    activeColor = "bg-student-500 text-white";
    activeHoverColor = "hover:bg-student-500 hover:text-white";
    roleTitle = "Siswa";
    dashboardHref = "/dashboard/siswa";
  }

  return {
    sidebarBg,
    sidebarText,
    activeColor,
    activeHoverColor,
    roleTitle,
    dashboardHref,
  };
}
