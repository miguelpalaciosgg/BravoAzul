<template>
  <a :href="whatsappLink" class="whatsapp-fab" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="white">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 .2c57.1 0 109.7 21.8 148.8 60.8 39.2 39.1 60.8 91.8 60.8 148.9 0 107.8-87.5 195.3-195.3 195.3-34.2 0-67.3-8.8-95.6-25.4l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-107.8 87.5-195.3 195.3-195.3zm91.3 148.9c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.8-16.2-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  </a>
</template>

<script setup lang="ts">
// In a real app, this would come from a config file or environment variable
const whatsappLink = 'https://wa.me/34663191694'; // Placeholder Spain number
</script>

<style scoped>
.whatsapp-fab {
  position: fixed;
  bottom: clamp(1rem, 4vw, 2rem);
  right: clamp(1rem, 4vw, 2rem);
  width: clamp(50px, 12vw, 60px);
  height: clamp(50px, 12vw, 60px);
  background-color: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 44px;
  min-width: 44px;
}

.whatsapp-fab:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

@media (max-width: 480px) {
  .whatsapp-fab {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
