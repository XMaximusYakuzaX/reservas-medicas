// src/api/http.ts
import axios, { AxiosHeaders, AxiosInstance } from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

function resolveBaseURL(): string {
  const extraUrl = (Constants.expoConfig?.extra as any)?.API_BASE_URL as string | undefined;
  if (extraUrl && !extraUrl.includes('localhost')) return extraUrl;

  const hostUri =
    (Constants.expoConfig as any)?.hostUri ??
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

http.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');

  if (token) {
    if (!config.headers) config.headers = new AxiosHeaders();
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else {
      (config.headers as Record<string, any>).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
    }
    return Promise.reject(error);
  }
);

export default http;
