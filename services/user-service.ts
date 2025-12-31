import axios from "axios";

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  unit: string;
  imageUrl: string;
  ttl: string;
  address: string;
  tmt: string;
  numberhandphone: string;
  nip: string;
  jabatan: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export const fetchUsers = async (): Promise<UserData[]> => {
  if (!API_URL) throw new Error("API URL is not defined");
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUserByRole = async (
  role: string
): Promise<UserData | undefined> => {
  const users = await fetchUsers();
  return users.find((u) => u.role === role);
};

export const updateUser = async (
  id: string,
  data: Partial<UserData>
): Promise<UserData> => {
  if (!API_URL) throw new Error("API URL is not defined");
  const response = await axios.put(`${API_URL}/users/${id}`, data);
  return response.data;
};
