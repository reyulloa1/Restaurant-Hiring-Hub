import { Router } from 'express';
import multer from 'multer';
import { supabaseAdmin } from '../config/supabase.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { createApplicantSchema, updateApplicantSchema } from '../db/validation.js';
import { computeApplicantScore } from '../services/scoring.js';

const upload = multer({ storage: multer.memoryStorage() });

export const applicantsRouter = Router();

function normalizeNightsForDb(value: boolean | 'all' | 'partial' | 'none') {
  if (typeof value === 'boolean') return value;
  return value === 'all' || value === 'partial';
}

applicantsRouter.post('/', upload.single('resume'), async (req, res) => {
  const parsed = createApplicantSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: parsed.error.flatten() });
  }

  const payload = parsed.data;
  let resumeUrl: string | null = null;

  if (req.file) {
    const path = `${Date.now()}-${req.file.originalname}`;
    const uploadResult = await supabaseAdmin.storage
      .from('resumes')
      .upload(path, req.file.buffer, { contentType: req.file.mimetype, upsert: false });

    if (uploadResult.error) {
      return res.status(500).json({ success: false, error: uploadResult.error.message });
    }

    const signed = await supabaseAdmin.storage.from('resumes').createSignedUrl(path, 60 * 60 * 24 * 30);
    resumeUrl = signed.data?.signedUrl ?? null;
  }

  const score = computeApplicantScore({ ...payload, resume_url: resumeUrl });

  const dbPayload = {
    ...payload,
    nights_weekends: normalizeNightsForDb(payload.nights_weekends),
    resume_url: resumeUrl,
    score,
    status: 'new',
  };

  const { data, error } = await supabaseAdmin
    .from('applicants')
    .insert(dbPayload)
    .select('*')
    .single();

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

  return res.status(201).json({ success: true, data });
});

applicantsRouter.get('/', requireAdmin, async (req, res) => {
  let query = supabaseAdmin.from('applicants').select('*').order('created_at', { ascending: false });

  const { role, status, experience, availability } = req.query;
  if (typeof role === 'string') query = query.eq('role', role);
  if (typeof status === 'string') query = query.eq('status', status);
  if (typeof experience === 'string') query = query.gte('experience_years', Number(experience));
  if (typeof availability === 'string') query = query.eq('can_work_40_60', availability === 'true');

  const { data, error } = await query;
  if (error) return res.status(500).json({ success: false, error: error.message });

  return res.json({ success: true, data });
});

applicantsRouter.get('/:id', requireAdmin, async (req, res) => {
  const { data, error } = await supabaseAdmin.from('applicants').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ success: false, error: 'Applicant not found' });

  return res.json({ success: true, data });
});

applicantsRouter.patch('/:id', requireAdmin, async (req, res) => {
  const parsed = updateApplicantSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: parsed.error.flatten() });
  }

  const { recompute_score, ...updates } = parsed.data;

  if (recompute_score) {
    const { data: existing, error: existingError } = await supabaseAdmin
      .from('applicants')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (existingError || !existing) return res.status(404).json({ success: false, error: 'Applicant not found' });

    updates.score = computeApplicantScore(existing);
  }

  const { data, error } = await supabaseAdmin
    .from('applicants')
    .update(updates)
    .eq('id', req.params.id)
    .select('*')
    .single();

  if (error) return res.status(500).json({ success: false, error: error.message });

  return res.json({ success: true, data });
});
