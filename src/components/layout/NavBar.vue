<script setup>
import { ref, computed, inject } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();
const isMenuOpen = ref(false);
const showToast = inject('showToast');

const cartItemCount = computed(() => {
  return cartStore.cartItems.reduce((total, item) => total + item.quantity, 0);
});

const toggleCart = () => {
  if (cartStore.cartItems.length === 0) {
    showToast('Votre panier est vide', 'info');
    return;
  }
  router.push('/cart');
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand fw-bold d-flex align-items-center">
        <i class="bi bi-shop me-2"></i>
        <span>E-Shop</span>
      </router-link>

      <!-- Bouton menu mobile -->
      <button 
        class="navbar-toggler" 
        type="button" 
        @click="isMenuOpen = !isMenuOpen"
        aria-controls="navbarNav"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation -->
      <div 
        class="collapse navbar-collapse" 
        :class="{ 'show': isMenuOpen }" 
        id="navbarNav"
      >
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link 
              to="/" 
              class="nav-link" 
              :class="{ 'active': $route.path === '/' }"
              @click="isMenuOpen = false"
            >
              <i class="bi bi-house-door me-1"></i>
              <span>Accueil</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/products" 
              class="nav-link" 
              :class="{ 'active': $route.path.startsWith('/products') }"
              @click="isMenuOpen = false"
            >
              <i class="bi bi-grid me-1"></i>
              <span>Produits</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/about" 
              class="nav-link"
              @click="isMenuOpen = false"
            >
              <i class="bi bi-info-circle me-1"></i>
              <span>À propos</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/contact" 
              class="nav-link"
              @click="isMenuOpen = false"
            >
              <i class="bi bi-envelope me-1"></i>
              <span>Contact</span>
            </router-link>
          </li>
        </ul>

        <!-- Panier -->
        <div class="d-flex align-items-center">
          <button 
            @click="toggleCart"
            class="btn btn-outline-primary position-relative me-2"
            type="button"
            :disabled="cartItemCount === 0"
            :class="{ 'opacity-50': cartItemCount === 0 }"
            :title="cartItemCount === 0 ? 'Votre panier est vide' : 'Voir mon panier'"
          >
            <i class="bi bi-cart3"></i>
            <span class="ms-1 d-none d-md-inline">Panier</span>
            <span 
              v-if="cartItemCount > 0"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ cartItemCount }}
              <span class="visually-hidden">articles dans le panier</span>
            </span>
          </button>
          
          <!-- Bouton de connexion -->
          <button 
            class="btn btn-outline-secondary"
            @click="showToast('Fonctionnalité de connexion à venir', 'info')"
          >
            <i class="bi bi-person"></i>
            <span class="d-none d-md-inline ms-1">Connexion</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 0.8rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.navbar-brand {
  font-size: 1.5rem;
  color: var(--bs-primary) !important;
}

.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
}

.nav-link:hover, .nav-link.active {
  background-color: rgba(var(--bs-primary-rgb), 0.1);
  color: var(--bs-primary) !important;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
}

.badge {
  font-size: 0.7rem;
  padding: 0.35em 0.65em;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    padding: 1rem 0;
    margin-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.1);
  }
  
  .nav-item {
    margin: 0.25rem 0;
  }
  
  .nav-link {
    padding: 0.75rem 1rem !important;
  }
  
  .d-flex {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.1);
  }
}
</style>
