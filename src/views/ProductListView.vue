<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();

// États
const isLoading = ref(true);
const searchQuery = ref(route.query.q || '');
const selectedCategory = ref(route.query.category || 'all');
const sortBy = ref(route.query.sort || 'featured');
const currentPage = ref(parseInt(route.query.page) || 1);
const itemsPerPage = 12;

// Données des produits (à remplacer par un appel API)
const products = ref([
  {
    id: 1,
    name: 'Smartphone Haut de Gamme Pro Max',
    price: 1299.99,
    oldPrice: 1499.99,
    image: 'https://via.placeholder.com/300x300/007bff/ffffff?text=Smartphone',
    category: 'Électronique',
    rating: 4.7,
    reviewCount: 248,
    inStock: true,
    isNew: true,
    isFeatured: true,
    brand: 'TechMaster',
    tags: ['Nouveauté', 'Meilleure vente', 'Promo']
  },
  {
    id: 2,
    name: 'Écouteurs Sans Fil Pro',
    price: 249.99,
    image: 'https://via.placeholder.com/300x300/6c757d/ffffff?text=Écouteurs',
    category: 'Audio',
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    isFeatured: true,
    brand: 'SoundPro',
    tags: ['Sans fil', 'Réduction de bruit']
  },
  // Ajouter plus de produits de démonstration...
  {
    id: 3,
    name: 'Montre Connectée Élégance',
    price: 349.99,
    oldPrice: 399.99,
    image: 'https://via.placeholder.com/300x300/17a2b8/ffffff?text=Montre',
    category: 'Accessoires',
    rating: 4.8,
    reviewCount: 321,
    inStock: true,
    isNew: true,
    brand: 'TimeWear',
    tags: ['Nouveauté']
  },
  {
    id: 4,
    name: 'Tablette Graphique Pro',
    price: 599.99,
    image: 'https://via.placeholder.com/300x300/6f42c1/ffffff?text=Tablette',
    category: 'Informatique',
    rating: 4.9,
    reviewCount: 189,
    inStock: true,
    isFeatured: true,
    brand: 'DrawTech',
    tags: ['Meilleure vente', 'Professionnel']
  },
  {
    id: 5,
    name: 'Enceinte Bluetooth Portable',
    price: 129.99,
    image: 'https://via.placeholder.com/300x300/fd7e14/ffffff?text=Enceinte',
    category: 'Audio',
    rating: 4.3,
    reviewCount: 87,
    inStock: true,
    brand: 'BoomSound',
    tags: ['Étanche', 'Basse puissante']
  },
  {
    id: 6,
    name: 'Casque VR Immersif Pro',
    price: 499.99,
    oldPrice: 599.99,
    image: 'https://via.placeholder.com/300x300/20c997/ffffff?text=VR',
    category: 'Électronique',
    rating: 4.6,
    reviewCount: 215,
    inStock: true,
    isFeatured: true,
    brand: 'VRTech',
    tags: ['Promo', 'Nouveauté']
  },
  {
    id: 7,
    name: 'Clavier Mécanique Gaming',
    price: 149.99,
    image: 'https://via.placeholder.com/300x300/0d6efd/ffffff?text=Clavier',
    category: 'Informatique',
    rating: 4.7,
    reviewCount: 178,
    inStock: true,
    brand: 'GameMaster',
    tags: ['RGB', 'Rétroéclairé']
  },
  {
    id: 8,
    name: 'Souris Ergonomique Pro',
    price: 89.99,
    oldPrice: 109.99,
    image: 'https://via.placeholder.com/300x300/6f42c1/ffffff?text=Souris',
    category: 'Informatique',
    rating: 4.4,
    reviewCount: 132,
    inStock: true,
    brand: 'PrecisionTech',
    tags: ['Sans fil', 'Ergonomique']
  },
  {
    id: 9,
    name: 'Disque Dur Externe 2To',
    price: 129.99,
    image: 'https://via.placeholder.com/300x300/6c757d/ffffff?text=Disque+Dur',
    category: 'Stockage',
    rating: 4.8,
    reviewCount: 421,
    inStock: true,
    isFeatured: true,
    brand: 'DataSafe',
    tags: ['Portable', 'Haute capacité']
  },
  {
    id: 10,
    name: 'Écran 27" 4K',
    price: 349.99,
    oldPrice: 399.99,
    image: 'https://via.placeholder.com/300x300/198754/ffffff?text=Écran',
    category: 'Informatique',
    rating: 4.9,
    reviewCount: 289,
    inStock: true,
    brand: 'ViewPlus',
    tags: ['4K', 'HDR']
  },
  {
    id: 11,
    name: 'Batterie Externe 20000mAh',
    price: 59.99,
    image: 'https://via.placeholder.com/300x300/ffc107/000000?text=Batterie',
    category: 'Accessoires',
    rating: 4.2,
    reviewCount: 156,
    inStock: true,
    brand: 'PowerUp',
    tags: ['Haute capacité', 'Charge rapide']
  },
  {
    id: 12,
    name: 'Haut-parleur Intelligent',
    price: 199.99,
    oldPrice: 249.99,
    image: 'https://via.placeholder.com/300x300/dc3545/ffffff?text=Haut-parleur',
    category: 'Audio',
    rating: 4.6,
    reviewCount: 198,
    inStock: true,
    isFeatured: true,
    brand: 'SoundPlus',
    tags: ['Assistant vocal', 'Qualité audio']
  }
]);

