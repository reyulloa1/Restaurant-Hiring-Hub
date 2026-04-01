import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { HiringRole } from '../types';

export function PublicRolesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['roles', 'public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as HiringRole[];
    },
  });

  if (isLoading) return <p>Loading roles...</p>;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Current openings</h1>
      {data?.map((role) => (
        <article key={role.id} className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">{role.title}</h2>
          <p className="text-sm text-slate-600">{role.location ?? 'Location flexible'}</p>
          <Link className="mt-3 inline-block text-sm font-medium text-blue-700" to={`/roles/${role.slug}/apply`}>
            Start application →
          </Link>
        </article>
      ))}
    </section>
  );
}
