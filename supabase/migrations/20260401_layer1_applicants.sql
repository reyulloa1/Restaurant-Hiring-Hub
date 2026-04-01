create extension if not exists pgcrypto;

create table if not exists applicants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  role text not null,
  experience_years numeric not null,
  work_history text not null,
  resume_url text,
  can_work_40_60 boolean not null,
  start_date text not null,
  nights_weekends boolean not null,
  interview_time_1 text,
  interview_time_2 text,
  interview_time_3 text,
  screening_answers jsonb not null default '{}'::jsonb,
  culture_answers jsonb not null default '{}'::jsonb,
  score numeric,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table applicants enable row level security;

create policy "admin read applicants" on applicants
for select to authenticated
using (true);

create policy "admin update applicants" on applicants
for update to authenticated
using (true)
with check (true);

create policy "public insert applicants" on applicants
for insert to anon, authenticated
with check (true);

insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;
