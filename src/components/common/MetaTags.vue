<script setup>
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: 'E-Shop - Votre boutique en ligne préférée'
  },
  description: {
    type: String,
    default: 'Découvrez notre sélection de produits de qualité à des prix imbattables. Livraison rapide et sécurisée.'
  },
  image: {
    type: String,
    default: '/images/og-image.jpg'
  },
  type: {
    type: String,
    default: 'website'
  },
  keywords: {
    type: String,
    default: 'ecommerce, boutique en ligne, achats en ligne, produits, shopping'
  },
  canonical: {
    type: String,
    default: ''
  }
});

const route = useRoute();
const siteUrl = computed(() => {
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  return props.canonical || `${baseUrl}${route.fullPath}`;
});

const fullImageUrl = computed(() => {
  if (!props.image) return '';
  if (props.image.startsWith('http')) return props.image;
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  return `${baseUrl}${props.image.startsWith('/') ? '' : '/'}${props.image}`;
});

// Configuration des métadonnées avec vueuse/head
useHead({
  title: computed(() => props.title),
  meta: [
    // Meta standards
    { name: 'description', content: computed(() => props.description) },
    { name: 'keywords', content: computed(() => props.keywords) },
    
    // Open Graph / Facebook
    { property: 'og:type', content: computed(() => props.type) },
    { property: 'og:url', content: siteUrl },
    { property: 'og:title', content: computed(() => props.title) },
    { property: 'og:description', content: computed(() => props.description) },
    { property: 'og:image', content: fullImageUrl },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: siteUrl },
    { name: 'twitter:title', content: computed(() => props.title) },
    { name: 'twitter:description', content: computed(() => props.description) },
    { name: 'twitter:image', content: fullImageUrl },
    
    // Autres
    { name: 'robots', content: 'index, follow' },
    { name: 'theme-color', content: '#0d6efd' }
  ],
  link: [
    { rel: 'canonical', href: siteUrl }
  ],
  htmlAttrs: {
    lang: 'fr'
  }
});
</script>

<template>
  <!-- Ce composant ne rend rien dans le DOM -->
  <slot />
</template>
