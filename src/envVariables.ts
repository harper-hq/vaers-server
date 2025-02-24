require("dotenv").config();

const { env } = process;


export const supabaseUrl = env.SUPABASE_URL;
export const supabaseServiceRole = env.SUPABASE_SERVICE_ROLE;
export const supabaseProjectId = env.SUPABASE_PROJECT_ID;
export const supabaseConnectionUri = env.SUPABASE_CONNECTION_URI;
export const supabaseDbPassword = env.SUPABASE_DB_PASSWORD;



