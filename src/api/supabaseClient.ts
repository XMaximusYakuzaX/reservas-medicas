// src/api/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl =
  (Constants.expoConfig?.extra as any)?.SUPABASE_URL ||
  process.env.SUPABASE_URL!;
const supabaseAnonKey =
  (Constants.expoConfig?.extra as any)?.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
