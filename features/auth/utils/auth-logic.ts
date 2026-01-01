export function validateRole(userRole: string, requestedRole: string): boolean {
  if (!requestedRole) return true; // logic from original was strict on requestedRole but if not provided? Original logic: if (requestedRole) ...

  const userRoleLower = userRole.toLowerCase();

  switch (requestedRole) {
    case "pimpinan":
      return userRoleLower === "pimpinan" || userRoleLower === "yayasan";
    case "kepala-sekolah":
      return (
        userRoleLower === "principal" ||
        userRoleLower === "kepala" ||
        userRoleLower === "kepala-sekolah"
      );
    case "guru":
      return userRoleLower === "teacher" || userRoleLower === "guru";
    case "siswa":
      return userRoleLower === "student" || userRoleLower === "siswa";
    default:
      return false;
  }
}

export function getRedirectPath(role: string): string {
  switch (role) {
    case "pimpinan":
      return "/dashboard/pimpinan";
    case "kepala-sekolah":
      return "/dashboard/kepala-sekolah";
    case "guru":
      return "/dashboard/guru";
    case "siswa":
      return "/dashboard/siswa";
    default:
      return "/dashboard";
  }
}
