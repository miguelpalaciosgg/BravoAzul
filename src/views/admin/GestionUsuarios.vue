<template>
  <div class="admin-view-container">
    <h2>Gestión de Usuarios</h2>
    <div class="placeholder">
      <p>Aquí habrá una tabla para crear/editar usuarios, asignarles grupo (G1-G8), sexo y nivel, y resetear contraseñas.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Admin logic for user management will go here
</script>

<style scoped>
.admin-view-container {
  background-color: white;
  padding: clamp(1rem, 4vw, 2rem);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

h2 {
  margin-top: 0;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  border-bottom: 1px solid #eee;
  padding-bottom: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(1.3rem, 4vw, 1.75rem);
}

.placeholder {
  border: 2px dashed #e0e0e0;
  padding: clamp(1.5rem, 4vw, 2rem);
  border-radius: 8px;
  text-align: center;
  background-color: #f8f9fa;
  word-wrap: break-word;
}

.placeholder p {
  font-size: clamp(0.875rem, 2vw, 1rem);
  line-height: 1.6;
}
</style>
