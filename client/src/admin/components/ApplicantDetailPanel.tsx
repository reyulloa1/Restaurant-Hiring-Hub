import type { Applicant } from '@rh/shared';
import { useState } from 'react';
import { updateApplicant } from '../../api/admin';
import { ScoreBadge } from './ScoreBadge';
import { StatusBadge } from './StatusBadge';
import { statusOptions } from '../utils/status';

export function ApplicantDetailPanel({ applicant, token }: { applicant: Applicant; token: string }) {
  const [status, setStatus] = useState(applicant.status);
  const [score, setScore] = useState(applicant.score);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const screeningEntries = Object.entries((applicant.screening_answers ?? {}) as Record<string, unknown>);
  const cultureEntries = Object.entries((applicant.culture_answers ?? {}) as Record<string, unknown>);

  const saveStatus = async () => {
    try {
      setSaving(true);
      setMessage('');
      await updateApplicant(token, applicant.id, { status });
      setMessage('Status updated successfully.');
    } catch {
      setMessage('Failed to update status.');
    } finally {
      setSaving(false);
    }
  };

  const recomputeScore = async () => {
    try {
      setSaving(true);
      setMessage('');
      const updated = await updateApplicant(token, applicant.id, { recompute_score: true });
      setScore(updated.score);
      setMessage('Score recomputed.');
    } catch {
      setMessage('Failed to recompute score.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{applicant.name}</h1>
          <p className="text-sm text-slate-600">{applicant.role}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid gap-2 text-sm sm:grid-cols-2">
        <Info label="Email" value={applicant.email} />
        <Info label="Phone" value={applicant.phone} />
        <Info label="Experience" value={`${applicant.experience_years} years`} />
        <Info label="Start Date" value={applicant.start_date} />
        <Info label="Can Work 40-60" value={applicant.can_work_40_60 ? 'Yes' : 'No'} />
        <Info label="Nights/Weekends" value={applicant.nights_weekends ? 'Yes' : 'No'} />
        <Info label="Interview #1" value={applicant.interview_time_1 || '—'} />
        <Info label="Interview #2" value={applicant.interview_time_2 || '—'} />
        <Info label="Interview #3" value={applicant.interview_time_3 || '—'} />
      </div>

      <div>
        <p className="mb-1 text-sm font-semibold text-slate-800">Work History</p>
        <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700 whitespace-pre-wrap">{applicant.work_history}</p>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-slate-800">Score</p>
        <ScoreBadge score={score} />
      </div>

      {applicant.resume_url && <a href={applicant.resume_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">View Resume</a>}

      <AnswerGroup title="Screening Answers" entries={screeningEntries} />
      <AnswerGroup title="Culture-fit Answers" entries={cultureEntries} />

      <div className="space-y-3 rounded-lg border border-slate-200 p-4">
        <select className="field" value={status} onChange={(e) => setStatus(e.target.value as Applicant['status'])}>
          {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <div className="flex flex-wrap gap-2">
          <button onClick={saveStatus} disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {saving ? 'Saving...' : 'Save status'}
          </button>
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Send Email (Soon)</button>
          <button onClick={recomputeScore} className="rounded-lg border border-slate-300 px-4 py-2 text-sm" disabled={saving}>Recompute Score</button>
        </div>
        {message && <p className="text-sm text-slate-600">{message}</p>}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <p><span className="font-semibold text-slate-700">{label}:</span> <span className="text-slate-900">{value}</span></p>
  );
}

function AnswerGroup({ title, entries }: { title: string; entries: Array<[string, unknown]> }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold text-slate-800">{title}</h2>
      {entries.length === 0 ? <p className="text-sm text-slate-500">No answers provided.</p> : (
        <div className="space-y-2">
          {entries.map(([key, value]) => (
            <div key={key} className="rounded-lg bg-slate-50 p-3 text-sm">
              <p className="font-medium text-slate-700">{key}</p>
              <p className="text-slate-900">{String(value)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
