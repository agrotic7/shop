<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const quantity = ref(1);
const selectedImage = ref(0);
const showSuccessModal = ref(false);
const showReviewForm = ref(false);

// Données du produit (à remplacer par un appel API)
const product = ref({
  id: 1,
  name: 'Smartphone Haut de Gamme Pro Max',
  price: 1299.99,
  oldPrice: 1499.99,
  description: 'Découvrez notre dernier smartphone haut de gamme avec écran AMOLED 6.7", processeur ultra-rapide et appareil photo professionnel. Profitez d\'une autonomie exceptionnelle et d\'un design élégant en verre et métal.',
  category: 'Électronique',
  rating: 4.7,
  reviewCount: 248,
  inStock: true,
  sku: 'SMARTPHONE-2023-001',
  brand: 'TechMaster',
  warranty: '24 mois',
  shippingInfo: 'Livraison gratuite sous 3-5 jours ouvrés',
  features: [
    'Écran AMOLED 6.7" 120Hz',
    'Processeur Octa-Core 3.2GHz',
    '12GB RAM + 256GB stockage',
    'Triple caméra 108MP + 12MP + 12MP',
    'Batterie 5000mAh charge rapide',
    'Résistance à l\'eau IP68'
  ],
  specifications: {
    'Écran': '6.7" AMOLED 120Hz',
    'Processeur': 'Octa-Core 3.2GHz',
    'Mémoire': '12GB RAM',
    'Stockage': '256GB',
    'Appareil photo': '108MP + 12MP + 12MP',
    'Batterie': '5000mAh',
    'Système d\'exploitation': 'Android 13',
    'Réseau': '5G, 4G LTE, Wi-Fi 6',
    'Connectivité': 'Bluetooth 5.2, NFC, USB-C',
    'Sécurité': 'Lecteur d\'empreinte sous écran, Reconnaissance faciale',
    'Dimensions': '160.8 x 78.1 x 7.7 mm',
    'Poids': '228g',
    'Couleurs disponibles': 'Noir, Blanc, Bleu, Vert'
  },
  images: [
    'https://via.placeholder.com/800x600/007bff/ffffff?text=Smartphone+Front',
    'https://via.placeholder.com/800x600/28a745/ffffff?text=Smartphone+Back',
    'https://via.placeholder.com/800x600/ffc107/000000?text=Smartphone+Side',
    'https://via.placeholder.com/800x600/dc3545/ffffff?text=Smartphone+Accessories'
  ],
  reviews: [
    {
      id: 1,
      author: 'Jean D.',
      rating: 5,
      title: 'Exceptionnel !',
      comment: 'Ce smartphone dépasse toutes mes attentes. La qualité d\'écran est incroyable et les performances sont au rendez-vous.',
      date: '2023-10-15T14:30:00Z'
    },
    {
      id: 2,
      author: 'Marie L.',
      rating: 4,
      title: 'Très bon produit',
      comment: 'Globalement très satisfaite. La batterie tient bien la charge et l\'appareil photo est de qualité. Petit bémol sur le poids un peu élevé.',
      date: '2023-10-10T09:15:00Z'
    },
    {
      id: 3,
      author: 'Thomas P.',
      rating: 5,
      title: 'Meilleur achat de l\'année',
      comment: 'Je ne regrette pas mon achat. La fluidité est impressionnante et la qualité de construction est au top.',
      date: '2023-10-05T16:45:00Z'
    }
  ]
});

// Données du formulaire d'avis
const newReview = ref({
  rating: 5,
  title: '',
  comment: '',
  author: 'Utilisateur Anonyme',
  date: new Date()
});

// Produits similaires
const relatedProducts = ref([
  {
    id: 2,
    name: 'Écouteurs Sans Fil Pro',
    price: 249.99,
    image: 'https://via.placeholder.com/300x300/6c757d/ffffff?text=Écouteurs',
    category: 'Électronique'
  },
  {
    id: 3,
    name: 'Montre Connectée Élégance',
    price: 349.99,
    image: 'https://via.placeholder.com/300x300/17a2b8/ffffff?text=Montre',
    category: 'Électronique'
  },
  {
    id: 4,
    name: 'Tablette Graphique Pro',
    price: 599.99,
    image: 'https://via.placeholder.com/300x300/6f42c1/ffffff?text=Tablette',
    category: 'Électronique'
  },
  {
    id: 5,
    name: 'Enceinte Bluetooth Portable',
    price: 129.99,
    image: 'https://via.placeholder.com/300x300/fd7e14/ffffff?text=Enceinte',
    category: 'Électronique'
  }
]);

