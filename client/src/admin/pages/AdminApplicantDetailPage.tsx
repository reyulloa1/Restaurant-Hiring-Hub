import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Applicant } from '@rh/shared';
import { fetchApplicantById } from '../../api/admin';
import { ApplicantDetailPanel } from '../components/ApplicantDetailPanel';
import { useAdminSession } from '../hooks/useAdminSession';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';

export function AdminApplicantDetailPage() {
  const { id } = useParams();
  const { session } = useAdminSession();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = session?.access_token;
    if (!token || !id) return;

    fetchApplicantById(token, id)
      .then((data) => {
        setApplicant(data);
        setError('');
      })
      .catch(() => setError('Unable to load applicant.'))
      .finally(() => setLoading(false));
  }, [id, session?.access_token]);

  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 py-6">
      <Link to="/admin" className="text-sm text-blue-600 underline">← Back to dashboard</Link>
      {loading ? <LoadingState label="Loading applicant..." /> : error ? <EmptyState message={error} /> : applicant && session ? (
        <ApplicantDetailPanel applicant={applicant} token={session.access_token} />
      ) : null}
    </div>
  );
}
