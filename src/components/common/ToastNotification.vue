<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div 
      v-for="(toast, index) in toasts" 
      :key="index"
      :class="['toast show', `bg-${toast.type} text-white`]"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          <i :class="getIcon(toast.type)" class="me-2"></i>
          {{ toast.message }}
        </div>
        <button 
          type="button" 
          class="btn-close btn-close-white me-2 m-auto" 
          @click="removeToast(index)"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const toasts = ref([]);
let toastId = 0;

const getIcon = (type) => {
  const icons = {
    success: 'bi bi-check-circle-fill',
    danger: 'bi bi-exclamation-triangle-fill',
    info: 'bi bi-info-circle-fill',
    warning: 'bi bi-exclamation-triangle-fill'
  };
  return icons[type] || 'bi-info-circle-fill';
};

const showToast = (message, type = 'info', duration = 3000) => {
  const id = toastId++;
  toasts.value.push({ id, message, type });
  
  if (duration > 0) {
    setTimeout(() => {
      removeToastById(id);
    }, duration);
  }
  
  return id;
};

const removeToast = (index) => {
  toasts.value.splice(index, 1);
};

const removeToastById = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id);
  if (index !== -1) {
    toasts.value.splice(index, 1);
  }
};

// Exposer la méthode showToast pour une utilisation globale
defineExpose({
  showToast
});
</script>

<style scoped>
.toast {
  margin-bottom: 0.5rem;
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  opacity: 0.95;
  transition: opacity 0.3s ease-in-out;
}

.toast:hover {
  opacity: 1;
}

.bg-success {
  background-color: #198754 !important;
}

.bg-danger {
  background-color: #dc3545 !important;
}

.bg-warning {
  background-color: #ffc107 !important;
  color: #000 !important;
}

.bg-info {
  background-color: #0dcaf0 !important;
}
</style>
