import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'xxx';
const supabaseKey = 'xxx';

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;