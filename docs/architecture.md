# Restaurant Hiring Hub MVP Architecture

## Routes

### Web
- `/` public list of published roles.
- `/roles/:slug/apply` applicant form with dynamic questions from database.
- `/admin/login` magic-link login.
- `/admin` protected dashboard for role/application visibility.

### API
- `GET /health` runtime probe.
- `POST /applications` validates payload, computes score, stores application + answers.

## Component structure
- `Layout` global shell.
- `ProtectedRoute` auth gate.
- Pages: `PublicRolesPage`, `ApplyPage`, `AdminLoginPage`, `AdminDashboardPage`.
- Service helpers: `lib/supabase`, `lib/api`, `hooks/useAuth`.

## Data model (Supabase Postgres)
- `organizations` owning entity.
- `roles` dynamic openings (no hardcoded roles).
- `screening_questions` dynamic per-role questions (no hardcoded questions).
- `applications` candidate profile + computed score.
- `application_answers` question responses.

## Scoring logic
- Pull question `weight` and `ideal_answer` from DB.
- Score each answer by match heuristic and compute weighted normalized score 0-100.
- Persist score on application for admin triage.

## Deployment readiness
- Monorepo workspace scripts for build/typecheck.
- Environment contract in `.env.example`.
- SQL migration and RLS policies in `supabase/migrations`.
- Email template service stubs for transactional providers.
