# Restaurant Hiring Hub (MVP)

Tech stack: React + TypeScript + Tailwind + Node/Express + Supabase.

## Quick start

1. Copy `.env.example` to `.env` and fill Supabase/API keys.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run migration in Supabase SQL editor: `supabase/migrations/20260401_init.sql`.
4. Run locally:
   ```bash
   npm run dev
   ```

## Phase mapping

1. **App scaffold**: monorepo workspaces with web/server apps.
2. **Supabase auth/database/storage**: auth magic-link, schema migration, resumes bucket.
3. **Public applicant flow**: dynamic roles + apply page + resume upload + API submit.
4. **Admin dashboard**: protected route and application visibility.
5. **Scoring logic**: weighted score service in API.
6. **Email templates**: provider-agnostic HTML templates in server service.
7. **Deployment readiness**: build scripts, env contract, health endpoint, docs.
