"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  unit: string;
  imageUrl: string;
}

import axios from "axios";

// ... previous imports

// ... Interface User

export async function loginWithEmail(_prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const requestedRole = formData.get("role") as string;

  if (!email) {
    return { message: "Email is required" };
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL_DEV is not defined");
      return { message: "Server configuration error" };
    }

    const res = await axios.get(`${apiUrl}/users`);
    const users: User[] = res.data;
    const user = users.find((u) => u.email === email);

    if (!user) {
      return { message: "User not found" };
    }

    // Strict Role Validation
    if (requestedRole) {
      const userRoleLower = user.role.toLowerCase();
      let isValidRole = false;

      switch (requestedRole) {
        case "pimpinan":
          isValidRole =
            userRoleLower === "pimpinan" || userRoleLower === "yayasan";
          break;
        case "kepala-sekolah":
          isValidRole =
            userRoleLower === "principal" ||
            userRoleLower === "kepala" ||
            userRoleLower === "kepala-sekolah";
          break;
        case "guru":
          isValidRole = userRoleLower === "teacher" || userRoleLower === "guru";
          break;
        case "siswa":
          isValidRole =
            userRoleLower === "student" || userRoleLower === "siswa";
          break;
        default:
          // If role is unknown, we might enforce strict check or allow.
          // Given the requirement "strictly match", we fail if doesn't match known categories or if requestedRole is weird.
          isValidRole = false;
      }

      if (!isValidRole) {
        // return { message: "Account exists but does not belong to this role." };
        return { message: "Maaf, akun Anda belum terdaftar dalam role ini" };
      }
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("user_session", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 12, // 12 hours
      // maxAge: 15,
      path: "/",
    });

    // Determine redirect path
    let redirectPath = "/dashboard";
    switch (user.role) {
      case "pimpinan": // Mapping based on login-form roles
        redirectPath = "/dashboard/pimpinan";
        break;
      case "kepala-sekolah": // Mapping based on login-form roles
        redirectPath = "/dashboard/kepala-sekolah";
        break;
      case "guru":
        redirectPath = "/dashboard/guru";
        break;
      case "siswa":
        redirectPath = "/dashboard/siswa";
        break;
      default:
        redirectPath = "/dashboard";
    }

    return { success: true, redirectUrl: redirectPath };
  } catch (error) {
    console.error("Login error:", error);
    // basic error handling similar to previous fetch approach for non-ok responses
    if (axios.isAxiosError(error) && error.response) {
      return { message: "Failed to fetch users" };
    }
    return { message: "An unexpected error occurred" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("user_session");
  // We can't use redirect() here if we want to be called from client event handlers easily without try/catch block for Next.js redirects
  // Or we can use redirect() and handle it in client. For simplicity in server actions:
  // Using redirect in Server Action works fine.
  redirect("/login");
}
