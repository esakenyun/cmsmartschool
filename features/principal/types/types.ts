export type AdminStatus = "null" | "submitted" | "approved";

export interface AdminItem {
  id: string;
  title: string;
  type: string;
  status: AdminStatus;
  date: string;
  link?: string;
}

export interface TeacherAdminData {
  id: string;
  name: string;
  subject: string;
  class: string;
  planning: AdminItem[];
  implementation: AdminItem[];
  evaluation: AdminItem[];
}