// Formater la date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Soumettre un avis
const submitReview = () => {
  const review = {
    ...newReview.value,
    id: Date.now(),
    date: new Date().toISOString()
  };
  
  // Ajouter l'avis au produit
  product.value.reviews.unshift(review);
  
  // Mettre à jour la note moyenne
  updateProductRating();
  
  // Réinitialiser le formulaire
  newReview.value = {
    rating: 5,
    title: '',
    comment: '',
    author: 'Utilisateur Anonyme',
    date: new Date()
  };
  
  showReviewForm.value = false;
  
  // Afficher un message de succès
  alert('Merci pour votre avis !');
};

// Mettre à jour la note moyenne du produit
const updateProductRating = () => {
  if (!product.value.reviews || product.value.reviews.length === 0) {
    product.value.rating = 0;
    return;
  }
  
  const total = product.value.reviews.reduce((sum, review) => sum + review.rating, 0);
  product.value.rating = parseFloat((total / product.value.reviews.length).toFixed(1));
  product.value.reviewCount = product.value.reviews.length;
};

// Charger les détails du produit
const loadProduct = () => {
  // Ici, vous pourriez faire un appel API pour charger les détails du produit
  // Pour l'instant, nous utilisons les données statiques
  console.log(`Chargement des détails du produit ${route.params.id}`);
};

// Initialiser les onglets Bootstrap
const initTabs = () => {
  const tabEl = document.querySelector('#productTabs button[data-bs-toggle="tab"]');
  if (tabEl && typeof bootstrap !== 'undefined') {
    new bootstrap.Tab(tabEl);
  }
};

// Calculer la remise
const discount = computed(() => {
  if (!product.value.oldPrice || product.value.oldPrice <= product.value.price) {
    return 0;
  }
  return Math.round(((product.value.oldPrice - product.value.price) / product.value.oldPrice) * 100);
});

// Ajouter au panier
const addToCart = () => {
  if (!product.value) return;
  
  cartStore.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.images && product.value.images.length > 0 
      ? product.value.images[0] 
      : product.value.image,
    quantity: quantity.value
  });
  
  showSuccessModal.value = true;
};

// Acheter maintenant
const buyNow = () => {
  addToCart();
  router.push('/checkout');
};

// Sélectionner une image
const selectImage = (index) => {
  selectedImage.value = index;
};

// Initialisation du composant
onMounted(() => {
  loadProduct();
  initTabs();
  updateProductRating();
});
</script>

