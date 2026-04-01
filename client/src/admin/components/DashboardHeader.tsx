import { supabase } from '../../lib/supabase';
import { SummaryCard } from './SummaryCard';

export function DashboardHeader({
  total,
  interview,
  hired,
  rejected,
}: {
  total: number;
  interview: number;
  hired: number;
  rejected: number;
}) {
  return (
    <header className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Applicant Dashboard</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium"
        >
          Logout
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total Applicants" value={total} />
        <SummaryCard label="Interview Scheduled" value={interview} />
        <SummaryCard label="Hired" value={hired} />
        <SummaryCard label="Rejected" value={rejected} />
      </div>
    </header>
  );
}
