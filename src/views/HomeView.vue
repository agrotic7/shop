<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const featuredProducts = [
  {
    id: 1,
    name: 'Smartphone Haut de Gamme',
    price: 999.99,
    oldPrice: 1199.99,
    image: 'https://via.placeholder.com/300x300/007bff/ffffff?text=Smartphone',
    category: 'Électronique',
    rating: 4.5,
    reviewCount: 124
  },
  {
    id: 2,
    name: 'Casque Audio Sans Fil',
    price: 199.99,
    image: 'https://via.placeholder.com/300x300/28a745/ffffff?text=Casque',
    category: 'Audio',
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: 3,
    name: 'Montre Connectée',
    price: 249.99,
    oldPrice: 299.99,
    image: 'https://via.placeholder.com/300x300/ffc107/000000?text=Montre',
    category: 'Accessoires',
    rating: 4.3,
    reviewCount: 156
  },
  {
    id: 4,
    name: 'Enceinte Bluetooth',
    price: 129.99,
    image: 'https://via.placeholder.com/300x300/dc3545/ffffff?text=Enceinte',
    category: 'Audio',
    rating: 4.2,
    reviewCount: 67
  },
  {
    id: 5,
    name: 'Tablette Graphique',
    price: 349.99,
    image: 'https://via.placeholder.com/300x300/6f42c1/ffffff?text=Tablette',
    category: 'Informatique',
    rating: 4.8,
    reviewCount: 42
  },
  {
    id: 6,
    name: 'Drone HD',
    price: 459.99,
    oldPrice: 599.99,
    image: 'https://via.placeholder.com/300x300/17a2b8/ffffff?text=Drone',
    category: 'Photographie',
    rating: 4.6,
    reviewCount: 203
  },
  {
    id: 7,
    name: 'Disque Dur Externe 2To',
    price: 89.99,
    image: 'https://via.placeholder.com/300x300/6c757d/ffffff?text=Disque+Dur',
    category: 'Stockage',
    rating: 4.4,
    reviewCount: 178
  },
  {
    id: 8,
    name: 'Clavier Mécanique RGB',
    price: 129.99,
    image: 'https://via.placeholder.com/300x300/f8f9fa/000000?text=Clavier',
    category: 'Gaming',
    rating: 4.9,
    reviewCount: 231
  }
];

const categories = [
  { id: 1, name: 'Électronique', image: 'https://via.placeholder.com/200/007bff/ffffff?text=Électronique', itemCount: 428 },
  { id: 2, name: 'Informatique', image: 'https://via.placeholder.com/200/6f42c1/ffffff?text=Informatique', itemCount: 312 },
  { id: 3, name: 'Téléphonie', image: 'https://via.placeholder.com/200/17a2b8/ffffff?text=Téléphonie', itemCount: 195 },
  { id: 4, name: 'Audio', image: 'https://via.placeholder.com/200/28a745/ffffff?text=Audio', itemCount: 276 },
  { id: 5, name: 'Gaming', image: 'https://via.placeholder.com/200/dc3545/ffffff?text=Gaming', itemCount: 184 },
  { id: 6, name: 'Accessoires', image: 'https://via.placeholder.com/200/ffc107/000000?text=Accessoires', itemCount: 512 }
];

const testimonials = [
  {
    name: 'Marie Dupont',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    date: '15/07/2023',
    comment: 'Livraison rapide et produit conforme à la description. Je recommande vivement ce site pour vos achats en ligne.'
  },
  {
    name: 'Thomas Martin',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    date: '22/07/2023',
    comment: 'Service client réactif et professionnel. J\'ai eu un petit problème avec ma commande qui a été résolu rapidement.'
  },
  {
    name: 'Sophie Leroy',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    date: '05/08/2023',
    comment: 'Excellente expérience d\'achat. Les produits sont de qualité et les prix sont très compétitifs.'
  }
];

