import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isOpen: false
  }),
  
  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    
    cartTotal: (state) => state.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0),
    
    cartItems: (state) => state.items
  },
  
  actions: {
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          ...product,
          quantity
        });
      }
      
      // Save to localStorage
      this.saveCart();
    },
    
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      this.saveCart();
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
      this.saveCart();
    },
    
    clearCart() {
      this.items = [];
      this.saveCart();
    },
    
    toggleCart() {
      this.isOpen = !this.isOpen;
    },
    
    loadCart() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }
    },
    
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  }
});
