import { apiClient } from "@/core/api/client";
import {
  UserData,
  Training,
  YoutubePlaylistResponse,
  Subject,
  Class,
  TargetedSyncPayload,
  UpdateModulAjarPayload,
  ClassRoomLinkPayload,
  DashboardEksternalPayload,
  TeachingAssignmentClassroom,
  TeachingAssignmentExternal,
  StudentPresensi,
  Jabatan,
} from "@/features/auth/types/types";

export type { UserData };

const normalizeInternalProxyUrl = (
  url?: string | null,
): string | null | undefined => {
  if (!url) return url;

  if (url.startsWith("/api/")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    const knownOrigins = new Set(
      [
        process.env.INTERNAL_BACKEND_URL,
        process.env.NEXT_PUBLIC_API_URL,
        process.env.BACKEND_URL,
        "http://localhost:8080",
        "https://localhost:8080",
      ]
        .filter(Boolean)
        .map((value) => new URL(value as string).origin),
    );

    if (
      knownOrigins.has(parsed.origin) &&
      parsed.pathname.startsWith("/api/")
    ) {
      return `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    return url;
  }

  return url;
};

const normalizeUserData = <T extends UserData | undefined | null>(
  user: T,
): T => {
  if (!user) return user;

  return {
    ...user,
    image: normalizeInternalProxyUrl(user.image),
  } as T;
};

const getAuthHeaders = async (): Promise<Record<string, string>> => {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    if (sessionToken) {
      return { Cookie: `session_token=${sessionToken}` };
    }
  } catch (error) {}
  return {};
};

export const fetchUsers = async (): Promise<UserData[]> => {
  console.warn(
    "fetchUsers called but /users endpoint is not implemented on backend.",
  );
  return [];
};

export async function getCurrentUser() {
  try {
    const response = await apiClient.get<{
      authenticated: boolean;
      user?: {
        email: string;
        role: string;
        name: string;
        image?: string | null;
      };
    }>("/api/auth/me");
    if (response.user) {
      response.user.image = normalizeInternalProxyUrl(response.user.image);
    }
    return response;
  } catch {
    return { authenticated: false };
  }
}

export async function verifySession(): Promise<boolean> {
  try {
    const res = await apiClient.post<{ valid: boolean }>(
      "/api/auth/session/verify",
    );
    return res.valid;
  } catch {
    return false;
  }
}

export async function destroySession(token?: string): Promise<void> {
  const headers: Record<string, string> = {};
  if (token) {
    headers["Cookie"] = `session_token=${token}`;
  }
  return apiClient.post("/api/auth/session/clear", {}, { headers });
}

export const checkAuthSession = async (): Promise<{
  authenticated: boolean;
  user?: UserData;
}> => {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return { authenticated: false };
    }

    const response = await apiClient.get<{
      authenticated: boolean;
      user?: UserData;
    }>("/api/auth/me", {
      headers: {
        Cookie: `session_token=${sessionToken}`,
      },
    });
    if (response.user) {
      response.user = normalizeUserData(response.user);
    }
    return response;
  } catch (error) {
    try {
      const response = await apiClient.get<{
        authenticated: boolean;
        user?: UserData;
      }>("/api/auth/me");
      if (response.user) {
        response.user = normalizeUserData(response.user);
      }
      return response;
    } catch (e) {
      return { authenticated: false };
    }
  }
};

export const getUserProfile = async (): Promise<UserData | undefined> => {
  try {
    const headers = await getAuthHeaders();
    const user = await apiClient.get<UserData>(`/api/user/profile`, {
      headers,
    });
    return normalizeUserData(user);
  } catch (error) {
    console.error(`Failed to fetch user profile: `, error);
    return undefined;
  }
};

export const getUserByRole = async (
  role: string,
): Promise<UserData | undefined> => {
  const users = await fetchUsers();
  return users.find((u) => u.role === role);
};

export const updateUser = async (
  id: string,
  data: Partial<UserData>,
): Promise<UserData> => {
  return apiClient.put<UserData>(`/api/user/update?id=${id}`, data);
};

export const uploadProfilePhoto = async (
  file: File,
  email: string,
): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);

  const headers = await getAuthHeaders();

  return apiClient.post<{ url: string }>("/api/user/photo", formData, {
    headers,
  });
};

export const deleteProfilePhoto = async (): Promise<{
  status: string;
  message: string;
}> => {
  return apiClient.delete<{ status: string; message: string }>(
    "/api/user/photo",
  );
};

const handleServerAuthError = async (error: any) => {
  if (error?.response?.status === 401) {
    if (typeof window === "undefined") {
      const { redirect } = await import("next/navigation");
      redirect("/session-expired");
    }
  }
  throw error;
};

export const getTrainings = async (): Promise<Training[]> => {
  const headers = await getAuthHeaders();
  return apiClient
    .get<Training[]>(`/api/training`, { headers })
    .catch(handleServerAuthError);
};

export const addTraining = async (
  data: Omit<Training, "id" | "user_id" | "created_at">,
): Promise<{ data: { id: number } }> => {
  return apiClient
    .post<{ data: { id: number } }>("/api/training", { data })
    .catch(handleServerAuthError);
};

export const updateTraining = async (
  id: string,
  data: Omit<Training, "id" | "user_id" | "created_at">,
): Promise<void> => {
  return apiClient
    .put<void>("/api/training", { id: Number(id), data })
    .catch(handleServerAuthError);
};

export const deleteTraining = async (id: string): Promise<void> => {
  return apiClient
    .delete<void>(`/api/training?id=${id}`)
    .catch(handleServerAuthError);
};

type JabatanApiItem = {
  id: number;
  userId: number;
  positionName: string;
  positionDetail?: string | null;
  isActive: boolean;
};

type JabatanPayload = {
  userId: number;
  name: string;
  description: string;
  is_active: boolean;
};

const mapJabatanResponse = (item: JabatanApiItem): Jabatan => ({
  id: item.id,
  name: item.positionName,
  description: item.positionDetail || "",
  is_active: item.isActive,
});

export const getJabatan = async (userId: number): Promise<Jabatan[]> => {
  const headers = await getAuthHeaders();
  const data = await apiClient
    .get<JabatanApiItem[]>(`/api/jabatan?userId=${userId}`, { headers })
    .catch(handleServerAuthError);
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map(mapJabatanResponse);
};

export const addJabatan = async (payload: JabatanPayload): Promise<void> => {
  const data = {
    userId: payload.userId,
    positionName: payload.name,
    positionDetail: payload.description,
    isActive: payload.is_active,
  };
  return apiClient
    .post<void>("/api/jabatan", data)
    .catch(handleServerAuthError);
};

export const updateJabatan = async (
  id: number,
  payload: JabatanPayload,
): Promise<void> => {
  const data = {
    userId: payload.userId,
    positionName: payload.name,
    positionDetail: payload.description,
    isActive: payload.is_active,
  };
  return apiClient
    .put<void>(`/api/jabatan?id=${id}`, data)
    .catch(handleServerAuthError);
};

export const deleteJabatan = async (id: number): Promise<void> => {
  return apiClient
    .delete<void>(`/api/jabatan?id=${id}`)
    .catch(handleServerAuthError);
};

export const submitYoutubePlaylist = async (
  playlistUrl: string,
): Promise<{ status: string; playlist_id: string }> => {
  return apiClient
    .post<{
      status: string;
      playlist_id: string;
    }>("/api/youtube/submit", { playlist_url: playlistUrl })
    .catch(handleServerAuthError);
};

export const getYoutubePlaylist =
  async (): Promise<YoutubePlaylistResponse | null> => {
    const headers = await getAuthHeaders();
    try {
      return await apiClient.get<YoutubePlaylistResponse>(
        `/api/youtube/playlist`,
        { headers },
      );
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      return handleServerAuthError(error);
    }
  };

import { ModulAjar, EvaluasiModulAjar } from "@/features/auth/types/types";

export const syncModulAjar = async (): Promise<unknown> => {
  return apiClient
    .post<unknown>(`/api/drive/sync-modul-ajar`, {})
    .catch(handleServerAuthError);
};

export const getModulAjar = async (
  academicTermId?: number,
): Promise<ModulAjar[]> => {
  const headers = await getAuthHeaders();
  let url = `/api/drive/modul-ajar`;
  if (academicTermId) {
    url += `?academic_term_id=${academicTermId}`;
  }
  return apiClient
    .get<ModulAjar[]>(url, { headers })
    .catch(handleServerAuthError);
};

export const syncEvaluasiModulAjar = async (): Promise<unknown> => {
  return apiClient
    .post<unknown>(`/api/drive/sync-evaluasi-modul-ajar`, {})
    .catch(handleServerAuthError);
};

export const getEvaluasiModulAjar = async (
  academicTermId?: number,
): Promise<EvaluasiModulAjar[]> => {
  const headers = await getAuthHeaders();
  let url = `/api/drive/evaluasi-modul-ajar`;
  if (academicTermId) {
    url += `?academic_term_id=${academicTermId}`;
  }
  return apiClient
    .get<EvaluasiModulAjar[]>(url, { headers })
    .catch(handleServerAuthError);
};

import { Presensi, MutabaahRecord } from "../types/types";

export const syncPresensi = async () => {
  return apiClient
    .post<void>(`/api/presensi/sync`, {})
    .catch(handleServerAuthError);
};

export const getPresensi = async (): Promise<Presensi[]> => {
  const headers = await getAuthHeaders();
  return apiClient
    .get<Presensi[]>(`/api/presensi`, { headers })
    .catch(handleServerAuthError);
};

export const syncMutabaah = async () => {
  return apiClient
    .post<void>(`/api/mutabaah/sync`, {})
    .catch(handleServerAuthError);
};

export const getMutabaah = async (): Promise<MutabaahRecord[]> => {
  const headers = await getAuthHeaders();
  return apiClient
    .get<MutabaahRecord[]>(`/api/mutabaah`, { headers })
    .catch(handleServerAuthError);
};

import { JurnalRecord } from "../types/types";

export const syncJurnal = async () => {
  return apiClient
    .post<void>(`/api/jurnal/sync`, {})
    .catch(handleServerAuthError);
};

export const getJurnal = async (): Promise<JurnalRecord[]> => {
  const headers = await getAuthHeaders();
  return apiClient
    .get<JurnalRecord[]>(`/api/jurnal`, { headers })
    .catch(handleServerAuthError);
};

import { AcademicTerm } from "@/features/auth/types/types";

export const getActiveAcademicTerm = async (): Promise<AcademicTerm | null> => {
  try {
    return await apiClient.get<AcademicTerm>("/api/academic/term/active");
  } catch (error: any) {
    if (error?.response?.status === 401) {
    }
    console.error("Failed to fetch active academic term:", error);
    return null;
  }
};

export const getAllAcademicTerms = async (): Promise<AcademicTerm[]> => {
  try {
    return await apiClient.get<AcademicTerm[]>("/api/academic/terms");
  } catch (error: any) {
    console.error("Failed to fetch all academic terms:", error);
    return [];
  }
};

export const updateModulHybrid = async (
  id: number,
  mode: string,
  videoId: string = "",
): Promise<void> => {
  return apiClient
    .put<void>(`/api/drive/modul-ajar/hybrid?id=${id}`, {
      mode,
      video_id: videoId,
    })
    .catch(handleServerAuthError);
};

export const fetchSubjects = async (): Promise<Subject[]> => {
  const headers = await getAuthHeaders();
  return apiClient
    .get<Subject[]>("/api/academic/subjects", { headers })
    .catch(handleServerAuthError);
};

export const fetchClasses = async (): Promise<Class[]> => {
  const headers = await getAuthHeaders();
  return apiClient
    .get<Class[]>("/api/academic/classes", { headers })
    .catch(handleServerAuthError);
};

export const syncTargetedModulAjar = async (
  payload: TargetedSyncPayload,
): Promise<void> => {
  return apiClient
    .post<void>("/api/drive/sync-modul-ajar/targeted", payload)
    .catch(handleServerAuthError);
};

export const syncTargetedModulAjarBulk = async (
  payloads: TargetedSyncPayload[],
): Promise<void> => {
  return apiClient
    .post<void>("/api/drive/sync-modul-ajar/bulk", { requests: payloads })
    .catch(handleServerAuthError);
};

export const updateModulAjar = async (
  payload: UpdateModulAjarPayload,
): Promise<void> => {
  return apiClient
    .put<void>("/api/drive/modul-ajar", payload)
    .catch(handleServerAuthError);
};

export const syncTargetedEvaluasi = async (
  payload: TargetedSyncPayload,
): Promise<void> => {
  return apiClient
    .post<void>("/api/drive/sync-evaluasi-modul-ajar/targeted", payload)
    .catch(handleServerAuthError);
};

export const syncTargetedEvaluasiBulk = async (
  payloads: TargetedSyncPayload[],
): Promise<void> => {
  return apiClient
    .post<void>("/api/drive/sync-evaluasi-modul-ajar/bulk", {
      requests: payloads,
    })
    .catch(handleServerAuthError);
};

export const updateEvaluasi = async (
  payload: UpdateModulAjarPayload,
): Promise<void> => {
  return apiClient
    .put<void>("/api/drive/evaluasi-modul-ajar", payload)
    .catch(handleServerAuthError);
};

export const updateModulAjarStatus = async (
  id: number,
  status: string,
): Promise<void> => {
  return apiClient
    .put<void>(`/api/drive/modul-ajar/status?id=${id}`, { status })
    .catch(handleServerAuthError);
};

export const updateEvaluasiModulAjarStatus = async (
  id: number,
  status: string,
): Promise<void> => {
  return apiClient
    .put<void>(`/api/drive/evaluasi-modul-ajar/status?id=${id}`, { status })
    .catch(handleServerAuthError);
};

import { TeacherImplementation } from "@/features/auth/types/types";

export const createTeacherImplementation = async (
  payload: Partial<TeacherImplementation>,
): Promise<void> => {
  return apiClient
    .post<void>("/api/teacher-implementation", payload)
    .catch(handleServerAuthError);
};

export const getTeacherImplementations = async (
  academicTermId?: number,
): Promise<TeacherImplementation[]> => {
  const headers = await getAuthHeaders();
  let url = "/api/teacher-implementation";
  if (academicTermId) {
    url += `?academic_term_id=${academicTermId}`;
  }
  return apiClient
    .get<TeacherImplementation[]>(url, { headers })
    .catch(handleServerAuthError);
};

export const deleteModulAjar = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`/api/drive/modul-ajar?id=${id}`);
    return true;
  } catch (error) {
    console.error("Failed to delete modul ajar", error);
    return false;
  }
};

export const deleteEvaluasiModulAjar = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`/api/drive/evaluasi-modul-ajar?id=${id}`);
    return true;
  } catch (error) {
    console.error("Failed to delete evaluasi modul ajar", error);
    return false;
  }
};

export const updateTeacherImplementation = async (
  payload: Partial<TeacherImplementation>,
): Promise<void> => {
  return apiClient
    .put<void>("/api/teacher-implementation", payload)
    .catch(handleServerAuthError);
};

export const deleteTeacherImplementation = async (
  id: number,
): Promise<boolean> => {
  try {
    await apiClient.delete(`/api/teacher-implementation?id=${id}`);
    return true;
  } catch (error) {
    console.error("Failed to delete teacher implementation", error);
    return false;
  }
};

import {
  HybridProgressPayload,
  HybridProgressResponse,
} from "@/features/auth/types/types";

export const setHybridTarget = async (
  payload: HybridProgressPayload,
): Promise<void> => {
  return apiClient
    .post<void>("/api/hybrid-target", payload)
    .catch(handleServerAuthError);
};

export const getHybridProgress = async (
  subjectId: number,
  classId: number,
  semester: string,
  tahun: string,
): Promise<HybridProgressResponse | null> => {
  const headers = await getAuthHeaders();
  try {
    return await apiClient.get<HybridProgressResponse>(
      `/api/hybrid-progress?subject_id=${subjectId}&class_id=${classId}&semester=${semester}&tahun=${tahun}`,
      { headers },
    );
  } catch (error) {
    console.error("Failed to fetch hybrid progress", error);
    return null;
  }
};

export const getHybridProgressAll = async (
  semester: string,
  tahun: string,
): Promise<any[] | null> => {
  const headers = await getAuthHeaders();
  try {
    return await apiClient.get<any[]>(
      `/api/hybrid-progress/all?semester=${semester}&tahun=${tahun}`,
      { headers },
    );
  } catch (error) {
    console.error("Failed to fetch all hybrid progress", error);
    return null;
  }
};

export const deleteHybridTarget = async (
  subjectId: number,
  classId: number,
  semester: string,
  tahun: string,
): Promise<boolean> => {
  try {
    await apiClient.delete(
      `/api/hybrid-target?subject_id=${subjectId}&class_id=${classId}&semester=${semester}&tahun=${tahun}`,
    );
    return true;
  } catch (error) {
    console.error("Failed to delete hybrid target", error);
    return false;
  }
};

import { TeachingAssignment } from "@/features/auth/types/types";

export const getTeachingAssignments = async (
  academicTermId: number,
): Promise<TeachingAssignment[]> => {
  const headers = await getAuthHeaders();
  return apiClient
    .get<
      TeachingAssignment[]
    >(`/api/teaching-assignments?academic_term_id=${academicTermId}`, { headers })
    .catch((e) => {
      console.error("Failed to fetch teaching assignments:", e);
      return [];
    });
};

export const createTeachingAssignment = async (payload: {
  subject_id: number;
  class_id: number;
  unit: string;
  academic_term_id: number;
  web_content_link?: string | null;
  external_link?: string | null;
  youtube_link?: string | null;
  drive_file_id?: string | null;
  file_name?: string | null;
}): Promise<void> => {
  const headers = await getAuthHeaders();
  return apiClient
    .post<void>("/api/teaching-assignments", payload, { headers })
    .catch(handleServerAuthError);
};

export const updateTeachingAssignment = async (
  id: number,
  payload: {
    subject_id: number;
    class_id: number;
    unit: string;
    academic_term_id: number;
    web_content_link?: string | null;
    external_link?: string | null;
    youtube_link?: string | null;
    drive_file_id?: string | null;
    file_name?: string | null;
  },
): Promise<void> => {
  const headers = await getAuthHeaders();
  return apiClient
    .put<void>(`/api/teaching-assignments/${id}`, payload, { headers })
    .catch(handleServerAuthError);
};

export const deleteTeachingAssignment = async (id: number): Promise<void> => {
  const headers = await getAuthHeaders();
  return apiClient
    .delete<void>(`/api/teaching-assignments/${id}`, { headers })
    .catch(handleServerAuthError);
};

export const updateTeachingAssignmentLinks = async (
  id: number,
  webContentLink: string | null,
  externalLink: string | null,
  youtubeLink: string | null,
  classroomLink: string | null,
): Promise<{ status: string; message: string }> => {
  const payload = {
    web_content_link: webContentLink,
    external_link: externalLink,
    youtube_link: youtubeLink,
    classroom_link: classroomLink,
  };
  return apiClient
    .put<{
      status: string;
      message: string;
    }>(`/api/teaching-assignments/${id}/links`, payload)
    .catch(handleServerAuthError);
};

export const upsertClassroomLink = async (
  payload: ClassRoomLinkPayload,
): Promise<{ status: string; message: string }> => {
  return apiClient
    .post<{
      status: string;
      message: string;
    }>(`/api/assignment-links/classroom`, payload)
    .catch(handleServerAuthError);
};

export const getClassroomLinks = async (): Promise<
  TeachingAssignmentClassroom[]
> => {
  return apiClient
    .get<TeachingAssignmentClassroom[]>(`/api/assignment-links/classroom`)
    .catch(handleServerAuthError);
};

export const upsertExternalLink = async (
  payload: DashboardEksternalPayload,
): Promise<{ status: string; message: string }> => {
  return apiClient
    .post<{
      status: string;
      message: string;
    }>(`/api/assignment-links/external`, payload)
    .catch(handleServerAuthError);
};

export const getExternalLinks = async (): Promise<
  TeachingAssignmentExternal[]
> => {
  return apiClient
    .get<TeachingAssignmentExternal[]>(`/api/assignment-links/external`)
    .catch(handleServerAuthError);
};

export const deleteClassroomLink = async (
  id: number,
): Promise<{ status: string; message: string }> => {
  return apiClient
    .delete<{
      status: string;
      message: string;
    }>(`/api/assignment-links/classroom/${id}`)
    .catch(handleServerAuthError);
};

export const deleteExternalLink = async (
  id: number,
): Promise<{ status: string; message: string }> => {
  return apiClient
    .delete<{
      status: string;
      message: string;
    }>(`/api/assignment-links/external/${id}`)
    .catch(handleServerAuthError);
};

export const getStudentDashboardData = async (): Promise<{
  class: Class | null;
  subjects: Subject[];
  term: AcademicTerm;
}> => {
  return apiClient
    .get<{
      class: Class | null;
      subjects: Subject[];
      term: AcademicTerm;
    }>(`/api/student/dashboard`)
    .catch(handleServerAuthError);
};

export const getStudentSubjectLinks = async (
  subjectId: number,
): Promise<{ classroom_link: string; external_link: string }> => {
  return apiClient
    .get<{
      classroom_link: string;
      external_link: string;
    }>(`/api/student/subject-links/${subjectId}`)
    .catch(handleServerAuthError);
};

import { StudentMutabaahRecord } from "@/features/auth/types/types";

export const getStudentPresensiData = async (
  month?: string,
): Promise<StudentPresensi[]> => {
  const headers = await getAuthHeaders();
  const url = month
    ? `/api/student/presensi?month=${month}`
    : `/api/student/presensi`;
  return apiClient
    .get<StudentPresensi[]>(url, { headers })
    .catch(handleServerAuthError);
};

export const getStudentMutabaahData = async (
  month?: string,
): Promise<StudentMutabaahRecord[]> => {
  const headers = await getAuthHeaders();
  const url = month
    ? `/api/student/mutabaah?month=${month}`
    : `/api/student/mutabaah`;
  return apiClient
    .get<StudentMutabaahRecord[]>(url, { headers })
    .catch(handleServerAuthError);
};

export const getTeacherStudents = async (
  startDate?: string,
  endDate?: string,
): Promise<any[]> => {
  const headers = await getAuthHeaders();
  let url = `/api/teacher/students`;
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  return apiClient.get<any[]>(url, { headers }).catch((e) => {
    console.error("Failed to fetch teacher students:", e);
    return [];
  });
};

export const getTeacherStudentDetail = async (
  id: number | string,
  month?: string,
): Promise<any | null> => {
  const headers = await getAuthHeaders();
  let url = `/api/teacher/student/detail?id=${id}`;
  if (month) url += `&month=${month}`;
  return apiClient.get<any>(url, { headers }).catch((e) => {
    console.error("Failed to fetch student detail:", e);
    return null;
  });
};

export const getLiveMonitoring = async (unitParam?: string): Promise<any> => {
  const headers = await getAuthHeaders();
  let url = "/api/dashboard/live-monitoring";
  if (unitParam && unitParam.toLowerCase() !== "all") {
    url += `?unit=${unitParam}`;
  }
  return apiClient
    .get<any>(url, {
      headers: {
        ...headers,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      cache: "no-store",
    })
    .catch((e) => {
      console.error("Failed to fetch live monitoring:", e);
      throw e;
    });
};

export const getStreamHistory = async (
  limit?: number,
  unitParam?: string,
): Promise<any> => {
  const headers = await getAuthHeaders();
  let url = "/api/dashboard/stream-history";
  const params = new URLSearchParams();

  if (typeof limit === "number") {
    params.set("limit", String(limit));
  }

  if (unitParam && unitParam.toLowerCase() !== "all") {
    params.set("unit", unitParam);
  }

  const query = params.toString();
  if (query) {
    url += `?${query}`;
  }

  return apiClient
    .get<any>(url, {
      headers: {
        ...headers,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      cache: "no-store",
    })
    .catch((e) => {
      console.error("Failed to fetch stream history:", e);
      throw e;
    });
};
