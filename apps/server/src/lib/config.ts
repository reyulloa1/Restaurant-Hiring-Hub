import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT ?? 4000),
  supabaseUrl: process.env.SUPABASE_URL ?? '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  appUrl: process.env.APP_URL ?? 'http://localhost:5173',
};

for (const [k, v] of Object.entries(config)) {
  if (!v) throw new Error(`Missing environment variable: ${k}`);
}
