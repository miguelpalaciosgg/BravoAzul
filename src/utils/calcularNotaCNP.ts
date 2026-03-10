/**
 * Calcula la nota estimada del simulacro CNP según la normativa del BOE
 * Esta versión es un aproximado inicial. Se debe afinar con las tablas oficiales.
 * 
 * Nota: La puntuación oficial del CNP usa diferentes baremos según sexo
 * Para hombres: dominadas, circuito agilidad, carrera 1000m
 * Para mujeres: suspensión en barra, circuito agilidad, carrera 1000m
 * 
 * @param marcas - Objeto con todas las pruebas realizadas
 * @param sexo - 'M' para hombre, 'F' para mujer
 * @returns Nota del 0 al 10
 */
export function calcularNotaCNP(
  marcas: {
    circuito_tiempo: number
    dominadas_repeticiones?: number | null
    suspension_tiempo?: number | null
    carrera_tiempo: number
  },
  sexo: 'M' | 'F'
): number {
  let totalPuntos = 0

  // Puntuación Circuito de Agilidad (sobre 10)
  // Baremos aproximados (en segundos, mayores tiempos = menos puntos)
  const circuitoScore = calcularPuntosCircuito(marcas.circuito_tiempo)
  totalPuntos += circuitoScore * 0.33 // 33% de la nota

  // Puntuación Prueba de Fuerza (sobre 10)
  let fuerzaScore = 0
  if (sexo === 'M' && marcas.dominadas_repeticiones !== undefined && marcas.dominadas_repeticiones !== null) {
    fuerzaScore = calcularPuntosDominadas(marcas.dominadas_repeticiones)
  } else if (sexo === 'F' && marcas.suspension_tiempo !== undefined && marcas.suspension_tiempo !== null) {
    fuerzaScore = calcularPuntosSuspension(marcas.suspension_tiempo)
  }
  totalPuntos += fuerzaScore * 0.33 // 33% de la nota

  // Puntuación Carrera de 1000m (sobre 10)
  // carrera_tiempo está en segundos
  const carreraScore = calcularPuntosCarrera(marcas.carrera_tiempo)
  totalPuntos += carreraScore * 0.34 // 34% de la nota

  // Redondear a dos decimales y asegurar que esté entre 0 y 10
  return Math.round(Math.min(10, Math.max(0, totalPuntos)) * 100) / 100
}

/**
 * Calcula puntos para el circuito de agilidad
 * Baremos aproximados (mayor tiempo = menos puntos)
 * Óptimo: ~40 segundos, Mínimo: ~60 segundos
 */
function calcularPuntosCircuito(tiempoSegundos: number): number {
  // Baremo simplificado (puede ajustarse con datos reales del BOE)
  if (tiempoSegundos <= 40) return 10
  if (tiempoSegundos <= 45) return 9
  if (tiempoSegundos <= 50) return 8
  if (tiempoSegundos <= 55) return 7
  if (tiempoSegundos <= 60) return 6
  if (tiempoSegundos <= 65) return 5
  if (tiempoSegundos <= 70) return 4
  if (tiempoSegundos <= 75) return 3
  if (tiempoSegundos <= 80) return 2
  if (tiempoSegundos <= 85) return 1
  return 0
}

/**
 * Calcula puntos para dominadas (prueba de hombre)
 * Cada repetición adicional suma puntos
 */
function calcularPuntosDominadas(repeticiones: number): number {
  // Baremo aproximado
  if (repeticiones >= 20) return 10
  if (repeticiones >= 18) return 9.5
  if (repeticiones >= 16) return 9
  if (repeticiones >= 14) return 8.5
  if (repeticiones >= 12) return 8
  if (repeticiones >= 10) return 7
  if (repeticiones >= 8) return 6
  if (repeticiones >= 6) return 5
  if (repeticiones >= 4) return 3
  if (repeticiones >= 2) return 1
  return 0
}

/**
 * Calcula puntos para suspensión en barra (prueba de mujer)
 * Baremos aproximados en segundos
 */
function calcularPuntosSuspension(tiempoSegundos: number): number {
  // Baremo aproximado (mayor tiempo = más puntos)
  if (tiempoSegundos >= 180) return 10 // 3 minutos
  if (tiempoSegundos >= 150) return 9.5 // 2.5 minutos
  if (tiempoSegundos >= 120) return 9 // 2 minutos
  if (tiempoSegundos >= 90) return 8 // 1.5 minutos
  if (tiempoSegundos >= 60) return 7 // 1 minuto
  if (tiempoSegundos >= 45) return 6
  if (tiempoSegundos >= 30) return 5
  if (tiempoSegundos >= 20) return 3
  if (tiempoSegundos >= 10) return 1
  return 0
}

/**
 * Calcula puntos para la carrera de 1000m
 * Tiempo en segundos, óptimo para hombre ~200s, para mujer ~250s
 */
function calcularPuntosCarrera(tiempoSegundos: number): number {
  // Baremo aproximado
  if (tiempoSegundos <= 200) return 10 // 3:20 min
  if (tiempoSegundos <= 210) return 9.5
  if (tiempoSegundos <= 220) return 9
  if (tiempoSegundos <= 230) return 8.5
  if (tiempoSegundos <= 240) return 8
  if (tiempoSegundos <= 255) return 7
  if (tiempoSegundos <= 270) return 6
  if (tiempoSegundos <= 285) return 5
  if (tiempoSegundos <= 300) return 4
  if (tiempoSegundos <= 330) return 3
  if (tiempoSegundos <= 360) return 2
  if (tiempoSegundos <= 420) return 1
  return 0
}
