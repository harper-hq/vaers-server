require("dotenv").config();

const { env } = process;

export const SUPABASE_URL = env.SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY || '';
export const SUPABASE_SERVICE_ROLE = env.SUPABASE_SERVICE_ROLE;
export const SUPABASE_PROJECT_ID = env.SUPABASE_PROJECT_ID;
export const SUPABASE_CONNECTION_URI = env.SUPABASE_CONNECTION_URI;
export const SUPABASE_DB_PASSWORD = env.SUPABASE_DB_PASSWORD;
