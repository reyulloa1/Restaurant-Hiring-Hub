export type StepId = 1 | 2 | 3 | 4 | 5;

export type ApplicationFormState = {
  role: string;
  name: string;
  phone: string;
  email: string;
  experience_years: string;
  most_recent_employer: string;
  work_history: string;
  resumeFile: File | null;
  can_work_40_60: string;
  start_date: string;
  nights_weekends: string;
  interview_time_1: string;
  interview_time_2: string;
  interview_time_3: string;
  screening_answers: Record<string, string>;
  culture_answers: Record<string, string>;
};

export const initialFormState: ApplicationFormState = {
  role: '',
  name: '',
  phone: '',
  email: '',
  experience_years: '',
  most_recent_employer: '',
  work_history: '',
  resumeFile: null,
  can_work_40_60: '',
  start_date: '',
  nights_weekends: '',
  interview_time_1: '',
  interview_time_2: '',
  interview_time_3: '',
  screening_answers: {},
  culture_answers: {},
};
