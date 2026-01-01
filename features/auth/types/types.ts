import { z } from "zod";
import { UserSchema } from "../schema/schema";

export type UserData = z.infer<typeof UserSchema>;

export interface AuthResponse {
  success?: boolean;
  message?: string;
  redirectUrl?: string;
}
