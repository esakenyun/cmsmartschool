import { z } from "zod";
import { apiClient } from "@/lib/api";
import { UserSchema, UserData } from "../schemas/user-schema";

export type { UserData };

export const fetchUsers = async (): Promise<UserData[]> => {
  const response = await apiClient.get<UserData[]>("/users");
  // Validate data on get (run-time validation)
  return z.array(UserSchema).parse(response);
};

export const getUserByEmail = async (
  email: string
): Promise<UserData | undefined> => {
  const users = await fetchUsers();
  return users.find((u) => u.email === email);
};

export const getUserByRole = async (
  role: string
): Promise<UserData | undefined> => {
  const users = await fetchUsers();
  // console.log(users.find((u) => u.role === role));
  return users.find((u) => u.role === role);
};

export const updateUser = async (
  id: string,
  data: Partial<UserData>
): Promise<UserData> => {
  // Validate data on push (before sending to API)
  const validatedData = UserSchema.partial().parse(data);
  return apiClient.put<UserData>(`/users/${id}`, validatedData);
};
