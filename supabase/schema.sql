-- Fish Tank Friends: run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Creates tables + RLS so the app can create tanks, add members, and send bubbles.

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Tanks
create table if not exists public.tanks (
  id uuid primary key default gen_random_uuid(),
  name text,
  created_at timestamptz not null default now()
);
create index if not exists idx_tanks_created_at on public.tanks (created_at desc);
-- If table already exists without name, run: alter table public.tanks add column if not exists name text;

-- Members (one per tank + device)
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  tank_id uuid not null references public.tanks (id) on delete cascade,
  device_id uuid not null,
  created_at timestamptz not null default now(),
  display_name text,
  city text,
  timezone text not null,
  fish_type integer not null,
  last_seen_at timestamptz not null default now()
);
create unique index if not exists idx_members_tank_device_unique on public.members (tank_id, device_id);
create index if not exists idx_members_tank_id on public.members (tank_id);

-- Bubbles (ephemeral pings)
create table if not exists public.bubbles (
  id uuid primary key default gen_random_uuid(),
  tank_id uuid not null references public.tanks (id) on delete cascade,
  created_at timestamptz not null default now(),
  member_id uuid references public.members (id),
  device_id uuid
);
create index if not exists idx_bubbles_tank_id_created_at on public.bubbles (tank_id, created_at desc);

-- RLS
alter table public.tanks   enable row level security;
alter table public.members enable row level security;
alter table public.bubbles enable row level security;

create policy "tanks_select_all" on public.tanks for select using (true);
create policy "tanks_insert_any" on public.tanks for insert with check (true);
create policy "tanks_update_any" on public.tanks for update using (true) with check (true);

create policy "members_select_all" on public.members for select using (true);
create policy "members_insert_any" on public.members for insert with check (true);
create policy "members_update_any" on public.members for update using (true) with check (true);
-- For testing: allow delete so "Remove my fish" can clear membership and show Join sheet again
create policy "members_delete_any" on public.members for delete using (true);

create policy "bubbles_select_all" on public.bubbles for select using (true);
create policy "bubbles_insert_any" on public.bubbles for insert with check (true);

-- Enable realtime for bubbles so the bubble button shows new bubbles on all devices.
-- If this errors (e.g. "already in publication"), run in SQL Editor: drop from publication then add again, or ignore.
alter publication supabase_realtime add table public.bubbles;
