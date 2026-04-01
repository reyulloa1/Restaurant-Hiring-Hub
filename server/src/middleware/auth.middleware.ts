import type { NextFunction, Request, Response } from "express";
import { supabaseAdmin } from "../config/supabase.js";
import { fail } from "../utils/api-response.js";

declare module "express-serve-static-core" {
  interface Request {
    adminUserId?: string;
  }
}

export async function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return fail(res, 401, "Missing authorization token.");
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    return fail(res, 401, "Invalid or expired token.");
  }

  req.adminUserId = data.user.id;
  return next();
}
