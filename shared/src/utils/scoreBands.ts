export type ScoreBand = 'Top Priority' | 'Strong Candidate' | 'Review Soon' | 'Backup Pool' | 'Low Priority';

export function getScoreBand(score: number | null | undefined): ScoreBand {
  const value = score ?? 0;
  if (value >= 26) return 'Top Priority';
  if (value >= 21) return 'Strong Candidate';
  if (value >= 16) return 'Review Soon';
  if (value >= 10) return 'Backup Pool';
  return 'Low Priority';
}
