<script setup>
import { ref } from 'vue';
import { inject } from 'vue';

const showToast = inject('showToast');
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isLoading = ref(false);
const errors = ref({});

const validateForm = () => {
  let isValid = true;
  errors.value = {};
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Le nom est requis';
    isValid = false;
  }
  
  if (!form.value.email) {
    errors.value.email = 'L\'email est requis';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Veuillez entrer un email valide';
    isValid = false;
  }
  
  if (!form.value.subject.trim()) {
    errors.value.subject = 'Le sujet est requis';
    isValid = false;
  }
  
  if (!form.value.message.trim()) {
    errors.value.message = 'Le message est requis';
    isValid = false;
  }
  
  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;
  
  isLoading.value = true;
  
  try {
    // Simuler un envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    showToast('Votre message a été envoyé avec succès !', 'success');
    form.value = { name: '', email: '', subject: '', message: '' };
  } catch (error) {
    showToast('Une erreur est survenue lors de l\'envoi du message', 'danger');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4 p-md-5">
            <h1 class="text-center mb-5">Contactez-nous</h1>
            
            <div class="row">
              <div class="col-lg-6 mb-5 mb-lg-0">
                <div class="mb-4">
                  <h2 class="h4 mb-4">Informations de contact</h2>
                  <p class="text-muted mb-4">
                    Notre équipe est là pour répondre à toutes vos questions. N'hésitez pas à nous contacter par téléphone, email ou via le formulaire de contact.
                  </p>
                  
                  <div class="d-flex mb-3">
                    <div class="icon-lg bg-primary bg-opacity-10 text-primary rounded-3 me-3">
                      <i class="bi bi-geo-alt"></i>
                    </div>
                    <div>
                      <h3 class="h6 mb-1">Adresse</h3>
                      <p class="text-muted mb-0">123 Rue du Commerce, 75001 Paris, France</p>
                    </div>
                  </div>
                  
                  <div class="d-flex mb-3">
                    <div class="icon-lg bg-primary bg-opacity-10 text-primary rounded-3 me-3">
                      <i class="bi bi-telephone"></i>
                    </div>
                    <div>
                      <h3 class="h6 mb-1">Téléphone</h3>
                      <p class="text-muted mb-0">
                        <a href="tel:+33123456789" class="text-decoration-none">+33 1 23 45 67 89</a>
                      </p>
                    </div>
                  </div>
                  
                  <div class="d-flex">
                    <div class="icon-lg bg-primary bg-opacity-10 text-primary rounded-3 me-3">
                      <i class="bi bi-envelope"></i>
                    </div>
                    <div>
                      <h3 class="h6 mb-1">Email</h3>
                      <p class="text-muted mb-0">
                        <a href="mailto:contact@example.com" class="text-decoration-none">contact@example.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 class="h4 mb-3">Heures d'ouverture</h2>
                  <ul class="list-unstyled">
                    <li class="d-flex justify-content-between py-2 border-bottom">
                      <span class="text-muted">Lundi - Vendredi</span>
                      <span class="fw-medium">9h00 - 18h00</span>
                    </li>
                    <li class="d-flex justify-content-between py-2 border-bottom">
                      <span class="text-muted">Samedi</span>
                      <span class="fw-medium">10h00 - 16h00</span>
                    </li>
                    <li class="d-flex justify-content-between py-2">
                      <span class="text-muted">Dimanche</span>
                      <span class="fw-medium">Fermé</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div class="col-lg-6">
                <div class="card border-0 shadow-sm h-100">
                  <div class="card-body p-4">
                    <h2 class="h4 mb-4">Envoyez-nous un message</h2>
                    
                    <form @submit.prevent="submitForm">
                      <div class="mb-3">
                        <label for="name" class="form-label">Nom complet <span class="text-danger">*</span></label>
                        <input 
                          type="text" 
                          class="form-control" 
                          id="name" 
                          v-model="form.name"
                          :class="{ 'is-invalid': errors.name }"
                          placeholder="Votre nom"
                        >
                        <div class="invalid-feedback" v-if="errors.name">
                          {{ errors.name }}
                        </div>
                      </div>
                      
                      <div class="mb-3">
                        <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                        <input 
                          type="email" 
                          class="form-control" 
                          id="email" 
                          v-model="form.email"
                          :class="{ 'is-invalid': errors.email }"
                          placeholder="votre@email.com"
                        >
                        <div class="invalid-feedback" v-if="errors.email">
                          {{ errors.email }}
                        </div>
                      </div>
                      
                      <div class="mb-3">
                        <label for="subject" class="form-label">Sujet <span class="text-danger">*</span></label>
                        <input 
                          type="text" 
                          class="form-control" 
                          id="subject" 
                          v-model="form.subject"
                          :class="{ 'is-invalid': errors.subject }"
                          placeholder="Sujet de votre message"
                        >
                        <div class="invalid-feedback" v-if="errors.subject">
                          {{ errors.subject }}
                        </div>
                      </div>
                      
                      <div class="mb-4">
                        <label for="message" class="form-label">Message <span class="text-danger">*</span></label>
                        <textarea 
                          class="form-control" 
                          id="message" 
                          rows="5" 
                          v-model="form.message"
                          :class="{ 'is-invalid': errors.message }"
                          placeholder="Votre message..."
                        ></textarea>
                        <div class="invalid-feedback" v-if="errors.message">
                          {{ errors.message }}
                        </div>
                      </div>
                      
                      <button 
                        type="submit" 
                        class="btn btn-primary w-100 py-2"
                        :disabled="isLoading"
                      >
                        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                        {{ isLoading ? 'Envoi en cours...' : 'Envoyer le message' }}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-lg {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.form-control {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}

textarea.form-control {
  min-height: 150px;
  resize: vertical;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--bs-primary-rgb), 0.2);
}

.card {
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;
}

@media (max-width: 991.98px) {
  .card {
    margin-top: 2rem;
  }
}
</style>
