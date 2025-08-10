<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();

const cartTotal = computed(() => {
  return cartStore.cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};

const goToCheckout = () => {
  router.push('/checkout');
  cartStore.toggleCart();
};
</script>

<template>
  <div 
    v-show="cartStore.isOpen" 
    class="fixed inset-0 overflow-hidden z-50"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div 
        class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
        @click="cartStore.toggleCart"
      ></div>
      
      <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-md">
          <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
            <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900">Panier d'achat</h2>
                <div class="ml-3 h-7 flex items-center">
                  <button 
                    @click="cartStore.toggleCart"
                    class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span class="sr-only">Fermer le panier</span>
                    <svg 
                      class="h-6 w-6" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="mt-8">
                <div class="flow-root">
                  <ul 
                    v-if="cartStore.itemCount > 0"
                    class="-my-6 divide-y divide-gray-200"
                  >
                    <li 
                      v-for="item in cartStore.cartItems" 
                      :key="item.id"
                      class="py-6 flex"
                    >
                      <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <img 
                          :src="item.image" 
                          :alt="item.name"
                          class="w-full h-full object-center object-cover"
                        />
                      </div>
                      
                      <div class="ml-4 flex-1 flex flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>{{ item.name }}</h3>
                            <p class="ml-4">{{ formatPrice(item.price) }}</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">{{ item.category }}</p>
                        </div>
                        
                        <div class="flex-1 flex items-end justify-between text-sm">
                          <div class="flex items-center">
                            <button 
                              @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                              class="px-2 py-1 border rounded-l-md"
                              :disabled="item.quantity <= 1"
                            >
                              -
                            </button>
                            <span class="px-4 py-1 border-t border-b">
                              {{ item.quantity }}
                            </span>
                            <button 
                              @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                              class="px-2 py-1 border rounded-r-md"
                            >
                              +
                            </button>
                          </div>
                          
                          <div class="flex">
                            <button 
                              @click="cartStore.removeFromCart(item.id)"
                              class="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  
                  <div v-else class="text-center py-12">
                    <svg 
                      class="mx-auto h-12 w-12 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="1" 
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-10 0a2 2 0 100 4 2 2 0 000-4zm8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">Votre panier est vide</h3>
                    <p class="mt-1 text-sm text-gray-500">Commencez par ajouter des articles à votre panier.</p>
                    <div class="mt-6">
                      <button
                        @click="cartStore.toggleCart"
                        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Continuer vos achats
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="cartStore.itemCount > 0" class="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div class="flex justify-between text-base font-medium text-gray-900">
                <p>Sous-total</p>
                <p>{{ formatPrice(cartTotal) }}</p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">Frais de livraison et taxes calculés à la caisse.</p>
              <div class="mt-6">
                <button
                  @click="goToCheckout"
                  class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Commander
                </button>
              </div>
              <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  ou
                  <button
                    type="button"
                    @click="cartStore.toggleCart"
                    class="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continuer vos achats<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>