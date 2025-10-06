-- Create the profiles table if it doesn't exist
create table if not exists public.profiles (
  id uuid primary key,
  email text not null,
  height_cm numeric,
  weight_kg numeric,
  bmi numeric,
  bmi_label text,
  updated_at timestamptz default now()
);

-- Enable Row-Level Security (RLS)
alter table public.profiles enable row level security;

-- Remove old policies if they exist
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_upsert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;

-- Allow users to select their own profile
create policy "profiles_select_own"
on public.profiles for select to authenticated
using (id = auth.uid());

-- Allow users to insert their own profile
create policy "profiles_upsert_own"
on public.profiles for insert to authenticated
with check (id = auth.uid());

-- Allow users to update only their own profile
create policy "profiles_update_own"
on public.profiles for update to authenticated
using (id = auth.uid())
with check (id = auth.uid());
