<template>
  <form @submit.prevent="enviarFormulario" class="bg-white rounded-lg shadow p-6 w-full max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Registrar Marcas CNP</h2>

    <!-- Error -->
    <div
      v-if="error"
      class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
    >
      {{ error }}
    </div>

    <!-- Fecha -->
    <div class="mb-6">
      <label class="block text-gray-700 font-semibold mb-2">
        Fecha <span class="text-red-500">*</span>
      </label>
      <input
        v-model="formulario.fecha"
        type="date"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Circuito de Agilidad -->
    <div class="mb-6">
      <label class="block text-gray-700 font-semibold mb-2">
        Circuito de Agilidad (segundos) <span class="text-red-500">*</span>
      </label>
      <input
        v-model.number="formulario.circuito_tiempo"
        type="number"
        step="0.1"
        min="0"
        required
        placeholder="ej: 45.5"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p class="text-sm text-gray-600 mt-1">Ingresa el tiempo total en segundos</p>
    </div>

    <!-- Input condicional para Fuerza (Dominadas o Suspensión) -->
    <div v-if="sexo" class="mb-6">
      <template v-if="sexo === 'M'">
        <label class="block text-gray-700 font-semibold mb-2">
          Dominadas (repeticiones) <span class="text-red-500">*</span>
        </label>
        <input
          v-model.number="formulario.dominadas_repeticiones"
          type="number"
          min="0"
          required
          placeholder="ej: 12"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p class="text-sm text-gray-600 mt-1">Número total de repeticiones completadas</p>
      </template>

      <template v-else-if="sexo === 'F'">
        <label class="block text-gray-700 font-semibold mb-2">
          Suspensión en Barra (segundos) <span class="text-red-500">*</span>
        </label>
        <input
          v-model.number="formulario.suspension_tiempo"
          type="number"
          step="0.1"
          min="0"
          required
          placeholder="ej: 75.5"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p class="text-sm text-gray-600 mt-1">Tiempo total en suspensión en segundos</p>
      </template>
    </div>

    <!-- Carrera de 1000m (Minutos y Segundos) -->
    <div class="mb-6">
      <label class="block text-gray-700 font-semibold mb-3">
        Carrera 1000m <span class="text-red-500">*</span>
      </label>
      <div class="flex gap-4">
        <div class="flex-1">
          <label class="block text-sm text-gray-600 mb-2">Minutos</label>
          <input
            v-model.number="minutos"
            type="number"
            min="0"
            max="59"
            required
            placeholder="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex-1">
          <label class="block text-sm text-gray-600 mb-2">Segundos</label>
          <input
            v-model.number="segundos"
            type="number"
            min="0"
            max="59"
            required
            placeholder="20"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <p class="text-sm text-gray-600 mt-2">
        Tiempo total: {{ tiempoCarreraFormato }}
      </p>
    </div>

    <!-- Observaciones -->
    <div class="mb-6">
      <label class="block text-gray-700 font-semibold mb-2">Observaciones</label>
      <textarea
        v-model="formulario.observaciones"
        rows="3"
        placeholder="Notas sobre el desempeño, condiciones, etc."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>

    <!-- Nota estimada (lectura) -->
    <div
      v-if="notaEstimada !== null"
      class="mb-6 p-4 bg-blue-50 border border-blue-300 rounded-lg"
    >
      <p class="text-gray-700">
        <span class="font-semibold">Nota estimada CNP:</span>
        <span class="text-2xl font-bold text-blue-600 ml-2">{{ notaEstimada }}/10</span>
      </p>
    </div>

    <!-- Botón de envío -->
    <div class="flex gap-4">
      <button
        type="submit"
        :disabled="loading"
        class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
      >
        <span v-if="!loading">Guardar Marca</span>
        <span v-else class="flex items-center justify-center">
          <span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
          Guardando...
        </span>
      </button>
      <button
        type="button"
        @click="resetearFormulario"
        class="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
      >
        Limpiar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRegistroMarcas } from '@/composables/useRegistroMarcas'
import { calcularNotaCNP } from '@/utils/calcularNotaCNP'
import type { CrearMarcaCNP } from '@/../env'

interface Props {
  sexo?: 'M' | 'F'
}

const props = defineProps<Props>()
const { user } = useAuth()
const { agregarMarca, loading, error: composableError } = useRegistroMarcas()

