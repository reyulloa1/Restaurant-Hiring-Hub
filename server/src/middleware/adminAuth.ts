import type { NextFunction, Request, Response } from 'express';
import { supabaseAnon } from '../config/supabase.js';

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const { data, error } = await supabaseAnon.auth.getUser(token);
  if (error || !data.user) {
    return res.status(401).json({ success: false, error: 'Invalid auth token' });
  }

  req.user = data.user;
  return next();
}
