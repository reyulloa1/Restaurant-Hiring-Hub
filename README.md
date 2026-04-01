# Restaurant Hiring Hub - Layer 1 Foundation

## Structure
- `client/`: React + TypeScript + Tailwind scaffold only.
- `server/`: Express API, Supabase integration, auth middleware, applicant routes.
- `shared/`: shared applicant types.
- `supabase/migrations/`: schema setup.

## Run
1. Copy `.env.example` to `.env`.
2. Apply SQL migration: `supabase/migrations/20260401_layer1_applicants.sql`.
3. Install deps: `npm install`.
4. Start: `npm run dev`.
