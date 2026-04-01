export type ApplicantStatus = 'new' | 'reviewing' | 'interview' | 'rejected' | 'hired';

export type Applicant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  experience_years: number;
  work_history: string;
  resume_url: string | null;
  can_work_40_60: boolean;
  start_date: string;
  nights_weekends: boolean;
  interview_time_1: string | null;
  interview_time_2: string | null;
  interview_time_3: string | null;
  screening_answers: Record<string, unknown>;
  culture_answers: Record<string, unknown>;
  score: number | null;
  status: ApplicantStatus;
  created_at: string;
};

export type CreateApplicantInput = Omit<Applicant, 'id' | 'created_at' | 'score' | 'resume_url'> & {
  resume_url?: string | null;
  score?: number | null;
};
