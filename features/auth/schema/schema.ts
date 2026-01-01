import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  role: z.string(),
  unit: z.string().optional(),
  imageUrl: z.string().optional(),
  ttl: z.string().optional(),
  address: z.string().optional(),
  tmt: z.string().optional(),
  numberhandphone: z.string().optional(),
  nip: z.string().optional(),
  jabatan: z.string().optional(),
});

export type UserData = z.infer<typeof UserSchema>;
