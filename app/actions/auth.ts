"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUserByEmail } from "@/features/auth/services/auth-service";
import {
  validateRole,
  getRedirectPath,
} from "@/features/auth/utils/auth-logic";

export async function loginWithEmail(_prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const requestedRole = formData.get("role") as string;

  if (!email) {
    return { message: "Email is required" };
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return { message: "User not found" };
    }

    // Role Validation using shared logic
    if (!validateRole(user.role, requestedRole)) {
      return { message: "Maaf, akun Anda belum terdaftar dalam role ini" };
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("user_session", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 12, // 12 hours
      path: "/",
    });

    const redirectPath = getRedirectPath(user.role);
    return { success: true, redirectUrl: redirectPath };
  } catch (error) {
    console.error("Login error:", error);
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
