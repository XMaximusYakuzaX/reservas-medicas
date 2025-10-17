// src/api/auth.ts
import { http } from './http'; // 👈 Asegúrate que la importación de http sea correcta

// Definimos los tipos para que nuestro código sea más seguro
type User = { id: number; name: string; email: string };
type LoginResponse = { token: string; user: User };

/**
 * Llama al endpoint de login y devuelve el token y el usuario.
 * No guarda nada, solo devuelve los datos.
 */
export async function loginApi(credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    const { data } = await http.post<LoginResponse>('/auth/login', credentials);
    return data;
  } catch (error) {
    // Aquí puedes manejar errores de Axios si quieres, pero por ahora lo mantenemos simple
    console.error('Login API error:', error);
    throw new Error('Email o contraseña incorrectos.');
  }
}

/**
 * Llama al endpoint de perfil para obtener los datos del usuario.
 */
export async function getProfileApi(): Promise<User> {
  const { data } = await http.get<User>('/profile');
  return data;
}
