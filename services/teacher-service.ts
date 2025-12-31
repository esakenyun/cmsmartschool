import { Teacher } from "@/lib/data-teacher";
import { teachers } from "@/lib/data-teacher";

// Simulating API delay
const DELAY = 1000;

export const getTeachers = async (): Promise<Teacher[]> => {
  // In a real application, this would be an API call
  // const response = await axios.get(`${API_URL}/teachers`);
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teachers);
    }, DELAY);
  });
};

export const getTeacherById = async (
  id: string
): Promise<Teacher | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teachers.find((t) => t.id === id));
    }, DELAY);
  });
};
