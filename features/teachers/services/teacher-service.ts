import { Teacher } from "../data/data-teacher";
import { teachers } from "../data/data-teacher";

// Simulating API delay
const DELAY = 1000;

export const getTeachers = async (): Promise<Teacher[]> => {
  // Use apiClient for real generic interaction
  // return apiClient.get<Teacher[]>("/teachers");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teachers);
    }, DELAY);
  });
};

export const getTeacherById = async (
  id: string
): Promise<Teacher | undefined> => {
  // return apiClient.get<Teacher>(`/teachers/${id}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teachers.find((t) => t.id === id));
    }, DELAY);
  });
};