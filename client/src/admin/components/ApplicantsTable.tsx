import type { Applicant } from '@rh/shared';
import { Link } from 'react-router-dom';
import { ScoreBadge } from './ScoreBadge';
import { StatusBadge } from './StatusBadge';

export function ApplicantsTable({ applicants }: { applicants: Applicant[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Resume</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="border-t border-slate-100 hover:bg-blue-50/30">
                <td className="px-4 py-3 font-medium text-slate-900">
                  <Link to={`/admin/applicants/${applicant.id}`}>{applicant.name}</Link>
                  <p className="text-xs text-slate-500">{applicant.email}</p>
                </td>
                <td className="px-4 py-3">{applicant.role}</td>
                <td className="px-4 py-3">{applicant.experience_years}y</td>
                <td className="px-4 py-3">{applicant.can_work_40_60 ? '40-60 hrs' : 'Limited'}</td>
                <td className="px-4 py-3">
                  {applicant.resume_url ? (
                    <a href={applicant.resume_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3"><ScoreBadge score={applicant.score} /></td>
                <td className="px-4 py-3"><StatusBadge status={applicant.status} /></td>
                <td className="px-4 py-3">{new Date(applicant.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
