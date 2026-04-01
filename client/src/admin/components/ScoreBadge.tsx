import { getScoreBand } from '@rh/shared';

const styleMap: Record<string, string> = {
  'Top Priority': 'bg-emerald-100 text-emerald-700',
  'Strong Candidate': 'bg-blue-100 text-blue-700',
  'Review Soon': 'bg-amber-100 text-amber-700',
  'Backup Pool': 'bg-purple-100 text-purple-700',
  'Low Priority': 'bg-rose-100 text-rose-700',
};

export function ScoreBadge({ score }: { score: number | null }) {
  const band = getScoreBand(score);
  return (
    <div className="space-y-1">
      <p className="text-sm font-semibold text-slate-900">{score ?? '—'}</p>
      <span className={`rounded-full px-2 py-1 text-xs ${styleMap[band]}`}>{band}</span>
    </div>
  );
}