// Catégories disponibles
const categories = computed(() => {
  const cats = ['Tous les produits', ...new Set(products.value.map(p => p.category))];
  return cats;
});

// Produits filtrés et triés
const filteredProducts = computed(() => {
  let result = [...products.value];
  
  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query) ||
      product.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // Filtre par catégorie
  if (selectedCategory.value && selectedCategory.value !== 'all') {
    result = result.filter(product => product.category === selectedCategory.value);
  }
  
  // Tri
  switch (sortBy.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      // Pour l'exemple, on utilise l'ID comme proxy pour la date d'ajout
      result.sort((a, b) => b.id - a.id);
      break;
    case 'featured':
    default:
      result = result.filter(p => p.isFeatured);
      break;
  }
  
  return result;
});

// Pagination
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => 
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);

// Fonctions utilitaires
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR' 
  }).format(price);
};

const calculateDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

// Gestion des interactions
const addToCart = (product) => {
  cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
  });
  
  // Afficher une notification (à implémenter)
  alert(`${product.name} a été ajouté au panier !`);
};

const navigateToProduct = (productId) => {
  router.push({ name: 'product-detail', params: { id: productId } });
};

const updateFilters = () => {
  // Mettre à jour l'URL avec les filtres actuels
  const query = {};
  if (searchQuery.value) query.q = searchQuery.value;
  if (selectedCategory.value !== 'all') query.category = selectedCategory.value;
  if (sortBy.value !== 'featured') query.sort = sortBy.value;
  if (currentPage.value > 1) query.page = currentPage.value;
  
  router.replace({
    query
  });
};

// Initialisation
onMounted(() => {
  // Simuler un chargement
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
  
  // Appliquer les filtres depuis l'URL
  if (route.query.q) searchQuery.value = route.query.q;
  if (route.query.category) selectedCategory.value = route.query.category;
  if (route.query.sort) sortBy.value = route.query.sort;
  if (route.query.page) currentPage.value = parseInt(route.query.page);
  
  // Mettre à jour les filtres si l'URL change
  router.afterEach((to) => {
    if (to.query.q !== searchQuery.value) searchQuery.value = to.query.q || '';
    if (to.query.category !== selectedCategory.value) selectedCategory.value = to.query.category || 'all';
    if (to.query.sort !== sortBy.value) sortBy.value = to.query.sort || 'featured';
    if (parseInt(to.query.page) !== currentPage.value) currentPage.value = parseInt(to.query.page) || 1;
  });
});

// Watchers
watch([searchQuery, selectedCategory, sortBy, currentPage], () => {
  updateFilters();  
});
</script>

