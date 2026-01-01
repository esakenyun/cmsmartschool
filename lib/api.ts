import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Default configuration for Axios
const API_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add logic here to retrieve token from storage
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes here (e.g., 401 Unauthorized)
    return Promise.reject(error);
  }
);

// Unified API function
export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.get<T>(url, config).then((res) => res.data);
  },
  post: <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosInstance.post<T>(url, data, config).then((res) => res.data);
  },
  put: <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosInstance.put<T>(url, data, config).then((res) => res.data);
  },
  patch: <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosInstance.patch<T>(url, data, config).then((res) => res.data);
  },
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.delete<T>(url, config).then((res) => res.data);
  },
};