// Estado del formulario
const formulario = ref({
  fecha: '',
  circuito_tiempo: 0,
  dominadas_repeticiones: undefined as number | undefined,
  suspension_tiempo: undefined as number | undefined,
  carrera_tiempo: 0,
  observaciones: ''
})

const minutos = ref(0)
const segundos = ref(0)
const error = ref<string | null>(null)

// Rellenar fecha actual
onMounted(() => {
  const hoy = new Date().toISOString().split('T')[0] || ''
  formulario.value.fecha = hoy
})

// Watcher para establecer valor inicial de sexo si viene por props
onMounted(() => {
  if (!props.sexo) {
    console.warn('SimulacroCNPForm: edad/sexo del usuario debe ser obtenido de la BD')
  }
})

// Computed: Convertir minutos y segundos a segundos totales
const tiempoCarreraEnSegundos = computed((): number => {
  return minutos.value * 60 + segundos.value
})

// Computed: Mostrar tiempo en formato MM:SS
const tiempoCarreraFormato = computed((): string => {
  const min = String(minutos.value).padStart(2, '0')
  const seg = String(segundos.value).padStart(2, '0')
  return `${min}:${seg}`
})

// Computed: Calcular nota estimada
const notaEstimada = computed((): number | null => {
  if (
    !formulario.value.circuito_tiempo ||
    !tiempoCarreraEnSegundos.value ||
    !props.sexo
  ) {
    return null
  }

  if (
    props.sexo === 'M' &&
    (formulario.value.dominadas_repeticiones === undefined ||
      formulario.value.dominadas_repeticiones === null)
  ) {
    return null
  }

  if (
    props.sexo === 'F' &&
    (formulario.value.suspension_tiempo === undefined ||
      formulario.value.suspension_tiempo === null)
  ) {
    return null
  }

  try {
    return calcularNotaCNP(
      {
        circuito_tiempo: formulario.value.circuito_tiempo,
        dominadas_repeticiones: formulario.value.dominadas_repeticiones,
        suspension_tiempo: formulario.value.suspension_tiempo,
        carrera_tiempo: tiempoCarreraEnSegundos.value
      },
      props.sexo
    )
  } catch (err) {
    console.error('Error calculando nota:', err)
    return null
  }
})

// Enviar formulario
const enviarFormulario = async () => {
  try {
    error.value = null

    if (!user.value?.id) {
      error.value = 'Usuario no autenticado'
      return
    }

    if (!props.sexo) {
      error.value = 'Sexo no especificado'
      return
    }

    if (!formulario.value.fecha) {
      error.value = 'La fecha es requerida'
      return
    }

    if (formulario.value.circuito_tiempo <= 0) {
      error.value = 'El tiempo del circuito debe ser mayor a 0'
      return
    }

    if (props.sexo === 'M' && !formulario.value.dominadas_repeticiones) {
      error.value = 'Las repeticiones de dominadas son requeridas'
      return
    }

    if (props.sexo === 'F' && formulario.value.suspension_tiempo === undefined) {
      error.value = 'El tiempo de suspensión es requerido'
      return
    }

    if (tiempoCarreraEnSegundos.value <= 0) {
      error.value = 'El tiempo de carrera debe ser mayor a 0'
      return
    }

    // Preparar datos
    const marca: CrearMarcaCNP = {
      usuario_id: user.value.id,
      fecha: formulario.value.fecha,
      circuito_tiempo: formulario.value.circuito_tiempo,
      carrera_tiempo: tiempoCarreraEnSegundos.value,
      observaciones: formulario.value.observaciones || null,
      nota_estimada: notaEstimada.value || 0
    }

    if (props.sexo === 'M') {
      marca.dominadas_repeticiones = formulario.value.dominadas_repeticiones
    } else if (props.sexo === 'F') {
      marca.suspension_tiempo = formulario.value.suspension_tiempo
    }

    // Guardar en Supabase
    await agregarMarca(marca)

    // Limpiar formulario
    resetearFormulario()
    error.value = null
  } catch (err: any) {
    error.value = err.message || 'Error al guardar la marca'
    console.error('Error:', err)
  }
}

// Resetear formulario
const resetearFormulario = () => {
  const hoy = new Date().toISOString().split('T')[0] || ''
  formulario.value = {
    fecha: hoy,
    circuito_tiempo: 0,
    dominadas_repeticiones: undefined,
    suspension_tiempo: undefined,
    carrera_tiempo: 0,
    observaciones: ''
  }
  minutos.value = 0
  segundos.value = 0
  error.value = null
}
</script>

<style scoped>
/* Animación del spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
