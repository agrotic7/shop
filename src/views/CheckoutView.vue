<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

// État du formulaire
const form = ref({
  email: '',
  name: '',
  address: '',
  city: '',
  postalCode: ''
});

const isLoading = ref(false);
const error = ref('');

// Calcul du total
const total = computed(() => {
  return cartStore.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) + 4.99; // Frais de livraison
});

// Soumettre la commande
const submitOrder = async () => {
  if (!form.value.email || !form.value.name || !form.value.address || !form.value.city || !form.value.postalCode) {
    error.value = 'Veuillez remplir tous les champs';
    return;
  }
  
  isLoading.value = true;
  error.value = '';
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const orderNumber = 'CMD-' + Math.floor(100000 + Math.random() * 900000);
    cartStore.clearCart();
    router.push({
      name: 'OrderConfirmation',
      query: { order: orderNumber }
    });
  } catch (err) {
    error.value = 'Erreur lors de la commande';
  } finally {
    isLoading.value = false;
  }
};

// Formater le prix
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-8">Finaliser la commande</h1>
      
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div v-if="error" class="bg-red-50 text-red-700 p-4 rounded-md text-sm mb-6">
            {{ error }}
          </div>
          
          <div class="space-y-6">
            <div>
              <h2 class="text-lg font-medium text-gray-900 mb-4">Informations de livraison</h2>
              
              <div class="grid grid-cols-1 gap-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nom complet</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Adresse</label>
                  <input
                    v-model="form.address"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Ville</label>
                    <input
                      v-model="form.city"
                      type="text"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Code postal</label>
                    <input
                      v-model="form.postalCode"
                      type="text"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Récapitulatif</h2>
              
              <div class="space-y-2">
                <div v-for="item in cartStore.cartItems" :key="item.id" class="flex justify-between">
                  <span class="text-gray-600">{{ item.name }} (x{{ item.quantity }})</span>
                  <span class="font-medium">{{ formatPrice(item.price * item.quantity) }}</span>
                </div>
                
                <div class="flex justify-between border-t border-gray-200 pt-2">
                  <span class="font-medium">Livraison</span>
                  <span class="font-medium">{{ formatPrice(4.99) }}</span>
                </div>
                
                <div class="flex justify-between border-t border-gray-200 pt-2 font-bold text-lg">
                  <span>Total</span>
                  <span>{{ formatPrice(total) }}</span>
                </div>
              </div>
              
              <button
                @click="submitOrder"
                :disabled="isLoading || cartStore.cartItems.length === 0"
                class="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isLoading">Traitement...</span>
                <span v-else>Payer maintenant</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>