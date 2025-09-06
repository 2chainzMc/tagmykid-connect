import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zqvdfrbajskayrtwaopo.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY  // use env for safety

export const supabase = createClient(supabaseUrl, supabaseKey)
