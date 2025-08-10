import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'

// Importez les styles Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Importez les icônes Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// Importez les styles personnalisés
import './assets/main.css'

// Créer l'application
const app = createApp(App)
const head = createHead()

// Utiliser les plugins
app.use(createPinia())
app.use(router)
app.use(head)

// Monter l'application
app.mount('#app')

// Configuration globale
app.config.globalProperties.$filters = {
  formatPrice(value) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(value)
  },
  truncate(text, length = 100) {
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
  }
}
