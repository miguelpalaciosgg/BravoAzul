<template>
  <div class="admin-container">
    <NavbarMobile :logo-text="'Admin Panel'">
      <RouterLink :to="{ name: 'admin-usuarios' }">Usuarios</RouterLink>
      <RouterLink :to="{ name: 'admin-contenido' }">Contenido</RouterLink>
      <RouterLink :to="{ name: 'admin-seguimiento-marcas' }">Marcas</RouterLink>
      <RouterLink :to="{ name: 'admin-seguimiento-checkins' }">Check-ins</RouterLink>
      <button @click="logout" class="logout-btn">Salir</button>
    </NavbarMobile>

    <main class="admin-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import NavbarMobile from '@/components/NavbarMobile.vue';

const router = useRouter();

const logout = () => {
  console.log('Admin logging out...');
  router.push({ name: 'login' });
};
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f7f9;
}

.logout-btn {
  background: none;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: clamp(0.4rem, 1vw, 0.75rem) clamp(0.75rem, 2vw, 1.5rem);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: clamp(0.75rem, 2vw, 1rem);
  white-space: nowrap;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-btn:hover {
  background-color: #dc3545;
  color: white;
}

.admin-content {
  padding: clamp(1rem, 4vw, 2rem);
  flex-grow: 1;
}
</style>
