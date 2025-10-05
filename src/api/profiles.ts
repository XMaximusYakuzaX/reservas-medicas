// src/api/profiles.ts
import { supabase } from './supabaseClient';

export type UserProfile = {
  id?: number;
  email: string;
  height_cm: number;
  weight_kg: number;
  bmi: number;
  updated_at?: string;
};

export function computeBMI(height_cm: number, weight_kg: number) {
  const h = Number(height_cm) / 100;
  const w = Number(weight_kg);
  if (!h || !w) return { bmi: 0, category: 'N/A' };

  const bmi = Number((w / (h * h)).toFixed(2));
  let category = 'Normal';
  if (bmi < 18.5) category = 'Bajo peso';
  else if (bmi < 25) category = 'Normal';
  else if (bmi < 30) category = 'Sobrepeso';
  else category = 'Obesidad';

  return { bmi, category };
}

/** Obtiene el perfil por email (o null si no existe) */
export async function getProfileByEmail(email: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error) throw error;
  return data as UserProfile | null;
}

/** Crea o actualiza el perfil (upsert por email) */
export async function upsertProfile(input: {
  email: string;
  height_cm: number;
  weight_kg: number;
}) {
  const { bmi } = computeBMI(input.height_cm, input.weight_kg);

  const { data, error } = await supabase
    .from('user_profiles')
    .upsert(
      [
        {
          email: input.email,
          height_cm: input.height_cm,
          weight_kg: input.weight_kg,
          bmi,
          updated_at: new Date().toISOString(),
        },
      ],
      { onConflict: 'email' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as UserProfile;
}