<template>
  <div class="container py-4">
    <!-- En-tête avec recherche -->
    <div class="row mb-4">
      <div class="col-md-6 mb-3 mb-md-0">
        <h1 class="h3 mb-0">Notre catalogue</h1>
        <p class="text-muted">{{ filteredProducts.length }} produits trouvés</p>
      </div>
      <div class="col-md-6">
        <div class="input-group">
          <input
            v-model="searchQuery"
            type="search"
            class="form-control"
            placeholder="Rechercher un produit..."
            @keyup.enter="updateFilters"
          >
          <button class="btn btn-outline-secondary" type="button">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Filtres -->
      <div class="col-lg-3 mb-4">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="mb-0">Catégories</h5>
          </div>
          <div class="list-group list-group-flush">
            <button
              v-for="(category, index) in categories"
              :key="index"
              class="list-group-item list-group-item-action"
              :class="{ 'active': (selectedCategory === category || (index === 0 && selectedCategory === 'all')) }"
              @click="selectedCategory = index === 0 ? 'all' : category; currentPage = 1"
            >
              {{ category }}
              <span class="badge bg-primary rounded-pill float-end">
                {{ index === 0 ? products.length : products.filter(p => p.category === category).length }}
              </span>
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Trier par</h5>
          </div>
          <div class="card-body">
            <select v-model="sortBy" class="form-select" @change="currentPage = 1">
              <option value="featured">En vedette</option>
              <option value="newest">Nouveautés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Meilleures notes</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Liste des produits -->
      <div class="col-lg-9">
        <!-- Pagination en haut -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="text-muted small">
            Affichage de {{ Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length) }} à 
            {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} sur 
            {{ filteredProducts.length }} produits
          </div>
        </div>

        <!-- Produits -->
        <div class="row">
          <div v-for="product in paginatedProducts" :key="product.id" class="col-6 col-md-4 col-lg-4 mb-4">
            <div class="card h-100">
              <!-- Badges -->
              <div class="position-absolute p-2">
                <span v-if="product.isNew" class="badge bg-success me-1">Nouveau</span>
                <span v-if="product.oldPrice" class="badge bg-danger">
                  -{{ calculateDiscount(product.price, product.oldPrice) }}%
                </span>
              </div>

              <!-- Image -->
              <img 
                :src="product.image" 
                :alt="product.name" 
                class="card-img-top"
                @click="navigateToProduct(product.id)"
                style="cursor: pointer;"
              >

              <!-- Détails -->
              <div class="card-body">
                <h5 class="card-title">
                  <a href="#" @click.prevent="navigateToProduct(product.id)" class="text-decoration-none text-dark">
                    {{ product.name }}
                  </a>
                </h5>
                
                <!-- Note -->
                <div class="mb-2">
                  <i 
                    v-for="i in 5" 
                    :key="i"
                    class="bi"
                    :class="i <= Math.round(product.rating) ? 'bi-star-fill text-warning' : 'bi-star text-muted'"
                  ></i>
                  <small class="text-muted ms-1">({{ product.reviewCount }})</small>
                </div>
                
                <!-- Prix -->
                <div class="d-flex align-items-center mb-2">
                  <span class="h5 mb-0 me-2">{{ formatPrice(product.price) }}</span>
                  <span v-if="product.oldPrice" class="text-muted text-decoration-line-through small">
                    {{ formatPrice(product.oldPrice) }}
                  </span>
                </div>

                <!-- Bouton d'ajout -->
                <button 
                  class="btn btn-primary w-100"
                  @click="addToCart(product)"
                >
                  <i class="bi bi-cart-plus me-1"></i> Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <nav v-if="totalPages > 1" class="mt-4">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <button 
                class="page-link" 
                @click="currentPage--"
                :disabled="currentPage === 1"
              >
                Précédent
              </button>
            </li>
            
            <li 
              v-for="page in totalPages" 
              :key="page"
              class="page-item"
              :class="{ 'active': currentPage === page }"
            >
              <button 
                class="page-link"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
            </li>
            
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <button 
                class="page-link" 
                @click="currentPage++"
                :disabled="currentPage === totalPages"
              >
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
