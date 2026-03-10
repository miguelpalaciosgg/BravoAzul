<template>
  <div class="portal-container">
    <NavbarMobile :logo-text="'Bravo Azul'">
      <RouterLink :to="{ name: 'rutina' }">Rutina Mensual</RouterLink>
      <RouterLink :to="{ name: 'carreras' }">Carreras</RouterLink>
      <RouterLink :to="{ name: 'marcas' }">Mis Marcas</RouterLink>
      <RouterLink :to="{ name: 'recursos' }">Recursos</RouterLink>
      <button @click="logout" class="logout-btn">Salir</button>
    </NavbarMobile>

    <main class="portal-content">
      <h2>Bienvenido, Opositor</h2>
      <p>Selecciona una de las opciones del menú para empezar.</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import NavbarMobile from '@/components/NavbarMobile.vue';

const router = useRouter();

const logout = () => {
  console.log('User logging out...');
  router.push({ name: 'login' });
};
</script>

<style scoped>
.portal-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: clamp(0.4rem, 1vw, 0.75rem) clamp(0.75rem, 2vw, 1.5rem);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  font-size: clamp(0.75rem, 2vw, 1rem);
  white-space: nowrap;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-btn:hover {
  background-color: #c82333;
}

.portal-content {
  padding: clamp(1rem, 4vw, 2rem);
  text-align: center;
  flex-grow: 1;
}

.portal-content h2 {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: 1rem;
  color: #2c3e50;
}

.portal-content p {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: #555;
}
</style>
