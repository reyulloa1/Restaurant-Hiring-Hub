import { createClient } from '@supabase/supabase-js';
import { config, ensureConfig } from './config';

ensureConfig();

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
