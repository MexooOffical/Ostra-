import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lwoxpzsididlebrmesvy.supabase.co';
// Using the provided Public API Key
const supabaseKey = 'sb_publishable_OyELaUVRf4CMZD_XykhGtA_xFUeal_e';

export const supabase = createClient(supabaseUrl, supabaseKey);