<template>
  <div class="product-detail">
    <!-- Breadcrumb -->
    <nav aria-label="Breadcrumb" class="bg-gray-50 py-3 px-4">
      <div class="container">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <router-link to="/" class="text-decoration-none">Accueil</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="`/category/${product.category.toLowerCase()}`" class="text-decoration-none">
              {{ product.category }}
            </router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
        </ol>
      </div>
    </nav>

    <div class="container py-4 py-lg-5">
      <div class="row g-4">
        <!-- Galerie d'images -->
        <div class="col-lg-7">
          <div class="product-gallery">
            <div class="main-image mb-3">
              <img 
                :src="product.images[selectedImage]" 
                :alt="product.name" 
                class="img-fluid rounded-3 w-100"
              />
              <div v-if="discount > 0" class="discount-badge">
                -{{ discount }}%
              </div>
            </div>
            
            <div class="thumbnail-container d-flex gap-2">
              <button 
                v-for="(image, index) in product.images" 
                :key="index"
                @click="selectImage(index)"
                class="thumbnail-btn p-0 border-0 bg-transparent"
                :class="{ 'active': selectedImage === index }"
              >
                <img 
                  :src="image" 
                  :alt="`Vue ${index + 1} de ${product.name}`"
                  class="img-thumbnail"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Détails du produit -->
        <div class="col-lg-5">
          <div class="product-info">
            <!-- En-tête -->
            <div class="mb-4">
              <span class="badge bg-primary mb-2">{{ product.brand }}</span>
              <h1 class="h2 fw-bold mb-2">{{ product.name }}</h1>
              
              <div class="d-flex align-items-center mb-3">
                <div class="rating-stars me-2">
                  <i 
                    v-for="i in 5" 
                    :key="i" 
                    :class="i <= Math.round(product.rating) ? 'bi bi-star-fill text-warning' : 'bi bi-star text-secondary'"
                  ></i>
                </div>
                <small class="text-muted">
                  {{ product.rating }} ({{ product.reviewCount }} avis)
                </small>
                <span class="mx-2 text-muted">|</span>
                <span :class="{ 'text-success': product.inStock, 'text-danger': !product.inStock }">
                  <i class="bi bi-circle-fill small me-1"></i>
                  {{ product.inStock ? 'En stock' : 'Rupture de stock' }}
                </span>
              </div>
              
              <div class="d-flex align-items-center mb-4">
                <p class="h3 fw-bold text-primary mb-0 me-2">
                  {{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price) }}
                </p>
                <s class="text-muted" v-if="product.oldPrice">
                  {{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.oldPrice) }}
                </s>
                <span v-if="discount > 0" class="badge bg-danger ms-2">
                  Économisez {{ discount }}%
                </span>
              </div>
              
              <p class="text-muted mb-4">
                <i class="bi bi-truck me-1"></i>
                Livraison: {{ product.shippingInfo || 'Livraison gratuite' }}
              </p>
            </div>
            
            <!-- Sélecteur de quantité -->
            <div class="mb-4">
              <label class="form-label fw-semibold">Quantité :</label>
              <div class="quantity-selector d-inline-flex align-items-center border rounded-3 overflow-hidden">
                <button 
                  @click="quantity > 1 ? quantity-- : null"
                  class="btn btn-outline-secondary rounded-0 border-0"
                  :class="{ 'opacity-50': quantity <= 1 }"
                  :disabled="quantity <= 1"
                >
                  <i class="bi bi-dash-lg"></i>
                </button>
                <span class="px-3">{{ quantity }}</span>
                <button 
                  @click="quantity++"
                  class="btn btn-outline-secondary rounded-0 border-0"
                >
                  <i class="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>
            
            <!-- Boutons d'action -->
            <div class="d-grid gap-2 mb-4">
              <button 
                @click="addToCart"
                class="btn btn-primary btn-lg py-3 fw-semibold"
                :disabled="!product.inStock"
              >
                <i class="bi bi-cart-plus me-2"></i>
                Ajouter au panier
              </button>
              <button 
                @click="buyNow"
                class="btn btn-outline-primary btn-lg py-3 fw-semibold"
                :disabled="!product.inStock"
              >
                Acheter maintenant
              </button>
            </div>
            
            <!-- Garantie et livraison -->
            <div class="border-top border-bottom py-3 mb-4">
              <div class="d-flex align-items-center mb-2">
                <i class="bi bi-shield-check text-primary me-2"></i>
                <span>Garantie: {{ product.warranty || '2 ans' }}</span>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-truck text-primary me-2"></i>
                <span>Livraison gratuite à partir de 50€ d'achat</span>
              </div>
            </div>
            
            <!-- Partage -->
            <div class="d-flex align-items-center">
              <span class="me-2">Partager :</span>
              <div class="social-share d-flex gap-2">
                <a href="#" class="text-dark" aria-label="Partager sur Facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" class="text-dark" aria-label="Partager sur Twitter"><i class="bi bi-twitter"></i></a>
                <a href="#" class="text-dark" aria-label="Partager sur Instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" class="text-dark" aria-label="Partager sur WhatsApp"><i class="bi bi-whatsapp"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Détails et spécifications -->
      <div class="row mt-5">
        <div class="col-12">
          <ul class="nav nav-tabs" id="productTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab">
                Description
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="specs-tab" data-bs-toggle="tab" data-bs-target="#specs" type="button" role="tab">
                Caractéristiques
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab">
                Avis ({{ product.reviewCount }})
              </button>
            </li>
          </ul>
          
          <div class="tab-content p-4 border border-top-0 rounded-bottom" id="productTabsContent">
            <!-- Description -->
            <div class="tab-pane fade show active" id="description" role="tabpanel">
              <h3 class="h5 fw-bold mb-3">Description du produit</h3>
              <div class="product-description">
                <p>{{ product.description }}</p>
                
                <h4 class="h6 fw-bold mt-4">Caractéristiques principales :</h4>
                <ul class="list-unstyled">
                  <li v-for="(feature, index) in product.features" :key="index" class="mb-2">
                    <i class="bi bi-check2 text-primary me-2"></i>{{ feature }}
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Spécifications -->
            <div class="tab-pane fade" id="specs" role="tabpanel">
              <h3 class="h5 fw-bold mb-3">Fiche technique</h3>
              <div class="table-responsive">
                <table class="table table-striped">
                  <tbody>
                    <tr v-for="(value, key) in product.specifications" :key="key">
                      <th class="w-25">{{ key }}</th>
                      <td>{{ value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Avis -->
            <div class="tab-pane fade" id="reviews" role="tabpanel">
              <div class="row">
                <div class="col-md-4 text-center mb-4">
                  <div class="bg-light p-4 rounded-3">
                    <h2 class="display-4 fw-bold text-primary">{{ product.rating }}/5</h2>
                    <div class="rating-stars mb-2">
                      <i 
                        v-for="i in 5" 
                        :key="i" 
                        :class="i <= Math.round(product.rating) ? 'bi bi-star-fill text-warning' : 'bi bi-star text-secondary'"
                      ></i>
                    </div>
                    <p class="text-muted">Basé sur {{ product.reviewCount }} avis</p>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="h5 fw-bold mb-0">Commentaires des clients</h3>
                    <button class="btn btn-primary btn-sm" @click="showReviewForm = !showReviewForm">
                      <i class="bi bi-pencil-square me-1"></i>Laisser un avis
                    </button>
                  </div>
                  
                  <!-- Formulaire d'avis -->
                  <div v-if="showReviewForm" class="card mb-4">
                    <div class="card-body">
                      <h4 class="h6 fw-bold mb-3">Donnez votre avis</h4>
                      <form @submit.prevent="submitReview">
                        <div class="mb-3">
                          <label class="form-label">Note</label>
                          <div class="rating-input">
                            <i 
                              v-for="i in 5" 
                              :key="i" 
                              @click="newReview.rating = i"
                              :class="i <= newReview.rating ? 'bi bi-star-fill text-warning' : 'bi bi-star text-secondary'"
                              style="cursor: pointer; font-size: 1.5rem;"
                            ></i>
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="reviewTitle" class="form-label">Titre</label>
                          <input type="text" class="form-control" id="reviewTitle" v-model="newReview.title" required>
                        </div>
                        <div class="mb-3">
                          <label for="reviewComment" class="form-label">Commentaire</label>
                          <textarea class="form-control" id="reviewComment" rows="3" v-model="newReview.comment" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Envoyer l'avis</button>
                      </form>
                    </div>
                  </div>
                  
                  <!-- Liste des avis -->
                  <div v-if="product.reviews && product.reviews.length > 0">
                    <div v-for="(review, index) in product.reviews" :key="index" class="review-item mb-4 pb-4 border-bottom">
                      <div class="d-flex justify-content-between mb-2">
                        <h5 class="mb-0">{{ review.author }}</h5>
                        <div class="text-muted small">
                          {{ formatDate(review.date) }}
                        </div>
                      </div>
                      <div class="rating-stars mb-2">
                        <i 
                          v-for="i in 5" 
                          :key="i" 
                          :class="i <= review.rating ? 'bi bi-star-fill text-warning' : 'bi bi-star text-secondary'"
                        ></i>
                      </div>
                      <h6 class="fw-bold">{{ review.title }}</h6>
                      <p class="mb-0">{{ review.comment }}</p>
                    </div>
                  </div>
                  <div v-else class="text-center py-4">
                    <p class="text-muted">Aucun avis pour le moment. Soyez le premier à laisser votre avis !</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Produits similaires -->
      <div class="related-products mt-5">
        <h2 class="h4 fw-bold mb-4">Vous pourriez aussi aimer</h2>
        <div class="row g-3">
          <div class="col-6 col-md-4 col-lg-3" v-for="item in relatedProducts" :key="item.id">
            <div class="card h-100">
              <img :src="item.image" class="card-img-top p-3" :alt="item.name" style="height: 180px; object-fit: contain;">
              <div class="card-body">
                <h5 class="card-title h6 fw-bold line-clamp-2">{{ item.name }}</h5>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <span class="text-primary fw-bold">{{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price) }}</span>
                  <button class="btn btn-sm btn-outline-primary" @click="$router.push(`/product/${item.id}`)">
                    <i class="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>