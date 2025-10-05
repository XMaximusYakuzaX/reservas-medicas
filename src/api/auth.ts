// src/api/auth.ts
import * as SecureStore from 'expo-secure-store';
import http from './http';

export async function login(credentials: { email: string; password: string }) {
  try {
    const { data } = await http.post('/auth/login', credentials);

    if (data?.token) {
      // 👇 clave esperada por el test
      await SecureStore.setItemAsync('token', data.token);
    }
    if (data?.user) {
      // 👇 clave esperada por el test
      await SecureStore.setItemAsync('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error: any) {
    throw error?.response?.data || { message: 'Login failed' };
  }
}

export const getProfile = async () => {
  try {
    const { data } = await http.get('/profile');
    return data;
  } catch (error: any) {
    throw error?.response?.data || { message: 'Failed to fetch profile' };
  }
};

export async function logout() {
  await SecureStore.deleteItemAsync('token');
  await SecureStore.deleteItemAsync('user');
}

export default { login, getProfile, logout };
