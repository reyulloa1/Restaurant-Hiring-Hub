create extension if not exists "pgcrypto";

create table if not exists public.applicants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  role text not null,
  experience_years integer not null default 0,
  work_history text not null,
  resume_url text,
  can_work_40_60 boolean not null,
  start_date date not null,
  nights_weekends boolean not null,
  interview_time_1 timestamptz,
  interview_time_2 timestamptz,
  interview_time_3 timestamptz,
  screening_answers jsonb not null default '{}'::jsonb,
  culture_answers jsonb not null default '{}'::jsonb,
  score numeric,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists applicants_role_idx on public.applicants(role);
create index if not exists applicants_status_idx on public.applicants(status);
create index if not exists applicants_experience_idx on public.applicants(experience_years);
create index if not exists applicants_created_at_idx on public.applicants(created_at desc);
