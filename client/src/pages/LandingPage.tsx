import { RoleCard } from '../components/RoleCard';
import { getRoles } from '../config/roles';

export function LandingPage() {
  const roles = getRoles();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8 text-center sm:mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Now Hiring – Join Our Team</h1>
        <p className="mt-3 text-base text-slate-600">Full-time positions available (40–60 hrs/week). Apply in under 2 minutes.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => <RoleCard key={role.id} role={role} />)}
      </section>
    </div>
  );
}
