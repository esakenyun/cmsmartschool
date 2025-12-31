import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("user_session")?.value;

  // 1. Unauthenticated Redirects
  if (!session) {
    // If trying to access dashboard without session, redirect to login
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Allow access to other pages (like login)
    return NextResponse.next();
  }

  // Parse session
  let user;
  try {
    user = JSON.parse(session);
  } catch (e) {
    // Invalid session, clear and redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("user_session");
    return response;
  }

  // 2. Authenticated Redirects (prevent access to login page)
  if (pathname === "/login") {
    // Redirect to their specific dashboard
    const targetDashboard = getDashboardPath(user.role);
    return NextResponse.redirect(new URL(targetDashboard, request.url));
  }

  // 3. Role-Based Access Control for Dashboard
  if (pathname.startsWith("/dashboard")) {
    const allowedPath = getDashboardPath(user.role);

    // If visiting the root /dashboard, redirect to their specific dashboard
    if (pathname === "/dashboard") {
      return NextResponse.redirect(new URL(allowedPath, request.url));
    }

    // Role Protection: Check if the user is in their allowed territory
    // We check if the current path starts with their allowed path
    // e.g., /dashboard/guru/kinerja starts with /dashboard/guru -> OK
    // e.g., /dashboard/pimpinan/asset does NOT start with /dashboard/guru -> Block
    if (!pathname.startsWith(allowedPath)) {
      // Redirect back to their own dashboard
      return NextResponse.redirect(new URL(allowedPath, request.url));
    }
  }

  return NextResponse.next();
}

// Helper to map roles to dashboard paths
function getDashboardPath(role: string): string {
  switch (role?.toLowerCase()) {
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

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
