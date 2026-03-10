/// <reference types="vite/client" />

// Tipos para Supabase - marcas_cnp
export interface MarcasCNP {
  id: string
  usuario_id: string
  fecha: string
  circuito_tiempo: number
  dominadas_repeticiones?: number | null
  suspension_tiempo?: number | null
  carrera_tiempo: number
  nota_estimada: number
  observaciones?: string | null
  created_at?: string
  updated_at?: string
}

export interface CrearMarcaCNP {
  usuario_id: string
  fecha: string
  circuito_tiempo: number
  dominadas_repeticiones?: number | null
  suspension_tiempo?: number | null
  carrera_tiempo: number
  nota_estimada: number
  observaciones?: string | null
}
