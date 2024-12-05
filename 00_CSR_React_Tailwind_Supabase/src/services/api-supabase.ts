import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://suhwxfapnihtjdetmffz.supabase.co';

const supabaseKey = import.meta.env.VITE_API_KEY_SUPABASE;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
