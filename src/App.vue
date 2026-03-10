<script setup lang="ts">
import { RouterView } from 'vue-router'
import BotonWhatsapp from './components/BotonWhatsapp.vue'
</script>

<template>
  <div id="app-container">
    <RouterView />
    <BotonWhatsapp />
  </div>
</template>

<style scoped>
/* Global styles can go here, but for now we keep it minimal */
#app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
