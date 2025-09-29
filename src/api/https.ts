import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';


function resolveBaseURL() {

  const extraUrl = (Constants.expoConfig?.extra as any)?.API_BASE_URL as string | undefined;
  if (extraUrl && !extraUrl.includes('localhost')) return extraUrl;


  const hostUri =
    (Constants.expoConfig as any)?.hostUri ??
    // compat: versiones anteriores
    (Constants as any).manifest?.debuggerHost ??
    (Constants as any).manifest2?.extra?.expoClient?.hostUri;

  if (hostUri) {
    const host = String(hostUri).split(':')[0];
    return `http://${host}:4000`;
  }

  // 3) Fallback final (iOS simulador)
  return 'http://localhost:4000';
}

export const http = axios.create({
  baseURL: resolveBaseURL(),
});

http.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (r) => r,
  async (error) => {
    if (error?.response?.status === 401) {
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('auth_user');
    }
    return Promise.reject(error);
  }
);
