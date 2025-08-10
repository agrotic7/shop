<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();
const route = useRoute();
const orderNumber = ref('');

onMounted(() => {
  orderNumber.value = route.query.order || '';
});

const continueShopping = () => {
  router.push('/products');
};
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 text-center">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-5">
            <div class="mb-4">
              <div class="d-flex justify-content-center mb-3">
                <div class="checkmark-circle">
                  <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                </div>
              </div>
              <h1 class="h3 mb-3">Commande confirmée !</h1>
              <div v-if="orderNumber" class="alert alert-success mb-4">
                <div class="d-flex align-items-center">
                  <i class="bi bi-check-circle-fill me-2"></i>
                  <span>Votre numéro de commande est : <strong>{{ orderNumber }}</strong></span>
                </div>
              </div>
              <p class="text-muted mb-4">
                Merci pour votre achat ! Votre commande a été reçue et est en cours de traitement.
                Un email de confirmation vous a été envoyé avec les détails de votre commande.
              </p>
              <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                <button 
                  @click="continueShopping"
                  class="btn btn-primary btn-lg px-4 me-md-2"
                >
                  <i class="bi bi-arrow-left me-2"></i>Continuer mes achats
                </button>
                <button 
                  @click="$router.push('/')" 
                  class="btn btn-outline-secondary btn-lg px-4"
                >
                  Page d'accueil
                </button>
              </div>
            </div>
            
            <div class="mt-5 pt-4 border-top">
              <h2 class="h5 mb-3">Besoin d'aide ?</h2>
              <p class="text-muted mb-0">
                Contactez notre service client au <a href="tel:+33123456789">01 23 45 67 89</a> ou par email à 
                <a href="mailto:contact@example.com">contact@example.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkmark-circle {
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.btn {
  min-width: 200px;
}
</style>
