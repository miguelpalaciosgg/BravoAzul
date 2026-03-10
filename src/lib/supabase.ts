import { createClient } from '@supabase/supabase-js'

// IMPORTANTE: Reemplaza estos valores con los de tu proyecto Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no están configuradas. ' +
    'Por favor, crea un archivo .env.local con tus credenciales de Supabase.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
