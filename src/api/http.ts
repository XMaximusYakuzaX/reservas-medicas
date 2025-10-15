// src/api/http.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

interface ExpoExtra {
  API_BASE_URL?: string;
}

interface ExpoConfig {
  extra?: ExpoExtra;
  hostUri?: string;
}

function resolveBaseURL(): string {
  const extraUrl = (Constants.expoConfig as ExpoConfig)?.extra?.API_BASE_URL;
  if (extraUrl && !extraUrl.includes('localhost')) return extraUrl;

  const hostUri =
    (Constants.expoConfig as ExpoConfig)?.hostUri ??
    (Constants as any).manifest?.debuggerHost ??
    (Constants as any).manifest2?.extra?.expoClient?.hostUri;

  if (hostUri) {
    const host = String(hostUri).split(':')[0];
    return `http://${host}:4000`;
  }

  return 'http://localhost:4000';
}

export const http: AxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
});

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
    }
    return Promise.reject(error);
  }
);

// Type guard para errores de Axios
function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

export default http;