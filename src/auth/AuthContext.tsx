// src/auth/AuthContext.tsx
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useEffect, useMemo, useState } from 'react';
// 👇 ¡Importamos nuestra función de API limpia!
import { loginApi } from '../api/auth';

type User = { id: number; name: string; email: string };

type AuthContextType = {
  token: string | null;
  user: User | null;
  isChecking: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  isChecking: true,
  login: async () => {},
  logout: async () => {},
});

// Nombres de las claves para evitar errores de tipeo
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      const storedUser = await SecureStore.getItemAsync(USER_KEY);

      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));

      setIsChecking(false);
    })();
  }, []);

  // 🔐 Login ahora usa nuestra API limpia y centralizada
  const login = async (email: string, password: string) => {
    // 1. Llama a la API y obtiene los datos
    const { token, user } = await loginApi({ email, password });

    // 2. Actualiza el estado de la aplicación
    setToken(token);
    setUser(user);

    // 3. Guarda los datos de forma segura
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  };

  const value = useMemo(
    () => ({ token, user, isChecking, login, logout }),
    [token, user, isChecking]
  ); // <-- Sin punto y coma aquí

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
