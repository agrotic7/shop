<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4 p-md-5">
            <h1 class="text-center mb-4">À propos de nous</h1>
            
            <div class="row align-items-center mb-5">
              <div class="col-md-6 mb-4 mb-md-0">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                  alt="Notre équipe" 
                  class="img-fluid rounded-3 shadow"
                >
              </div>
              <div class="col-md-6">
                <h2 class="h4 mb-3">Notre histoire</h2>
                <p class="text-muted">
                  Fondée en 2023, notre entreprise est née d'une passion commune pour le commerce électronique et l'innovation. 
                  Nous nous engageons à fournir à nos clients des produits de qualité à des prix compétitifs, avec un service client exceptionnel.
                </p>
                <p class="text-muted mb-0">
                  Notre mission est de simplifier votre expérience d'achat en ligne tout en vous offrant une large sélection de produits soigneusement sélectionnés.
                </p>
              </div>
            </div>

            <div class="row mb-5">
              <div class="col-12">
                <h2 class="h4 mb-4">Nos valeurs</h2>
                <div class="row g-4">
                  <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm">
                      <div class="card-body text-center p-4">
                        <div class="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-3 mx-auto">
                          <i class="bi bi-shield-check"></i>
                        </div>
                        <h3 class="h5">Qualité</h3>
                        <p class="text-muted mb-0">
                          Nous sélectionnons rigoureusement nos produits pour vous garantir une qualité optimale.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm">
                      <div class="card-body text-center p-4">
                        <div class="icon-lg bg-success bg-opacity-10 text-success rounded-circle mb-3 mx-auto">
                          <i class="bi bi-people"></i>
                        </div>
                        <h3 class="h5">Service client</h3>
                        <p class="text-muted mb-0">
                          Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm">
                      <div class="card-body text-center p-4">
                        <div class="icon-lg bg-warning bg-opacity-10 text-warning rounded-circle mb-3 mx-auto">
                          <i class="bi bi-truck"></i>
                        </div>
                        <h3 class="h5">Livraison rapide</h3>
                        <p class="text-muted mb-0">
                          Expédition sous 24h et livraison rapide pour recevoir vos commandes au plus vite.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <h2 class="h4 mb-4">Rejoignez notre communauté</h2>
              <p class="text-muted mb-4">Suivez-nous sur les réseaux sociaux pour ne rien manquer de nos actualités et promotions.</p>
              <div class="d-flex justify-content-center gap-3">
                <a href="#" class="btn btn-outline-primary rounded-circle" style="width: 44px; height: 44px;">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="#" class="btn btn-outline-primary rounded-circle" style="width: 44px; height: 44px;">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="#" class="btn btn-outline-primary rounded-circle" style="width: 44px; height: 44px;">
                  <i class="bi bi-twitter"></i>
                </a>
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
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 0.75rem;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;
}

.btn-outline-primary {
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: var(--bs-primary);
  color: white !important;
}
</style>
