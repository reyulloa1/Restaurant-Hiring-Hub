import type { Applicant } from '@rh/shared';
import { roleKeywordGroups } from '../config/keywords.js';

type ScoringApplicant = Pick<Applicant,
  | 'role'
  | 'can_work_40_60'
  | 'start_date'
  | 'nights_weekends'
  | 'experience_years'
  | 'resume_url'
  | 'screening_answers'
  | 'culture_answers'>;

function normalizeText(value: unknown): string {
  return String(value ?? '').trim().toLowerCase();
}

function scoreObjective(applicant: ScoringApplicant): number {
  let score = 0;

  score += applicant.can_work_40_60 ? 5 : 0;

  const start = normalizeText(applicant.start_date);
  if (start.includes('immediate')) score += 4;
  else if (start.includes('1_week') || start.includes('1 week') || start.includes('one week')) score += 3;
  else if (start.includes('2_weeks') || start.includes('2 week') || start.includes('two week')) score += 2;

  const nights = normalizeText(applicant.nights_weekends);
  if (nights === 'true' || nights.includes('all')) score += 4;
  else if (nights.includes('partial')) score += 2;

  const years = Number(applicant.experience_years ?? 0);
  if (years < 1) score += 1;
  else if (years < 3) score += 3;
  else if (years < 5) score += 5;
  else score += 6;

  score += applicant.resume_url ? 1 : 0;
  return Math.min(20, score);
}

export function scoreScreeningResponses(applicant: ScoringApplicant): number {
  const responses = [
    ...Object.values((applicant.screening_answers ?? {}) as Record<string, unknown>),
    ...Object.values((applicant.culture_answers ?? {}) as Record<string, unknown>),
  ].map(normalizeText).filter(Boolean);

  if (!responses.length) return 0;

  const joined = responses.join(' ');
  let score = 0;

  const communicationSignals = ['communicate', 'tell', 'inform', 'update', 'listen'];
  const awarenessSignals = ['safety', 'quality', 'standard', 'guest', 'clean'];
  const standardsSignals = ['refire', 'remake', 'correct', 'check', 'follow'];
  const teamworkSignals = ['team', 'manager', 'chef', 'expo', 'support'];

  const buckets = [communicationSignals, awarenessSignals, standardsSignals, teamworkSignals];
  for (const bucket of buckets) {
    const hits = bucket.filter((term) => joined.includes(term)).length;
    if (hits >= 2) score += 2;
    else if (hits === 1) score += 1;
  }

  return Math.min(8, score);
}

function scoreKeywordBonus(applicant: ScoringApplicant): number {
  const groups = roleKeywordGroups[applicant.role] ?? {};
  const keyResponses = Object.values((applicant.screening_answers ?? {}) as Record<string, unknown>)
    .map(normalizeText)
    .filter(Boolean)
    .join(' ');

  if (!keyResponses) return 0;

  let matchedGroups = 0;
  for (const terms of Object.values(groups)) {
    if (terms.some((term) => keyResponses.includes(term))) {
      matchedGroups += 1;
    }
  }

  if (matchedGroups >= 3) return 2;
  if (matchedGroups >= 2) return 1;
  return 0;
}

export function computeApplicantScore(applicant: ScoringApplicant): number {
  const objective = scoreObjective(applicant);
  const response = scoreScreeningResponses(applicant);
  const keywordBonus = scoreKeywordBonus(applicant);

  return Math.min(30, objective + response + keywordBonus);
}
