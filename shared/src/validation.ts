import { z } from "zod";

export const applicantCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  role: z.string().min(1),
  experience_years: z.coerce.number().int().min(0),
  work_history: z.string().min(1),
  can_work_40_60: z.coerce.boolean(),
  start_date: z.string().min(1),
  nights_weekends: z.coerce.boolean(),
  interview_time_1: z.string().nullable().optional(),
  interview_time_2: z.string().nullable().optional(),
  interview_time_3: z.string().nullable().optional(),
  screening_answers: z.record(z.unknown()),
  culture_answers: z.record(z.unknown())
});

export const applicantUpdateSchema = z.object({
  status: z.enum(["new", "reviewing", "interviewing", "hired", "rejected"]).optional(),
  score: z.coerce.number().min(0).max(100).optional()
}).refine((data) => data.status !== undefined || data.score !== undefined, {
  message: "At least one field (status or score) must be provided."
});

export type ApplicantCreateInput = z.infer<typeof applicantCreateSchema>;
export type ApplicantUpdateInput = z.infer<typeof applicantUpdateSchema>;
