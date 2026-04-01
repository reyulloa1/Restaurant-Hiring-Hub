# Restaurant Hiring Hub - Layers 1 to 4

## Structure
- `client/`: Public applicant UI + admin dashboard UI
- `server/`: Express API, Supabase integration, auth middleware, applicant routes + scoring engine
- `shared/`: Shared role config + applicant types + score bands
- `supabase/migrations/`: Database schema setup

## Public Routes
- `/` landing + role selection
- `/roles/:roleId` role details
- `/apply/:roleId` 5-step application flow
- `/success` post-submit confirmation

## Admin Routes
- `/admin/login` magic-link sign-in
- `/admin` applicant dashboard table
- `/admin/applicants/:id` applicant detail view
- `/admin/settings` settings placeholder

## Scoring
- Total score: 0-30
  - Objective: up to 20
  - Response: up to 8
  - Keyword bonus: up to 2
- Computed on applicant creation and can be recomputed on patch.

## Run
1. Copy `.env.example` to `.env`.
2. Apply SQL migration: `supabase/migrations/20260401_layer1_applicants.sql`.
3. Install deps: `npm install`.
4. Start: `npm run dev`.
