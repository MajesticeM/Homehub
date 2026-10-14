create table if not exists public.properties (
  id text primary key,
  title text not null,
  type text,
  description text,
  province text,
  city text,
  suburb text,
  street_address text,
  address_visibility text,
  monthly_rent numeric,
  deposit numeric,
  electricity numeric default 0,
  water numeric default 0,
  internet numeric default 0,
  parking numeric default 0,
  other_recurring numeric default 0,
  once_off_fees numeric default 0,
  bedrooms integer default 0,
  bathrooms integer default 1,
  furnished_status text,
  bathroom_type text,
  kitchen_type text,
  parking_spots integer default 0,
  pet_policy text,
  security_features jsonb default '[]'::jsonb,
  amenities jsonb default '[]'::jsonb,
  move_in_date text,
  min_lease_period text,
  cover_image text,
  images jsonb default '[]'::jsonb,
  move_in_timing text,
  occupancy_status text,
  viewing_availability text,
  status text default 'Published',
  views integer default 0,
  enquiries_count integer default 0,
  date_created text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.properties enable row level security;

create policy "Allow public read" on public.properties
for select
using (true);

create policy "Allow public insert" on public.properties
for insert
with check (true);

create policy "Allow public update" on public.properties
for update
using (true)
with check (true);

create policy "Allow public delete" on public.properties
for delete
using (true);
