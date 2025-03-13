import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "Supabase URL";
const supabaseKey = "Supabase Key";

const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase