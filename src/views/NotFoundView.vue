<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 text-center">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-5">
            <div class="text-danger mb-4">
              <i class="bi bi-exclamation-triangle-fill" style="font-size: 4rem;"></i>
            </div>
            <h1 class="display-4 fw-bold mb-3">404</h1>
            <h2 class="h3 mb-4">Page non trouvée</h2>
            <p class="lead text-muted mb-4">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
              <button 
                @click="$router.go(-1)" 
                class="btn btn-primary btn-lg px-4 me-md-2"
              >
                <i class="bi bi-arrow-left me-2"></i>Retour
              </button>
              <router-link 
                to="/" 
                class="btn btn-outline-secondary btn-lg px-4"
              >
                Page d'accueil
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.btn {
  min-width: 180px;
  border-radius: 0.5rem;
}

.display-4 {
  font-weight: 700;
  color: #2c3e50;
}

.bi-exclamation-triangle-fill {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}
</style>
