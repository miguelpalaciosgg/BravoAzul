import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useActivities = () => {
  const activities = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getActivities = async (userId: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase
        .from('actividades')
        .select('*')
        .eq('usuario_id', userId)
        .order('fecha', { ascending: false })

      if (fetchError) throw fetchError

      activities.value = data || []
      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error obteniendo actividades:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const addActivity = async (activity: any) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: insertError } = await supabase
        .from('actividades')
        .insert([activity])
        .select()

      if (insertError) throw insertError

      if (data) {
        activities.value.unshift(data[0])
      }

      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error agregando actividad:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateActivity = async (id: string, updates: any) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: updateError } = await supabase
        .from('actividades')
        .update(updates)
        .eq('id', id)
        .select()

      if (updateError) throw updateError

      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error actualizando actividad:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteActivity = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const { error: deleteError } = await supabase
        .from('actividades')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      activities.value = activities.value.filter(a => a.id !== id)
    } catch (err: any) {
      error.value = err.message
      console.error('Error eliminando actividad:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    activities,
    loading,
    error,
    getActivities,
    addActivity,
    updateActivity,
    deleteActivity
  }
}
