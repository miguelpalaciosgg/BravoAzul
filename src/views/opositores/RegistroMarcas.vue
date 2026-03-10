<template>
  <div class="content-view">
    <RouterLink :to="{ name: 'portal' }" class="back-link">&larr; Volver al portal</RouterLink>
    <h1>Registro de Marcas CNP</h1>

    <!-- Componente del formulario -->
    <div class="mb-8">
      <SimulacroCNPForm :sexo="sexoUsuario" />
    </div>

    <!-- Listado de marcas -->
    <div v-if="marcas.length > 0" class="marcas-section">
      <h2>Historial de Marcas</h2>
      
      <!-- Loading state -->
      <div v-if="cargandiMarcas" class="flex justify-center py-8">
        <p class="text-gray-600">Cargando marcas...</p>
      </div>

      <!-- Error state -->
      <div
        v-else-if="errorMarcas"
        class="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4"
      >
        {{ errorMarcas }}
      </div>

      <!-- Tabla de marcas -->
      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-200 text-gray-800">
              <th class="px-4 py-2 text-left border">Fecha</th>
              <th class="px-4 py-2 text-left border">Circuito (s)</th>
              <th class="px-4 py-2 text-left border">
                {{ sexoUsuario === 'M' ? 'Dominadas' : 'Suspensión (s)' }}
              </th>
              <th class="px-4 py-2 text-left border">Carrera 1000m</th>
              <th class="px-4 py-2 text-left border">Nota CNP</th>
              <th class="px-4 py-2 text-center border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="marca in marcas" :key="marca.id" class="hover:bg-gray-50">
              <td class="px-4 py-2 border">
                {{ formatearFecha(marca.fecha) }}
              </td>
              <td class="px-4 py-2 border text-center">
                {{ marca.circuito_tiempo.toFixed(2) }}s
              </td>
              <td class="px-4 py-2 border text-center">
                <span v-if="sexoUsuario === 'M'">
                  {{ marca.dominadas_repeticiones ?? '—' }}
                </span>
                <span v-else>
                  {{ marca.suspension_tiempo ? marca.suspension_tiempo.toFixed(2) + 's' : '—' }}
                </span>
              </td>
              <td class="px-4 py-2 border text-center">
                {{ formatearTiempoSegundos(marca.carrera_tiempo) }}
              </td>
              <td class="px-4 py-2 border text-center font-bold text-blue-600">
                {{ marca.nota_estimada.toFixed(2) }}/10
              </td>
              <td class="px-4 py-2 border text-center">
                <button
                  @click="expandir(marca.id)"
                  class="text-blue-600 hover:underline text-sm font-semibold"
                >
                  Ver
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Detalle expandido -->
      <div
        v-if="marcaExpandida && marcas.find((m: MarcasCNP) => m.id === marcaExpandida)"
        class="mt-6 p-4 bg-gray-50 border-l-4 border-blue-500 rounded"
      >
        <button
          @click="marcaExpandida = null"
          class="text-sm text-blue-600 hover:underline mb-3"
        >
          ✕ Cerrar
        </button>
        <div
          v-if="marcas.find((m: MarcasCNP) => m.id === marcaExpandida)?.observaciones"
          class="mb-2"
        >
          <p class="text-sm text-gray-600">
            <span class="font-semibold">Observaciones:</span>
            {{ marcas.find((m: MarcasCNP) => m.id === marcaExpandida)?.observaciones }}
          </p>
        </div>
        <p class="text-xs text-gray-500">
          Registrado: {{ formatearFecha(marcas.find((m: MarcasCNP) => m.id === marcaExpandida)?.created_at || '') }}
        </p>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-else class="placeholder">
      <p>Aún no has registrado ninguna marca.</p>
      <p class="text-sm text-gray-600 mt-2">Completa el formulario anterior para comenzar a trackear tu progreso.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useRegistroMarcas } from '@/composables/useRegistroMarcas'
import SimulacroCNPForm from '@/components/SimulacroCNPForm.vue'
import type { MarcasCNP } from '@/../env'

const { user } = useAuth()
const { marcas, loading: cargandiMarcas, error: errorMarcas, getMarcas } = useRegistroMarcas()

// Estado
const sexoUsuario = ref<'M' | 'F'>('M') // Se debería obtener de la BD del usuario
const marcaExpandida = ref<string | null>(null)

// Obtener marcas al montar el componente
onMounted(async () => {
  if (user.value?.id) {
    try {
      await getMarcas(user.value.id)
    } catch (err) {
      console.error('Error obteniendo marcas:', err)
    }
  }
})

// Utilidades
const formatearFecha = (fecha: string): string => {
  if (!fecha) return '—'
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatearTiempoSegundos = (segundos: number): string => {
  const minutos = Math.floor(segundos / 60)
  const segs = segundos % 60
  return `${minutos}:${String(segs).padStart(2, '0')}`
}

const expandir = (id: string) => {
  marcaExpandida.value = marcaExpandida.value === id ? null : id
}
</script>

<style scoped>
.content-view {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 2rem);
  animation: fadeIn 0.5s ease-in-out;
}

h1 {
  font-size: clamp(1.5rem, 5vw, 2rem);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  color: #1a202c;
}

h2 {
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  margin-bottom: 1.5rem;
  color: #2d3748;
  margin-top: 2rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.back-link {
  display: inline-block;
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
  font-weight: 500;
  color: #007bff;
  text-decoration: none;
  font-size: clamp(0.875rem, 2vw, 1rem);
  padding: clamp(0.4rem, 1vw, 0.6rem);
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  text-decoration: underline;
  background-color: rgba(0, 123, 255, 0.1);
}

.placeholder {
  border: 1px solid #e0e0e0;
  padding: clamp(1.5rem, 4vw, 2rem);
  border-radius: 8px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.placeholder p {
  font-size: clamp(0.9rem, 2vw, 1rem);
  line-height: 1.6;
  color: #666;
}

.marcas-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

table {
  font-size: clamp(0.75rem, 1vw, 0.95rem);
}

@media (max-width: 768px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }

  table {
    font-size: 0.8rem;
  }

  table th,
  table td {
    padding: 0.5rem !important;
  }
}
</style>
