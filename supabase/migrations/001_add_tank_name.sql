-- Run this in Supabase SQL Editor if your tanks table was created before the name column existed.
alter table public.tanks add column if not exists name text;
drop policy if exists "tanks_update_any" on public.tanks;
create policy "tanks_update_any" on public.tanks for update using (true) with check (true);
