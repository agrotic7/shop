<template>
  <button 
    v-show="isVisible"
    @click="scrollToTop"
    class="btn btn-primary btn-scroll-top"
    aria-label="Retour en haut de la page"
  >
    <i class="bi bi-arrow-up"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);
const scrollThreshold = 300; // Seuil de défilement pour afficher le bouton

const handleScroll = () => {
  isVisible.value = window.scrollY > scrollThreshold;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.btn-scroll-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  opacity: 0.9;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border: none;
}

.btn-scroll-top:hover {
  opacity: 1;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* Animation d'apparition */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .btn-scroll-top {
    background-color: var(--bs-primary);
    color: white;
  }
  
  .btn-scroll-top:hover {
    background-color: var(--bs-primary);
  }
}
</style>
