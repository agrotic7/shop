import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import ProductList from '../views/ProductListView.vue';
import ProductDetail from '../views/ProductDetailView.vue';
import Cart from '../views/CartView.vue';
import Checkout from '../views/CheckoutView.vue';
import OrderConfirmation from '../views/OrderConfirmationView.vue';
import About from '../views/AboutView.vue';
import Contact from '../views/ContactView.vue';
import NotFound from '../views/NotFoundView.vue';

// Titre de l'application
const APP_TITLE = 'E-Shop';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Accueil' }
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductList,
    meta: { title: 'Nos produits' }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true,
    meta: { title: 'Détail du produit' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { title: 'Panier' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { title: 'Finaliser la commande' }
  },
  {
    path: '/order-confirmation',
    name: 'OrderConfirmation',
    component: OrderConfirmation,
    meta: { title: 'Confirmation de commande' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'À propos' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact' }
  },
  // 404 page
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: 'Page non trouvée' }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    // Faire défiler vers le haut lors du changement de route
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100 // Offset pour la barre de navigation fixe
      };
    }
    return { top: 0 };
  }
});

// Mettre à jour le titre de la page lors de la navigation
router.afterEach((to) => {
  const title = to.meta?.title ? `${to.meta.title} | ${APP_TITLE}` : APP_TITLE;
  document.title = title;
  
  // Envoyer un événement de suivi de page (pour Google Analytics ou autres)
  if (typeof window.gtag === 'function') {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: to.path,
      page_title: title
    });
  }
});

export default router;
