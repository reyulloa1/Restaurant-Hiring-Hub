create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  title text not null,
  slug text unique not null,
  location text,
  employment_type text,
  description text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists screening_questions (
  id uuid primary key default gen_random_uuid(),
  role_id uuid not null references roles(id) on delete cascade,
  prompt text not null,
  response_type text not null check (response_type in ('short_text','long_text','number','boolean')),
  ideal_answer text,
  weight numeric not null default 1,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  role_id uuid not null references roles(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  resume_path text not null,
  score int,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists application_answers (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications(id) on delete cascade,
  question_id uuid not null references screening_questions(id) on delete cascade,
  answer text not null,
  created_at timestamptz not null default now()
);

alter table roles enable row level security;
alter table screening_questions enable row level security;
alter table applications enable row level security;
alter table application_answers enable row level security;

create policy "public can view published roles" on roles
for select to anon using (is_published = true);

create policy "public can view questions for published roles" on screening_questions
for select to anon
using (exists (select 1 from roles r where r.id = screening_questions.role_id and r.is_published = true));

create policy "admins full access roles" on roles
for all to authenticated using (true) with check (true);

create policy "admins full access questions" on screening_questions
for all to authenticated using (true) with check (true);

create policy "admins read applications" on applications
for select to authenticated using (true);

create policy "admins read answers" on application_answers
for select to authenticated using (true);

insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;
