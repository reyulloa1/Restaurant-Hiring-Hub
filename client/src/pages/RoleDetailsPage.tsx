import { Link, Navigate, useParams } from 'react-router-dom';
import { getRoleById } from '../config/roles';

export function RoleDetailsPage() {
  const { roleId } = useParams();
  const role = getRoleById(roleId);

  if (!role) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{role.department}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{role.title}</h1>
        <p className="mt-2 text-sm text-slate-600">Carle Place, NY · Full-time · {role.wageRange}</p>
        <p className="mt-5 text-slate-700">{role.description}</p>

        <Section title="Responsibilities" items={role.responsibilities} />
        <Section title="Requirements" items={role.requirements} />
        <Section title="Expectations" items={role.expectations} />

        <Link to={`/apply/${role.id}`} className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white">
          Apply Now
        </Link>
      </article>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}
