import { Link } from 'react-router-dom';
import type { RoleConfig } from '@rh/shared';

export function RoleCard({ role }: { role: RoleConfig }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{role.department}</p>
      <h3 className="mt-1 text-xl font-semibold text-slate-900">{role.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{role.shortSummary}</p>
      <p className="mt-3 text-sm font-medium text-slate-900">{role.wageRange}</p>
      <div className="mt-4 flex gap-2">
        <Link to={`/roles/${role.id}`} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium">View details</Link>
        <Link to={`/apply/${role.id}`} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Apply</Link>
      </div>
    </article>
  );
}
