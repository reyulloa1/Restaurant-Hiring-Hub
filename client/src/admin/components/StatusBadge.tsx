import { statusLabel } from '../utils/status';

export function StatusBadge({ status }: { status: string }) {
  const color = {
    new: 'bg-blue-100 text-blue-700',
    reviewing: 'bg-amber-100 text-amber-700',
    interview: 'bg-purple-100 text-purple-700',
    hired: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-rose-100 text-rose-700',
  }[status] ?? 'bg-slate-100 text-slate-700';

  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${color}`}>{statusLabel(status)}</span>;
}
