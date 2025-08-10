<script setup>
import { onMounted, ref, provide } from 'vue';
import { useCartStore } from './stores/cart';
import NavBar from '@/components/layout/NavBar.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import ToastNotification from '@/components/common/ToastNotification.vue';
import ScrollToTop from '@/components/common/ScrollToTop.vue';
import AnnouncementBar from '@/components/common/AnnouncementBar.vue';
import MetaTags from '@/components/common/MetaTags.vue';

const isLoading = ref(true);

const cartStore = useCartStore();
const toastRef = ref(null);

// Fournir la méthode de notification aux composants enfants
const showToast = (message, type = 'info', duration = 3000) => {
  if (toastRef.value) {
    return toastRef.value.showToast(message, type, duration);
  }
  return null;
};

// Fournir la méthode showToast aux composants enfants
provide('showToast', showToast);

// Charger le panier depuis le localStorage au démarrage
onMounted(async () => {
  try {
    await cartStore.loadCart();
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <MetaTags
    title="E-Shop - Votre boutique en ligne préférée"
    description="Découvrez notre sélection de produits de qualité à des prix imbattables. Livraison rapide et sécurisée."
    image="/images/og-image.jpg"
    keywords="ecommerce, boutique en ligne, achats en ligne, produits, shopping"
  >
    <div class="min-vh-100 bg-light position-relative">
      <LoadingSpinner :loading="isLoading" />
      <!-- Bannière d'annonce -->
      <AnnouncementBar 
        message="Livraison gratuite à partir de 50€ d'achat !"
        cta-text="Voir les conditions"
        cta-link="/livraison"
        :auto-close-after="0"
      />
      <NavBar />
    
    <main class="container py-4">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- Pied de page -->
    <AppFooter />
    
    <!-- Composant de notification toast -->
    <ToastNotification ref="toastRef" />
    
    <!-- Bouton de défilement vers le haut -->
    <ScrollToTop />
  </div>
  </MetaTags>
</template>

<style>
/* Styles globaux */
:root {
  --bs-body-font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --bs-body-bg: #f8f9fa;
}

/* Animation de transition de page */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Styles pour les liens */
a {
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

a:hover {
  text-decoration: none;
}

/* Amélioration de la lisibilité */
body {
  line-height: 1.6;
  color: #333;
}

/* Style pour les boutons */
.btn {
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease-in-out;
}

/* Style pour les cartes */
.card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
}

/* Style pour les formulaires */
.form-control:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}

/* Espacement personnalisé */
.section-padding {
  padding: 5rem 0;
}

@media (max-width: 767.98px) {
  .section-padding {
    padding: 3rem 0;
  }
}

/* Animation pour les éléments au défilement */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Style personnalisé pour les badges */
.badge {
  font-weight: 500;
  letter-spacing: 0.5px;
}
</style>
