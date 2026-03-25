-- LifeList Database Schema
-- Run this in Supabase Dashboard > SQL Editor

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'display_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Items (the bucket list entries)
create table public.items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  category text not null default 'other',
  status text not null default 'want_to_try'
    check (status in ('want_to_try', 'planned', 'booked', 'done')),
  notes text,
  url text,
  image_url text,
  location_name text,
  latitude numeric,
  longitude numeric,
  completed_at timestamptz,
  rating smallint check (rating between 1 and 5),
  memory_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_items_updated
  before update on public.items
  for each row execute function public.handle_updated_at();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.items enable row level security;

-- Profiles: users can only read/update their own
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Items: full CRUD for own items only
create policy "Users can view own items"
  on public.items for select using (auth.uid() = user_id);

create policy "Users can insert own items"
  on public.items for insert with check (auth.uid() = user_id);

create policy "Users can update own items"
  on public.items for update using (auth.uid() = user_id);

create policy "Users can delete own items"
  on public.items for delete using (auth.uid() = user_id);
