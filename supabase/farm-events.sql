-- Usage log for the farm: one row per thing a signed-in player does. Run once in the Supabase SQL editor.
-- Players can only add rows for themselves; nobody can read them from the site. Read them in the dashboard (queries below).
create table if not exists public.farm_events (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  event text not null check (char_length(event) <= 40),
  data jsonb not null default '{}'::jsonb check (pg_column_size(data) < 2048),
  at timestamptz not null default now()
);
create index if not exists farm_events_at on public.farm_events (at desc);

alter table public.farm_events enable row level security;
create policy "log own events" on public.farm_events for insert to authenticated with check (auth.uid() = user_id);

-- Events the game writes:
--   sign_in      {method: "code" | "link", first: true on the first visit}
--   farm_open    {width, height, touch}            every time a signed-in player opens the farm
--   job          {job: plant|water|harvest|well|feed|egg, season}
--   buy          {id, price}
--   view_island  {view: left|main|right}
--   sign_out     {}

-- Handy queries:
-- players and visits per day
--   select date_trunc('day', at) as day, count(distinct user_id) as players, count(*) filter (where event = 'farm_open') as opens
--   from farm_events group by 1 order by 1 desc;
-- new players per day
--   select date_trunc('day', at) as day, count(*) from farm_events where event = 'sign_in' and (data->>'first')::boolean group by 1 order by 1 desc;
-- what people do
--   select event, data->>'job' as job, count(*) from farm_events group by 1, 2 order by 3 desc;
-- most bought items
--   select data->>'id' as item, count(*) from farm_events where event = 'buy' group by 1 order by 2 desc;
-- each player's last visit, with email
--   select u.email, max(e.at) as last_seen, count(*) as events from farm_events e join auth.users u on u.id = e.user_id
--   group by 1 order by 2 desc;
