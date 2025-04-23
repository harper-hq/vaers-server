import { createClient } from '@supabase/supabase-js';
import { Database } from './supabaseTypes';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../envVariables';

export const supabase = createClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);