<script setup>
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const updateQuantity = (item, quantity) => {
  if (quantity < 1) return;
  cartStore.updateQuantity(item.id, quantity);
};

const removeItem = (itemId) => {
  cartStore.removeFromCart(itemId);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};

const subtotal = cartStore.cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
</script>

<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
        Votre panier
      </h1>

      <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <!-- Liste des articles -->
        <div class="lg:col-span-7">
          <div v-if="cartStore.cartItems.length === 0" class="text-center py-12">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Votre panier est vide</h3>
            <p class="mt-1 text-sm text-gray-500">Commencez par ajouter des articles à votre panier.</p>
            <div class="mt-6">
              <button
                @click="router.push('/')"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span>Parcourir les produits</span>
              </button>
            </div>
          </div>

          <ul v-else role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
            <li v-for="item in cartStore.cartItems" :key="item.id" class="flex py-6 sm:py-10">
              <div class="flex-shrink-0">
                <img
                  :src="item.image || 'https://via.placeholder.com/150'"
                  :alt="item.name"
                  class="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                />
              </div>

              <div class="ml-4 flex-1 flex flex-col sm:ml-6">
                <div class="flex-1">
                  <h3 class="text-base font-medium text-gray-900">
                    {{ item.name }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">{{ item.category }}</p>
                  <p class="mt-1 text-sm font-medium text-gray-900">{{ formatPrice(item.price) }}</p>
                </div>

                <div class="mt-4 flex-1 flex items-end justify-between">
                  <div class="flex items-center">
                    <button
                      @click="updateQuantity(item, item.quantity - 1)"
                      class="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">Diminuer la quantité</span>
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span class="mx-2 text-gray-700">{{ item.quantity }}</span>
                    <button
                      @click="updateQuantity(item, item.quantity + 1)"
                      class="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">Augmenter la quantité</span>
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  <div class="flex">
                    <button
                      @click="removeItem(item.id)"
                      type="button"
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Récapitulatif de la commande -->
        <div v-if="cartStore.cartItems.length > 0" class="mt-10 lg:mt-0 lg:col-span-5">
          <div class="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
            <h2 class="text-lg font-medium text-gray-900">Récapitulatif de la commande</h2>

            <div class="mt-6">
              <div class="flex items-center justify-between text-base font-medium text-gray-900">
                <p>Sous-total</p>
                <p>{{ formatPrice(subtotal) }}</p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">Les frais d'expédition seront calculés à l'étape suivante.</p>

              <div class="mt-6">
                <button
                  @click="router.push('/checkout')"
                  class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Passer la commande
                </button>
              </div>

              <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  ou
                  <button
                    @click="router.push('/')"
                    class="text-indigo-600 font-medium hover:text-indigo-500"
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