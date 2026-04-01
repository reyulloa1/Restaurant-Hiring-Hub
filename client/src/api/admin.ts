import type { Applicant } from '@rh/shared';
import { apiBaseUrl } from '../config/api';
import type { AdminFilters } from '../admin/utils/filters';

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function fetchApplicants(token: string, filters: AdminFilters) {
  const params = new URLSearchParams();
  if (filters.role) params.set('role', filters.role);
  if (filters.status) params.set('status', filters.status);
  if (filters.availability) params.set('availability', filters.availability);
  if (filters.experience) params.set('experience', filters.experience);

  const response = await fetch(`${apiBaseUrl}/api/applicants?${params.toString()}`, { headers: authHeaders(token) });
  if (!response.ok) throw new Error('Failed to fetch applicants');
  const payload = await response.json();
  return payload.data as Applicant[];
}

export async function fetchApplicantById(token: string, id: string) {
  const response = await fetch(`${apiBaseUrl}/api/applicants/${id}`, { headers: authHeaders(token) });
  if (!response.ok) throw new Error('Failed to fetch applicant details');
  const payload = await response.json();
  return payload.data as Applicant;
}

export async function updateApplicant(token: string, id: string, patch: { status?: string; score?: number | null; recompute_score?: boolean }) {
  const response = await fetch(`${apiBaseUrl}/api/applicants/${id}`, {
    method: 'PATCH',
    headers: {
      ...authHeaders(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patch),
  });

  if (!response.ok) throw new Error('Failed to update applicant');
  const payload = await response.json();
  return payload.data as Applicant;
}
