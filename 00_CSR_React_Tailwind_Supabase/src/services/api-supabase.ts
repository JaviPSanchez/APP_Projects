import { createClient } from '@supabase/supabase-js';

const supabaseUrlKey = import.meta.env.VITE_API_URL;

export const supabaseUrl = `https://${supabaseUrlKey}.supabase.co`;

const supabaseKey = import.meta.env.VITE_API_KEY_SUPABASE;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
