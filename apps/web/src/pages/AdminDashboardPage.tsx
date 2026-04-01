import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function AdminDashboardPage() {
  const { data: roles } = useQuery({
    queryKey: ['roles', 'admin'],
    queryFn: async () => {
      const { data, error } = await supabase.from('roles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: applications } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('id,first_name,last_name,email,score,status,created_at,roles(title)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold">Admin dashboard</h1>
        <p className="text-sm text-slate-600">Configure roles/questions in Supabase and review scored applications.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <h2 className="mb-2 text-lg font-semibold">Roles</h2>
          <ul className="space-y-2 text-sm">
            {roles?.map((role) => <li key={role.id}>{role.title} · {role.is_published ? 'Published' : 'Draft'}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h2 className="mb-2 text-lg font-semibold">Latest applicants</h2>
          <ul className="space-y-2 text-sm">
            {applications?.map((app) => (
              <li key={app.id}>{app.first_name} {app.last_name} · {(app as any).roles?.title ?? 'Role'} · score {app.score ?? 0}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
