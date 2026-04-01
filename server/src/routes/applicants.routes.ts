import { Router } from "express";
import multer from "multer";
import {
  applicantCreateSchema,
  applicantUpdateSchema,
  type ApplicantCreateInput,
  type ApplicantUpdateInput
} from "@rh/shared";
import { supabaseAdmin } from "../config/supabase.js";
import { requireAdminAuth } from "../middleware/auth.middleware.js";
import { computeApplicantScore } from "../services/scoring.js";
import { uploadResume } from "../services/storage.service.js";
import { fail, ok } from "../utils/api-response.js";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

function parseJsonField<T>(value: string | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export const applicantsRouter = Router();

applicantsRouter.post("/", upload.single("resume"), async (req, res) => {
  const payload = {
    ...req.body,
    screening_answers: parseJsonField(req.body.screening_answers, {}),
    culture_answers: parseJsonField(req.body.culture_answers, {})
  };

  const parsed = applicantCreateSchema.safeParse(payload);
  if (!parsed.success) {
    return fail(res, 400, "Invalid applicant payload.", parsed.error.flatten());
  }

  const applicantInput: ApplicantCreateInput = parsed.data;

  let resumeUrl: string | null = null;
  if (req.file) {
    try {
      resumeUrl = await uploadResume(req.file);
    } catch (error) {
      return fail(res, 500, "Resume upload failed.", error instanceof Error ? error.message : error);
    }
  }

  const score = computeApplicantScore(applicantInput);

  const { data, error } = await supabaseAdmin
    .from("applicants")
    .insert({ ...applicantInput, resume_url: resumeUrl, score, status: "new" })
    .select("*")
    .single();

  if (error) {
    return fail(res, 500, "Failed to create applicant.", error.message);
  }

  return ok(res, data, 201);
});

applicantsRouter.get("/", requireAdminAuth, async (req, res) => {
  const { role, status, experience, availability } = req.query;

  let query = supabaseAdmin.from("applicants").select("*").order("created_at", { ascending: false });

  if (role) query = query.eq("role", String(role));
  if (status) query = query.eq("status", String(status));
  if (experience) query = query.gte("experience_years", Number(experience));
  if (availability === "true") query = query.eq("can_work_40_60", true);

  const { data, error } = await query;

  if (error) {
    return fail(res, 500, "Failed to fetch applicants.", error.message);
  }

  return ok(res, data);
});

applicantsRouter.get("/:id", requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin.from("applicants").select("*").eq("id", id).single();

  if (error) {
    return fail(res, 404, "Applicant not found.");
  }

  return ok(res, data);
});

applicantsRouter.patch("/:id", requireAdminAuth, async (req, res) => {
  const parsed = applicantUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return fail(res, 400, "Invalid update payload.", parsed.error.flatten());
  }

  const updates: ApplicantUpdateInput = parsed.data;

  const { data, error } = await supabaseAdmin
    .from("applicants")
    .update(updates)
    .eq("id", req.params.id)
    .select("*")
    .single();

  if (error) {
    return fail(res, 500, "Failed to update applicant.", error.message);
  }

  return ok(res, data);
});
