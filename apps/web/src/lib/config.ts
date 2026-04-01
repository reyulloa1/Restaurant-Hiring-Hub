export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
};

export const ensureConfig = () => {
  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new Error(`Missing env var: ${key}`);
    }
  }
};
