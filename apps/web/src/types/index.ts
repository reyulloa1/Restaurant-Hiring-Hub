export type HiringRole = {
  id: string;
  organization_id: string;
  title: string;
  slug: string;
  location: string | null;
  employment_type: string | null;
  is_published: boolean;
  created_at: string;
};

export type ScreeningQuestion = {
  id: string;
  role_id: string;
  prompt: string;
  response_type: 'short_text' | 'long_text' | 'number' | 'boolean';
  weight: number;
  ideal_answer: string | null;
  sort_order: number;
};

export type ApplicationPayload = {
  role_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  resume_path: string;
  answers: Array<{ question_id: string; value: string }>;
};
