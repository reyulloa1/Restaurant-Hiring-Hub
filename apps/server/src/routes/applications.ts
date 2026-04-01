import { Router } from 'express';
import { z } from 'zod';
import { supabaseAdmin } from '../lib/supabaseAdmin.js';
import { calculateScore } from '../services/scoring.js';

const applicationSchema = z.object({
  role_id: z.string().uuid(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  resume_path: z.string().min(1),
  answers: z.array(z.object({ question_id: z.string().uuid(), value: z.string() })),
});

export const applicationsRouter = Router();

applicationsRouter.post('/', async (req, res) => {
  const parsed = applicationSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const payload = parsed.data;

  const { data: questions, error: questionErr } = await supabaseAdmin
    .from('screening_questions')
    .select('id,weight,ideal_answer')
    .eq('role_id', payload.role_id);

  if (questionErr) return res.status(500).json({ error: questionErr.message });

  const merged = payload.answers.map((a) => {
    const matched = questions.find((q) => q.id === a.question_id);
    return { answer: a.value, weight: matched?.weight ?? 1, idealAnswer: matched?.ideal_answer ?? null };
  });

  const score = calculateScore(merged);

  const { data: app, error: appError } = await supabaseAdmin
    .from('applications')
    .insert({
      role_id: payload.role_id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      resume_path: payload.resume_path,
      score,
      status: 'new',
    })
    .select('id')
    .single();

  if (appError) return res.status(500).json({ error: appError.message });

  const records = payload.answers.map((a) => ({ application_id: app.id, question_id: a.question_id, answer: a.value }));
  const { error: answerError } = await supabaseAdmin.from('application_answers').insert(records);
  if (answerError) return res.status(500).json({ error: answerError.message });

  return res.status(201).json({ application_id: app.id, score });
});
