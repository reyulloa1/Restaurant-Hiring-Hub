import type { Applicant } from '@rh/shared';
import type { AdminFilters } from '../utils/filters';
import { statusOptions } from '../utils/status';

export function ApplicantFilters({
  filters,
  onChange,
  applicants,
}: {
  filters: AdminFilters;
  onChange: (next: AdminFilters) => void;
  applicants: Applicant[];
}) {
  const roleOptions = Array.from(new Set(applicants.map((a) => a.role))).sort();

  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 lg:grid-cols-6">
      <input className="field lg:col-span-2" placeholder="Search name or email" value={filters.search} onChange={(e) => onChange({ ...filters, search: e.target.value })} />
      <select className="field" value={filters.role} onChange={(e) => onChange({ ...filters, role: e.target.value })}>
        <option value="">All Roles</option>
        {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
      </select>
      <select className="field" value={filters.experience} onChange={(e) => onChange({ ...filters, experience: e.target.value })}>
        <option value="">Any Experience</option>
        <option value="1">1+ years</option>
        <option value="3">3+ years</option>
        <option value="5">5+ years</option>
      </select>
      <select className="field" value={filters.availability} onChange={(e) => onChange({ ...filters, availability: e.target.value })}>
        <option value="">Any Availability</option>
        <option value="true">Can work 40-60</option>
        <option value="false">Cannot work 40-60</option>
      </select>
      <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-2">
        <select className="field" value={filters.status} onChange={(e) => onChange({ ...filters, status: e.target.value })}>
          <option value="">All Statuses</option>
          {statusOptions.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
        </select>
        <select className="field" value={filters.sort} onChange={(e) => onChange({ ...filters, sort: e.target.value as AdminFilters['sort'] })}>
          <option value="highest_score">Highest Score</option>
          <option value="lowest_score">Lowest Score</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
}
