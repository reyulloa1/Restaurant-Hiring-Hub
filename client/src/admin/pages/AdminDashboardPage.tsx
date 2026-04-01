import { useEffect, useMemo, useState } from 'react';
import type { Applicant } from '@rh/shared';
import { fetchApplicants, updateApplicant } from '../../api/admin';
import { useAdminSession } from '../hooks/useAdminSession';
import { ApplicantFilters } from '../components/ApplicantFilters';
import { ApplicantsTable } from '../components/ApplicantsTable';
import { DashboardHeader } from '../components/DashboardHeader';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { defaultFilters, type AdminFilters } from '../utils/filters';

export function AdminDashboardPage() {
  const { session } = useAdminSession();
  const [filters, setFilters] = useState<AdminFilters>(defaultFilters);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = session?.access_token;
    if (!token) return;

    setLoading(true);
    fetchApplicants(token, filters)
      .then((data) => {
        setApplicants(data);
        setError('');
      })
      .catch(() => setError('Failed to load applicants.'))
      .finally(() => setLoading(false));
  }, [session?.access_token, filters.role, filters.status, filters.experience, filters.availability]);

  const filtered = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    let result = applicants.filter((applicant) => {
      if (!search) return true;
      return applicant.name.toLowerCase().includes(search) || applicant.email.toLowerCase().includes(search);
    });

    if (filters.sort === 'highest_score') result = [...result].sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
    if (filters.sort === 'lowest_score') result = [...result].sort((a, b) => (a.score ?? 999) - (b.score ?? 999));
    if (filters.sort === 'oldest') result = [...result].sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
    if (filters.sort === 'newest') result = [...result].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

    return result;
  }, [applicants, filters.search, filters.sort]);

  const summary = {
    total: applicants.length,
    interview: applicants.filter((a) => a.status === 'interview').length,
    hired: applicants.filter((a) => a.status === 'hired').length,
    rejected: applicants.filter((a) => a.status === 'rejected').length,
  };

  const quickStatusUpdate = async (id: string, status: Applicant['status']) => {
    const token = session?.access_token;
    if (!token) return;

    const previous = applicants;
    setApplicants((curr) => curr.map((item) => item.id === id ? { ...item, status } : item));
    try {
      await updateApplicant(token, id, { status });
    } catch {
      setApplicants(previous);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
      <DashboardHeader {...summary} />
      <ApplicantFilters filters={filters} onChange={setFilters} applicants={applicants} />

      {loading ? <LoadingState label="Loading dashboard..." /> : error ? <EmptyState message={error} /> : (
        filtered.length === 0 ? <EmptyState message={applicants.length === 0 ? 'No applicants found yet.' : 'No results match your filters.'} /> : (
          <>
            <ApplicantsTable applicants={filtered} />
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-2 text-sm font-semibold text-slate-800">Quick status updates</p>
              <div className="grid gap-2 md:grid-cols-2">
                {filtered.slice(0, 6).map((applicant) => (
                  <div key={applicant.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                    <span>{applicant.name}</span>
                    <select className="rounded border border-slate-300 px-2 py-1" value={applicant.status} onChange={(e) => quickStatusUpdate(applicant.id, e.target.value as Applicant['status'])}>
                      <option value="new">Applied</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="interview">Interview Scheduled</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
