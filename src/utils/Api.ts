import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_ADMIN_API_URL as string;

console.log("baseURL", baseURL);
export const ADMIN_API = axios.create({
  baseURL: baseURL,
});

const unauthorizedRoute: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
  "/auth/verify-email/:email",
];
const authInterceptors = (config: InternalAxiosRequestConfig) => {
  if (unauthorizedRoute.includes(config.url as string)) {
    return config;
  }
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const errorInterceptors = async (error: any) => {
  return Promise.reject(error);
};

ADMIN_API.interceptors.request.use(authInterceptors, errorInterceptors);
