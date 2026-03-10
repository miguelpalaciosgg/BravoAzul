import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

export const useAuth = () => {
  const user = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const isAdmin = computed(() => user.value?.user_metadata?.role === 'admin')

  const signUp = async (email: string, password: string, metadata: any = {}) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })

      if (signUpError) throw signUpError

      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error en signup:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

      user.value = data.user

      return data
    } catch (err: any) {
      error.value = err.message
      console.error('Error en signin:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    try {
      loading.value = true
      error.value = null

      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) throw signOutError

      user.value = null
    } catch (err: any) {
      error.value = err.message
      console.error('Error en signout:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getCurrentUser = async () => {
    try {
      const {
        data: { user: currentUser }
      } = await supabase.auth.getUser()

      user.value = currentUser

      return currentUser
    } catch (err: any) {
      console.error('Error obteniendo usuario actual:', err)
      return null
    }
  }

  // Listener para cambios de auth
  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      user.value = session.user
    } else {
      user.value = null
    }
  })

  return {
    user,
    loading,
    error,
    isAdmin,
    signUp,
    signIn,
    signOut,
    getCurrentUser
  }
}
