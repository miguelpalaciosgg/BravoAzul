<template>
  <nav class="navbar" :class="{ 'navbar-expanded': isMenuOpen }">
    <div class="navbar-container">
      <div class="navbar-brand">
        <RouterLink :to="{ name: 'portal' }" class="logo" @click="closeMenu">
          {{ logoText }}
        </RouterLink>
      </div>
      
      <button 
        class="navbar-toggle" 
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation"
      >
        <span class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <div class="navbar-menu" v-show="isMenuOpen || !isMobile">
        <div class="navbar-nav">
          <slot></slot>
        </div>
      </div>
    </div>
  </nav>

  <!-- Overlay para cerrar menú -->
  <div 
    v-if="isMenuOpen && isMobile" 
    class="navbar-overlay" 
    @click="closeMenu"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

interface Props {
  logoText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  logoText: 'Bravo Azul'
});

const isMenuOpen = ref(false);
const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value < 768);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value >= 768) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.navbar {
  background-color: #343a40;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(0.75rem, 3vw, 1.5rem);
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

.navbar-brand {
  flex-shrink: 0;
}

.logo {
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: inline-block;
  padding: clamp(0.4rem, 1vw, 0.6rem);
}

.logo:hover {
  color: #17a2b8;
}

.navbar-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  z-index: 101;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
  display: block;
}

/* Animación del hamburger cuando está abierto */
.navbar-expanded .navbar-toggle .hamburger span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.navbar-expanded .navbar-toggle .hamburger span:nth-child(2) {
  opacity: 0;
}

.navbar-expanded .navbar-toggle .hamburger span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

.navbar-menu {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}

.navbar-nav {
  display: flex;
  gap: clamp(0.25rem, 2vw, 1.5rem);
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.navbar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

/* Mobile styles */
@media (max-width: 767px) {
  .navbar-toggle {
    display: block;
  }

  .navbar-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #495057;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    flex-direction: column;
    gap: 0;
  }

  .navbar-expanded .navbar-menu {
    max-height: 500px;
  }

  .navbar-nav {
    flex-direction: column;
    width: 100%;
    gap: 0;
    padding: 1rem 0;
  }

  .navbar-nav :deep(a) {
    display: block;
    width: 100%;
    padding: 1rem;
    text-decoration: none;
    color: white;
    border-bottom: 1px solid #343a40;
    transition: background-color 0.3s ease;
  }

  .navbar-nav :deep(a):hover,
  .navbar-nav :deep(a.router-link-active) {
    background-color: #343a40;
    color: #17a2b8;
  }
}

/* Desktop styles */
@media (min-width: 768px) {
  .navbar-menu {
    flex-direction: row;
  }

  .navbar-nav {
    flex-direction: row;
    width: auto;
  }

  .navbar-nav :deep(a) {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: clamp(0.4rem, 1vw, 0.75rem) clamp(0.5rem, 1.5vw, 1rem);
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
    font-size: clamp(0.75rem, 2vw, 1rem);
    white-space: nowrap;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navbar-nav :deep(a):hover {
    background-color: #495057;
  }

  .navbar-nav :deep(a.router-link-active) {
    color: #17a2b8;
    font-weight: bold;
  }
}
</style>