const brands = [
  {
    name: 'Samsung',
    logo: 'https://via.placeholder.com/150x60/000000/ffffff?text=Samsung'
  },
  {
    name: 'Apple',
    logo: 'https://via.placeholder.com/150x60/000000/ffffff?text=Apple'
  },
  {
    name: 'Sony',
    logo: 'https://via.placeholder.com/150x60/000000/ffffff?text=Sony'
  },
  {
    name: 'LG',
    logo: 'https://via.placeholder.com/150x60/000000/ffffff?text=LG'
  },
  {
    name: 'HP',
    logo: 'https://via.placeholder.com/150x60/000000/ffffff?text=HP'
  },
  {
    name: 'Dell',
    logo: 'https://via.placeholder.com/150x60/000000/ffffff?text=Dell'
  }
];

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'search',
      query: { q: searchQuery.value }
    });
  }
};

const addToCart = (product) => {
  console.log('Ajouter au panier', product);
};
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero-section bg-primary text-white py-4 py-md-5 mb-4">
      <div class="container py-3 py-md-5">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center">
            <h1 class="display-4 fw-bold mb-3">
              Bienvenue sur notre boutique en ligne
            </h1>
            <p class="lead mb-4 mb-md-5 px-2 px-md-0">
              Découvrez notre sélection de produits de qualité à des prix imbattables.
            </p>
            <div class="row justify-content-center">
              <div class="col-12 col-md-10 col-lg-8">
                <div class="search-container shadow">
                  <div class="input-group">
                    <input
                      v-model="searchQuery"
                      @keyup.enter="handleSearch"
                      type="text"
                      class="form-control form-control-lg border-0"
                      placeholder="Rechercher un produit..."
                      aria-label="Rechercher un produit"
                      style="height: 56px;"
                    >
                    <button 
                      @click="handleSearch"
                      class="btn btn-light d-flex align-items-center px-4"
                      type="button"
                      style="height: 56px;"
                    >
                      <i class="bi bi-search fs-5 me-2"></i>
                      <span>Rechercher</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Categories -->
    <section class="categories-section py-4 py-md-5 bg-white">
      <div class="container">
        <div class="section-header text-center mb-4 mb-md-5">
          <h2 class="display-6 fw-bold mb-3">Nos Catégories</h2>
          <p class="text-muted mb-0">Découvrez nos gammes de produits</p>
        </div>
        
        <div class="row g-3 g-md-4">
          <div 
            v-for="category in categories" 
            :key="category.id" 
            class="col-6 col-sm-4 col-md-3 col-lg-2"
          >
            <div class="category-card h-100 text-center transition-all">
              <div class="category-img-container position-relative mb-3">
                <div class="category-bg"></div>
                <img
                  :src="category.image"
                  :alt="category.name"
                  class="img-fluid"
                />
              </div>
              <h3 class="h6 fw-semibold mb-1">
                <router-link 
                  :to="`/category/${category.id}`" 
                  class="text-decoration-none text-dark stretched-link"
                >
                  {{ category.name }}
                </router-link>
              </h3>
              <span class="badge bg-light text-primary small fw-normal">
                {{ category.itemCount }} articles
              </span>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-4 mt-md-5">
          <router-link 
            to="/categories" 
            class="btn btn-outline-primary px-4"
          >
            Voir toutes les catégories <i class="bi bi-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="products-section py-5 bg-light">
      <div class="container">
        <div class="section-header text-center mb-4 mb-md-5">
          <h2 class="display-6 fw-bold mb-2">Produits Populaires</h2>
          <p class="text-muted mb-0">Découvrez nos meilleures ventes</p>
        </div>
        
        <div class="row g-3 g-md-4">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id" 
            class="col-6 col-md-4 col-lg-3"
          >
            <div class="product-card h-100 position-relative bg-white rounded-3 overflow-hidden shadow-sm transition-all">
              <!-- Product Badge -->
              <div class="position-absolute top-2 end-2 z-1">
                <span class="badge bg-danger px-2 py-1">Nouveau</span>
              </div>
              
              <!-- Product Image -->
              <div class="product-image-container position-relative pt-3 px-3">
                <div class="product-bg"></div>
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="img-fluid d-block mx-auto"
                  style="height: 180px; width: auto; object-fit: contain;"
                >
                <!-- Quick Actions -->
                <div class="product-actions position-absolute w-100 px-3 bottom-0 start-0">
                  <button 
                    @click="addToCart(product)"
                    class="btn btn-primary w-100 rounded-pill py-2 fw-medium"
                  >
                    <i class="bi bi-cart-plus me-2"></i> Ajouter
                  </button>
                </div>
              </div>
              
              <!-- Product Details -->
              <div class="p-3 pt-2">
                <!-- Category -->
                <div class="mb-2">
                  <span class="badge bg-light text-primary fw-normal">{{ product.category }}</span>
                </div>
                
                <!-- Title -->
                <h3 class="h6 mb-2">
                  <router-link 
                    :to="`/product/${product.id}`" 
                    class="text-decoration-none text-dark product-title"
                  >
                    {{ product.name }}
                  </router-link>
                </h3>
                
                <!-- Rating -->
                <div class="d-flex align-items-center mb-2">
                  <div class="text-warning me-2">
                    <i 
                      v-for="i in 5" 
                      :key="i" 
                      :class="i <= Math.round(product.rating) ? 'bi bi-star-fill' : 'bi bi-star'"
                      style="font-size: 0.8rem;"
                    ></i>
                  </div>
                  <small class="text-muted">({{ product.reviewCount }})</small>
                </div>
                
                <!-- Price & Add to Cart -->
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <span class="h5 fw-bold text-primary mb-0">{{ product.price.toFixed(2) }} €</span>
                    <small class="text-decoration-line-through text-muted ms-2" v-if="product.oldPrice">
                      {{ product.oldPrice.toFixed(2) }} €
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- CTA Section -->
        <div class="text-center mt-5">
          <router-link 
            to="/products"
            class="btn btn-primary btn-lg px-4 rounded-pill"
          >
            Voir tous les produits <i class="bi bi-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Promo Banner -->
    <section class="promo-banner py-5 bg-dark text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h2 class="display-5 fw-bold mb-3">Profitez de -30% sur votre première commande</h2>
            <p class="lead mb-4">Inscrivez-vous dès maintenant et bénéficiez d'une réduction exceptionnelle sur votre premier achat.</p>
            <button class="btn btn-primary btn-lg px-4">
              S'inscrire maintenant <i class="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
          <div class="col-lg-6 text-center">
            <img 
              src="https://via.placeholder.com/600x400/343a40/6c757d?text=Promotion+Spéciale" 
              alt="Promotion spéciale" 
              class="img-fluid rounded-3 shadow"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section py-5 bg-light">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="display-6 fw-bold mb-2">Ce que disent nos clients</h2>
          <p class="text-muted">Découvrez les avis de nos clients satisfaits</p>
        </div>
        
        <div class="row g-4">
          <div class="col-md-4" v-for="(testimonial, index) in testimonials" :key="index">
            <div class="testimonial-card h-100 p-4 bg-white rounded-3 shadow-sm">
              <div class="d-flex align-items-center mb-3">
                <img 
                  :src="testimonial.avatar" 
                  :alt="testimonial.name"
                  class="rounded-circle me-3"
                  width="60"
                  height="60"
                >
                <div>
                  <h5 class="mb-0">{{ testimonial.name }}</h5>
                  <div class="text-warning mb-1">
                    <i 
                      v-for="i in 5" 
                      :key="i" 
                      :class="i <= testimonial.rating ? 'bi bi-star-fill' : 'bi bi-star'"
                    ></i>
                  </div>
                  <small class="text-muted">{{ testimonial.date }}</small>
                </div>
              </div>
              <p class="mb-0">"{{ testimonial.comment }}"</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brands -->
    <section class="brands-section py-5 bg-white">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="h4 fw-bold text-uppercase text-muted mb-1">Ils nous font confiance</h2>
          <p class="text-muted">Nos marques partenaires</p>
        </div>
        
        <div class="row g-4 align-items-center justify-content-center">
          <div class="col-6 col-sm-4 col-md-2" v-for="(brand, index) in brands" :key="index">
            <div class="brand-logo p-3 d-flex align-items-center justify-content-center">
              <img 
                :src="brand.logo" 
                :alt="brand.name" 
                class="img-fluid"
                style="filter: grayscale(100%) opacity(60%); transition: all 0.3s ease;"
                @mouseover="$event.target.style.filter = 'grayscale(0%) opacity(100%)'"
                @mouseleave="$event.target.style.filter = 'grayscale(100%) opacity(60%)'"
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  @apply flex flex-col min-h-screen;
}
</style>
