<template>
  <div v-if="isVisible" class="announcement-bar bg-primary text-white py-2">
    <div class="container d-flex align-items-center justify-content-center">
      <span class="d-none d-md-inline me-2">
        <i class="bi bi-tag-fill me-1"></i>
        <strong>PROMOTION</strong>
      </span>
      <span class="text-center">
        {{ message }}
        <a 
          v-if="ctaText && ctaLink" 
          :href="ctaLink" 
          class="text-white fw-bold ms-2 text-decoration-underline"
        >
          {{ ctaText }}
        </a>
      </span>
      
      <button 
        @click="closeAnnouncement" 
        class="btn-close btn-close-white ms-auto" 
        aria-label="Fermer"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  // Message d'annonce
  message: {
    type: String,
    default: 'Livraison gratuite à partir de 50€ d\'achat !'
  },
  // Texte de l'appel à l'action
  ctaText: {
    type: String,
    default: 'Voir les conditions'
  },
  // Lien de l'appel à l'action
  ctaLink: {
    type: String,
    default: '/offres-speciales'
  },
  // Durée avant la fermeture automatique (en secondes, 0 pour désactiver)
  autoCloseAfter: {
    type: Number,
    default: 0
  },
  // Clé de stockage local pour mémoriser la fermeture
  storageKey: {
    type: String,
    default: 'announcement_closed'
  }
});

const isVisible = ref(true);

// Vérifier si la bannière a déjà été fermée
const checkIfClosed = () => {
  if (typeof window !== 'undefined' && localStorage) {
    return localStorage.getItem(props.storageKey) === 'true';
  }
  return false;
};

// Fermer la bannière
const closeAnnouncement = () => {
  isVisible.value = false;
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.setItem(props.storageKey, 'true');
  }
};

// Fermeture automatique après un délai
const setupAutoClose = () => {
  if (props.autoCloseAfter > 0) {
    setTimeout(() => {
      closeAnnouncement();
    }, props.autoCloseAfter * 1000);
  }
};

// Initialisation
onMounted(() => {
  isVisible.value = !checkIfClosed();
  if (isVisible.value && props.autoCloseAfter > 0) {
    setupAutoClose();
  }
});
</script>

<style scoped>
.announcement-bar {
  font-size: 0.875rem;
  position: relative;
  z-index: 1030; /* Au-dessus de la navbar */
  transition: all 0.3s ease;
  overflow: hidden;
}

.announcement-bar a {
  color: white;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.announcement-bar a:hover {
  opacity: 0.8;
  text-decoration: none;
}

.btn-close {
  opacity: 0.8;
  padding: 0.5rem;
  background-size: 0.75rem;
  transition: opacity 0.2s ease;
}

.btn-close:hover {
  opacity: 1;
}

/* Animation d'entrée/sortie */
.v-enter-active,
.v-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
  max-height: 100px;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-100%);
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
  border: none;
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .announcement-bar {
    background-color: #0d6efd !important;
  }
}
</style>
