import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import type { MarcasCNP, CrearMarcaCNP } from '@/../env'

export const useRegistroMarcas = () => {
  const marcasRef = ref<MarcasCNP[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed desenvuelve automáticamente el ref para TypeScript
  const marcas = computed(() => marcasRef.value)

  const getMarcas = async (usuarioId: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase
        .from('marcas_cnp')
        .select('*')
        .eq('usuario_id', usuarioId)
        .order('fecha', { ascending: false })

      if (fetchError) throw fetchError

      marcasRef.value = data || []
      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error obteniendo marcas:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const agregarMarca = async (marca: CrearMarcaCNP) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: insertError } = await supabase
        .from('marcas_cnp')
        .insert([marca])
        .select()

      if (insertError) throw insertError

      if (data) {
        marcasRef.value.unshift(data[0])
      }

      return data?.[0]
    } catch (err: any) {
      error.value = err.message
      console.error('Error agregando marca:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizarMarca = async (id: string, updates: Partial<MarcasCNP>) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: updateError } = await supabase
        .from('marcas_cnp')
        .update(updates)
        .eq('id', id)
        .select()

      if (updateError) throw updateError

      if (data) {
        const index = marcasRef.value.findIndex(m => m.id === id)
        if (index !== -1) {
          marcasRef.value[index] = data[0]
        }
      }

      return data?.[0]
    } catch (err: any) {
      error.value = err.message
      console.error('Error actualizando marca:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminarMarca = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const { error: deleteError } = await supabase
        .from('marcas_cnp')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      marcasRef.value = marcasRef.value.filter(m => m.id !== id)
    } catch (err: any) {
      error.value = err.message
      console.error('Error eliminando marca:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    marcas,
    loading,
    error,
    getMarcas,
    agregarMarca,
    actualizarMarca,
    eliminarMarca
  }
}
