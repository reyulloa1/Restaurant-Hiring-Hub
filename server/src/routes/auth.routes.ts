import { Router } from "express";
import { z } from "zod";
import { supabaseAuth } from "../config/supabase.js";
import { fail, ok } from "../utils/api-response.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return fail(res, 400, "Invalid login payload.", parsed.error.flatten());
  }

  const { email, password } = parsed.data;
  const { data, error } = await supabaseAuth.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    return fail(res, 401, "Invalid admin credentials.");
  }

  return ok(res, {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_at: data.session.expires_at,
    user: data.user
  });
});
