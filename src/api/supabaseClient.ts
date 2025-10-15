// src/api/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

interface ExpoExtra {
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
}

interface ExpoConfig {
  extra?: ExpoExtra;
}

const extra = (Constants.expoConfig as ExpoConfig)?.extra;

const supabaseUrl = extra?.SUPABASE_URL || process.env.SUPABASE_URL!;
const supabaseAnonKey = extra?.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
