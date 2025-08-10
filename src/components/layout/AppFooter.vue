<template>
  <footer class="bg-dark text-white pt-5 pb-4">
    <div class="container">
      <div class="row g-4">
        <!-- À propos -->
        <div class="col-md-6 col-lg-3">
          <h5 class="text-uppercase mb-4 fw-bold">E-Shop</h5>
          <p class="text-muted">
            Votre boutique en ligne préférée pour des produits de qualité à des prix imbattables.
          </p>
          <div class="d-flex gap-3 mt-4">
            <a href="#" class="text-white text-decoration-none" aria-label="Facebook">
              <i class="bi bi-facebook fs-5"></i>
            </a>
            <a href="#" class="text-white text-decoration-none" aria-label="Twitter">
              <i class="bi bi-twitter fs-5"></i>
            </a>
            <a href="#" class="text-white text-decoration-none" aria-label="Instagram">
              <i class="bi bi-instagram fs-5"></i>
            </a>
            <a href="#" class="text-white text-decoration-none" aria-label="Pinterest">
              <i class="bi bi-pinterest fs-5"></i>
            </a>
          </div>
        </div>
        
        <!-- Liens rapides -->
        <div class="col-md-6 col-lg-3">
          <h5 class="text-uppercase mb-4 fw-bold">Liens rapides</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/" class="text-muted text-decoration-none hover-text-white">
                Accueil
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/products" class="text-muted text-decoration-none hover-text-white">
                Nos produits
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/about" class="text-muted text-decoration-none hover-text-white">
                À propos
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/contact" class="text-muted text-decoration-none hover-text-white">
                Contact
              </router-link>
            </li>
            <li>
              <router-link to="/cart" class="text-muted text-decoration-none hover-text-white">
                Mon panier
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- Contact -->
        <div class="col-md-6 col-lg-3">
          <h5 class="text-uppercase mb-4 fw-bold">Contact</h5>
          <ul class="list-unstyled text-muted">
            <li class="mb-3 d-flex">
              <i class="bi bi-geo-alt-fill me-3 mt-1"></i>
              <span>123 Rue du Commerce, 75001 Paris, France</span>
            </li>
            <li class="mb-3 d-flex">
              <i class="bi bi-telephone-fill me-3 mt-1"></i>
              <a href="tel:+33123456789" class="text-muted text-decoration-none hover-text-white">
                +33 1 23 45 67 89
              </a>
            </li>
            <li class="d-flex">
              <i class="bi bi-envelope-fill me-3 mt-1"></i>
              <a href="mailto:contact@example.com" class="text-muted text-decoration-none hover-text-white">
                contact@example.com
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Newsletter -->
        <div class="col-md-6 col-lg-3">
          <h5 class="text-uppercase mb-4 fw-bold">Newsletter</h5>
          <p class="text-muted">
            Abonnez-vous à notre newsletter pour recevoir nos offres spéciales et mises à jour.
          </p>
          <div class="input-group mb-3">
            <input 
              type="email" 
              class="form-control bg-dark text-white border-secondary" 
              placeholder="Votre email" 
              aria-label="Votre email"
              aria-describedby="button-newsletter"
            >
            <button 
              class="btn btn-primary" 
              type="button" 
              id="button-newsletter"
              @click="subscribeNewsletter"
            >
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
          <div v-if="showNewsletterSuccess" class="alert alert-success alert-dismissible fade show mt-2" role="alert">
            Merci pour votre inscription à notre newsletter !
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
      </div>
      
      <hr class="my-4 border-secondary">
      
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <p class="text-muted mb-0">
            &copy; {{ currentYear }} E-Shop. Tous droits réservés.
          </p>
        </div>
        <div class="col-md-6 text-center text-md-end">
          <img 
            src="https://via.placeholder.com/40x25" 
            alt="Paiement sécurisé" 
            class="me-2"
            loading="lazy"
          >
          <img 
            src="https://via.placeholder.com/40x25" 
            alt="Carte bancaire"
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { inject } from 'vue';

const showToast = inject('showToast');
const showNewsletterSuccess = ref(false);
const currentYear = new Date().getFullYear();

const subscribeNewsletter = () => {
  // Simuler une inscription à la newsletter
  showNewsletterSuccess.value = true;
  showToast('Merci pour votre inscription à notre newsletter !', 'success');
  
  // Réinitialiser le message après 5 secondes
  setTimeout(() => {
    showNewsletterSuccess.value = false;
  }, 5000);
};
</script>

<style scoped>
.hover-text-white {
  transition: color 0.2s ease-in-out;
}

.hover-text-white:hover {
  color: #fff !important;
}

.form-control:focus {
  background-color: #1a1a1a;
  border-color: var(--bs-primary);
  color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}

.btn {
  padding: 0.5rem 1rem;
}

.alert {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  margin-bottom: 0;
}

/* Animation pour le bouton de la newsletter */
.btn-primary {
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateX(2px);
}

/* Style pour les icônes de contact */
.bi {
  min-width: 20px;
}

/* Responsive */
@media (max-width: 767.98px) {
  .text-md-start, .text-md-end {
    text-align: center !important;
  }
  
  .d-flex {
    justify-content: center;
  }
}
</style>
