<template>
  <div class="content-view">
    <RouterLink :to="{ name: 'portal' }" class="back-link">&larr; Volver al portal</RouterLink>
    <h1>Carreras de la Semana</h1>
    <div class="placeholder">
      <p>Aquí se mostrarán los 3 días de carrera de la semana, junto con su formulario de check-in.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.content-view {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 2rem);
  animation: fadeIn 0.5s ease-in-out;
}

h1 {
  font-size: clamp(1.5rem, 5vw, 2rem);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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
  padding: clamp(1.5rem, 5vw, 3rem);
  border-radius: 8px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  word-wrap: break-word;
}

.placeholder p {
  font-size: clamp(0.9rem, 2vw, 1rem);
  line-height: 1.6;
}
</style>
