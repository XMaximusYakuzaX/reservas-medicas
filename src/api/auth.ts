// src/api/auth.ts
import * as SecureStore from 'expo-secure-store';
import http from './http';
import type { AxiosError } from 'axios';

export async function login(credentials: { email: string; password: string }) {
  try {
    const { data } = await http.post('/auth/login', credentials);

    if (data?.token) {
      await SecureStore.setItemAsync('token', data.token);
    }
    if (data?.user) {
      await SecureStore.setItemAsync('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error.response?.data || { message: 'Login failed' };
    }
    throw { message: 'Login failed' };
  }
}

export const getProfile = async () => {
  try {
    const { data } = await http.get('/profile');
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
    throw { message: 'Failed to fetch profile' };
  }
};

export async function logout() {
  await SecureStore.deleteItemAsync('token');
  await SecureStore.deleteItemAsync('user');
}

// Helper para detectar errores de Axios
function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

export default { login, getProfile, logout };
