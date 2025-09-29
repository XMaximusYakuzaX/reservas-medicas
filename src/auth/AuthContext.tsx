import * as SecureStore from 'expo-secure-store';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { http } from '../api/http'; // 👈 usa el axios con autodetección de IP

type User = { id: number; name: string; email: string };

type AuthContextType = {
  token: string | null;
  user: User | null;
  isChecking: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const t = await SecureStore.getItemAsync('auth_token');
      const u = await SecureStore.getItemAsync('auth_user');
      if (t) setToken(t);
      if (u) setUser(JSON.parse(u));
      setIsChecking(false);
    })();
  }, []);

  // 🔐 Login usando el backend (POST /auth/login)
  const login = async (email: string, password: string) => {
    const { data } = await http.post('/auth/login', { email, password });
    const { token, user } = data as { token: string; user: User };
    setToken(token);
    setUser(user);
    await SecureStore.setItemAsync('auth_token', token);
    await SecureStore.setItemAsync('auth_user', JSON.stringify(user));
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await SecureStore.deleteItemAsync('auth_token');
    await SecureStore.deleteItemAsync('auth_user');
  };

  const value = useMemo(
    () => ({ token, user, isChecking, login, logout }),
    [token, user, isChecking]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
