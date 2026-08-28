-- BJ's Tattoo Studio — booking enquiries
-- Run in the Supabase SQL editor before switching the form out of demo mode.

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  preferred_artist text,
  tattoo_style text,
  approx_size text,
  placement text,
  budget text,
  preferred_date text,
  contact_method text,
  idea text not null,
  additional_info text,
  source text default 'website',
  status text default 'new'
);

create index if not exists enquiries_created_at_idx on enquiries (created_at desc);
create index if not exists enquiries_status_idx on enquiries (status);

alter table enquiries enable row level security;

-- Inserts arrive from the server using the service role key, which bypasses
-- RLS. No public policy is created on purpose: enquiries are not readable
-- from the browser.
