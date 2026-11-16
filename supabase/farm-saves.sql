-- Farm progress, one row per player (spec 4.5). Run once in the Supabase SQL editor.
-- A player opens the farm with an email and the code it receives; their farm is one row here.
-- Dashboard setup, step by step: docs/supabase-farm-setup.md.
create table if not exists public.farm_saves (
  user_id uuid primary key references auth.users (id) on delete cascade,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.farm_saves enable row level security;

-- players read and write only their own row
create policy "own farm: read" on public.farm_saves for select to authenticated using (auth.uid() = user_id);
create policy "own farm: insert" on public.farm_saves for insert to authenticated with check (auth.uid() = user_id);
create policy "own farm: update" on public.farm_saves for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- a save is a small JSON document; refuse anything far larger than a real farm
alter table public.farm_saves add constraint farm_saves_size check (pg_column_size(state) < 16384);
