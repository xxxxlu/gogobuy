<template>
  <div class="cart-page">
    <div class="container">
      <div class="page-header">
        <h1>Shopping Cart</h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> /
          <span>Shopping Cart</span>
        </div>
      </div>

      <div class="cart-content" v-if="cart.length > 0">
        <div class="cart-items">
          <div class="cart-item" v-for="item in cart" :key="item.id">
            <div class="item-image">
              <img
                :src="item.image"
                :alt="item.name"
                @error="handleImageError"
              />
            </div>
            <div class="item-details">
              <h3 class="item-title">
                <router-link :to="`/product/${item.id}`">{{ item.name }}</router-link>
              </h3>
              <div class="item-price">
                <span class="current-price">Rs. {{ formatPrice(item.price) }}</span>
                <span class="original-price" v-if="item.originalPrice > item.price">
                  Rs. {{ formatPrice(item.originalPrice) }}
                </span>
              </div>
            </div>
            <div class="item-quantity">
              <div class="quantity-controls">
                <button @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1">-</button>
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  :max="item.stock"
                  @change="updateQuantity(item.id, item.quantity)"
                />
                <button @click="increaseQuantity(item.id)" :disabled="item.quantity >= item.stock">+</button>
              </div>
              <button class="remove-btn" @click="removeItem(item.id)">Remove</button>
            </div>
            <div class="item-total">
              Rs. {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>Rs. {{ formatPrice(cartTotal) }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping Fee</span>
            <span>Rs. {{ formatPrice(shippingFee) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>Rs. {{ formatPrice(cartTotal + shippingFee) }}</span>
          </div>
          <button class="checkout-btn" @click="proceedToCheckout">Proceed to Checkout</button>
          <div class="continue-shopping">
            <router-link to="/products">Continue Shopping</router-link>
          </div>
        </div>
      </div>

      <div class="empty-cart" v-else>
        <div class="empty-cart-content">
          <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Empty Cart" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <router-link to="/products" class="continue-shopping-btn">Continue Shopping</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  data() {
    return {
      shippingFee: 399
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal'])
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    increaseQuantity(id) {
      const item = this.cart.find(item => item.id === id)
      if (item && item.quantity < item.stock) {
        this.$store.commit('updateCartItem', { id, quantity: item.quantity + 1 })
      }
    },
    decreaseQuantity(id) {
      const item = this.cart.find(item => item.id === id)
      if (item && item.quantity > 1) {
        this.$store.commit('updateCartItem', { id, quantity: item.quantity - 1 })
      }
    },
    updateQuantity(id, quantity) {
      const item = this.cart.find(item => item.id === id)
      if (item) {
        // Ensure quantity is valid
        let validQuantity = Math.max(1, Math.min(item.stock, quantity))
        this.$store.commit('updateCartItem', { id, quantity: validQuantity })
      }
    },
    removeItem(id) {
      if (confirm('Are you sure you want to remove this item from your cart?')) {
        this.$store.commit('removeFromCart', id)
      }
    },
    proceedToCheckout() {
      this.$router.push('/checkout')
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
.cart-page {
  padding: 40px 0;
  background-color: #121212;
  color: #e0e0e0;
  min-height: 80vh;
}

.page-header {
  margin-bottom: 32px;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #1a1a1a;
  border-bottom: 2px solid #22c55e;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.breadcrumbs {
  font-size: 14px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.breadcrumbs a {
  color: #22c55e;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumbs a:hover {
  color: #3b82f6;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  align-items: start;
}

.cart-items {
  background-color: #1a1a1a;
  border-radius: 16px;
  border: 1px solid #333;
  overflow: hidden;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: 24px;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: #f8fafc;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #333;
  transition: border-color 0.3s ease;
}

.cart-item:hover .item-image {
  border-color: #22c55e;
}

.item-image img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item-image:hover img {
  transform: scale(1.05);
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  line-height: 1.4;
}

.item-title a {
  color: #e2e2e2;
  text-decoration: none;
  transition: color 0.2s ease;
}

.item-title a:hover {
  color: #22c55e;
}

.item-price {
  display: flex;
  align-items: center;
  gap: 12px;
}

.current-price {
  font-weight: 600;
  font-size: 18px;
  color: #22c55e;
}

.original-price {
  font-size: 14px;
  text-decoration: line-through;
  color: #777;
}

.quantity-controls {
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 12px;
  background-color: #252525;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
}

.quantity-controls button {
  width: 40px;
  height: 40px;
  background-color: #333;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #fff;
}

.quantity-controls button:hover {
  background-color: #22c55e;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #222;
}

.quantity-controls input {
  width: 60px;
  height: 40px;
  text-align: center;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #e2e2e2;
  background-color: #252525;
  -moz-appearance: textfield;
  appearance: textfield;
}

.remove-btn {
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  transition: all 0.3s ease;
  border-radius: 6px;
}

.remove-btn:hover {
  background-color: #3a3a3a;
  color: #ff4444;
  border-color: #ff4444;
}

.item-total {
  font-weight: 600;
  font-size: 18px;
  color: #22c55e;
}

.cart-summary {
  background-color: #1a1a1a;
  border-radius: 16px;
  border: 1px solid #333;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.cart-summary h3 {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #333;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #aaa;
  font-size: 15px;
}

.summary-row.total {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #333;
  font-weight: 600;
  font-size: 20px;
  color: #22c55e;
}

.checkout-btn {
  width: 100%;
  padding: 16px 24px;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 24px 0 16px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.checkout-btn:hover {
  background-color: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34, 197, 94, 0.4);
}

.continue-shopping {
  text-align: center;
}

.continue-shopping a {
  color: #aaa;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s ease;
}

.continue-shopping a:hover {
  color: #22c55e;
}

.empty-cart {
  background-color: #1a1a1a;
  border-radius: 16px;
  border: 1px solid #333;
  padding: 60px 32px;
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.empty-cart-content img {
  width: 120px;
  height: 120px;
  opacity: 0.4;
  margin-bottom: 24px;
  transition: opacity 0.2s ease;
}

.empty-cart-content:hover img {
  opacity: 0.6;
}

.empty-cart-content h2 {
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
}

.empty-cart-content p {
  color: #aaa;
  font-size: 16px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 16px 32px;
  background-color: #22c55e;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.continue-shopping-btn:hover {
  background-color: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34, 197, 94, 0.4);
}

@media (max-width: 1200px) {
  .cart-content {
    grid-template-columns: 1fr 350px;
    gap: 24px;
  }
}

@media (max-width: 992px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    max-width: 600px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 100px 1fr;
    grid-template-areas:
      "image details"
      "image quantity"
      "total total";
    gap: 16px;
    padding: 20px;
  }

  .item-image {
    grid-area: image;
  }

  .item-image img {
    width: 100px;
    height: 100px;
  }

  .item-details {
    grid-area: details;
  }

  .item-quantity {
    grid-area: quantity;
  }

  .item-total {
    grid-area: total;
    text-align: right;
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid #e2e8f0;
  }
}

@media (max-width: 480px) {
  .cart-page {
    padding: 24px 0;
  }

  .page-header {
    margin-bottom: 24px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .cart-item {
    padding: 16px;
  }

  .item-title {
    font-size: 15px;
  }

  .current-price {
    font-size: 16px;
  }

  .quantity-controls {
    width: 100%;
    margin-bottom: 8px;
  }

  .remove-btn {
    width: 100%;
    text-align: center;
    padding: 8px 0;
    background-color: #fef2f2;
    border-radius: 6px;
    color: #ef4444;
  }

  .empty-cart {
    padding: 40px 20px;
  }

  .empty-cart-content h2 {
    font-size: 24px;
  }

  .empty-cart-content p {
    font-size: 15px;
  }
}
</style>
