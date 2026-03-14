// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// Substitua pelos seus dados REAIS do painel do Supabase
const supabaseUrl = 'https://tmbvjvaqjvrfklmbnqud.supabase.co';
const supabaseKey = 'sb_publishable_uliH4cLPLVGP8TF26U_i1Q_Fko7jWzq';

export const supabase = createClient(supabaseUrl, supabaseKey);