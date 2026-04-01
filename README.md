# Restaurant Hiring Hub - Layers 1 + 2

## Structure
- `client/`: Public applicant UI (landing, role details, apply flow, success page)
- `server/`: Express API, Supabase integration, auth middleware, applicant routes
- `shared/`: Shared role config + applicant types
- `supabase/migrations/`: Database schema setup

## Public Routes
- `/` landing + role selection
- `/roles/:roleId` role details
- `/apply/:roleId` 5-step application flow
- `/success` post-submit confirmation

## Run
1. Copy `.env.example` to `.env`.
2. Apply SQL migration: `supabase/migrations/20260401_layer1_applicants.sql`.
3. Install deps: `npm install`.
4. Start: `npm run dev`.
