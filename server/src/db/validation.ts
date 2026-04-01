import { z } from 'zod';

const jsonRecordSchema = z.preprocess((value) => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}, z.record(z.unknown()));

export const createApplicantSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  role: z.string().min(1),
  experience_years: z.coerce.number().min(0),
  work_history: z.string().min(1),
  can_work_40_60: z.coerce.boolean(),
  start_date: z.string().min(1),
  nights_weekends: z.coerce.boolean(),
  interview_time_1: z.string().nullable().optional(),
  interview_time_2: z.string().nullable().optional(),
  interview_time_3: z.string().nullable().optional(),
  screening_answers: jsonRecordSchema,
  culture_answers: jsonRecordSchema,
});

export const updateApplicantSchema = z.object({
  status: z.enum(['new', 'reviewing', 'interview', 'rejected', 'hired']).optional(),
  score: z.number().min(0).max(100).nullable().optional(),
}).refine((value) => value.status !== undefined || value.score !== undefined, {
  message: 'At least one of status or score must be provided.',
});
