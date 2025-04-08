<template>
  <div class="checkout-page">
    <div class="container">
      <div class="page-header">
        <h1>Checkout</h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> /
          <router-link to="/cart">Shopping Cart</router-link> /
          <span>Checkout</span>
        </div>
      </div>

      <div class="checkout-content" v-if="cart.length > 0">
        <div class="customer-details">
          <h2>Customer Information</h2>
          <form @submit.prevent="proceedToPayment">
            <div class="form-group">
              <label for="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                v-model="customerInfo.fullName"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input
                type="email"
                id="email"
                v-model="customerInfo.email"
                required
              />
            </div>

            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                v-model="customerInfo.phone"
                required
              />
            </div>

            <div class="form-group">
              <label for="address">Shipping Address *</label>
              <textarea
                id="address"
                v-model="customerInfo.address"
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label for="city">City *</label>
              <input
                type="text"
                id="city"
                v-model="customerInfo.city"
                required
              />
            </div>

            <div class="form-group">
              <label for="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                v-model="customerInfo.postalCode"
              />
            </div>

            <div class="form-group">
              <label for="notes">Order Notes (Optional)</label>
              <textarea
                id="notes"
                v-model="customerInfo.notes"
              ></textarea>
            </div>

            <h2>Payment Method</h2>
            <div class="payment-methods">
              <div class="payment-method">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  value="cod"
                  v-model="customerInfo.paymentMethod"
                />
                <label for="cashOnDelivery"></label>
                <img src="../assets/easypaisa.png" alt="" style="width: 100px; height: 80px;">
              </div>
              <div class="payment-method">
                <input
                  type="radio"
                  id="bankTransfer"
                  value="bank"
                  v-model="customerInfo.paymentMethod"
                />
                <label for="bankTransfer"></label>
                <img src="../assets/Frame.png" alt="" style="width: 100px; height: 80px;">
              </div>
            </div>

            <div class="form-actions">
              <router-link to="/cart" class="back-to-cart">Back to Cart</router-link>
              <button type="submit" class="place-order-btn">Place Order</button>
            </div>
          </form>
        </div>

        <div class="order-summary">
          <h2>Order Summary</h2>
          <div class="summary-items">
            <div class="summary-item" v-for="item in cart" :key="item.id">
              <div class="item-image">
                <img
                  :src="item.image"
                  :alt="item.name"
                  @error="handleImageError"
                />
              </div>
              <div class="item-details">
                <h3 class="item-name">{{ item.name }}</h3>
                <div class="item-price-qty">
                  <span>Rs. {{ formatPrice(item.price) }} x {{ item.quantity }}</span>
                </div>
              </div>
              <div class="item-total">
                Rs. {{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>

          <div class="summary-totals">
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
          </div>
        </div>
      </div>

      <div class="empty-checkout" v-else>
        <div class="empty-checkout-content">
          <h2>Your cart is empty</h2>
          <p>You need to add products to your cart before checkout.</p>
          <router-link to="/products" class="continue-shopping-btn">Continue Shopping</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Checkout',
  data() {
    return {
      shippingFee: 399,
      customerInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: '',
        paymentMethod: 'cod'
      }
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
    proceedToPayment() {
      // Save customer info in session/local storage
      localStorage.setItem('customerInfo', JSON.stringify(this.customerInfo))
      localStorage.setItem('orderTotal', JSON.stringify({
        subtotal: this.cartTotal,
        shipping: this.shippingFee,
        total: this.cartTotal + this.shippingFee
      }))

      // In a real app, you would send this data to your server
      // For now, just redirect to success page
      this.$router.push('/checkout-success')
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  },
  created() {
    // Redirect if cart is empty
    if (this.cart.length === 0) {
      this.$router.push('/cart')
    }

    // If returning from payment, don't clear the form
    const savedInfo = localStorage.getItem('customerInfo')
    if (savedInfo) {
      this.customerInfo = JSON.parse(savedInfo)
    }
  }
}
</script>

<style scoped>
.checkout-page {
  margin-bottom: 40px;
  background-color: #121212;
  color: #e0e0e0;
  min-height: 80vh;
  padding: 40px 0;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #1a1a1a;
  border-bottom: 2px solid #22c55e;
}

.page-header h1 {
  font-size: 32px;
  margin-bottom: 10px;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.breadcrumbs {
  color: #999;
  font-size: 14px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.breadcrumbs a {
  color: #22c55e;
  text-decoration: none;
  transition: color 0.3s ease;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.customer-details, .order-summary {
  background-color: #1a1a1a;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  border: 1px solid #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.customer-details:hover, .order-summary:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border-color: #22c55e;
}

.customer-details h2, .order-summary h2 {
  font-size: 22px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
  color: #fff;
  font-weight: 600;
  position: relative;
}

.customer-details h2:after, .order-summary h2:after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: #22c55e;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: #ccc;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #444;
  border-radius: 6px;
  font-size: 15px;
  background-color: #252525;
  color: #e0e0e0;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus, .form-group textarea:focus {
  border-color: #22c55e;
  outline: none;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

.payment-methods {
  margin-bottom: 30px;
}

.payment-method {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  background-color: #252525;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #444;
  transition: border-color 0.3s ease;
}

.payment-method:hover {
  border-color: #22c55e;
}

.payment-method input {
  margin-right: 10px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.back-to-cart {
  color: #aaa;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

.back-to-cart:before {
  content: '←';
  margin-right: 5px;
}

.back-to-cart:hover {
  color: #22c55e;
}

.place-order-btn {
  padding: 14px 30px;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.place-order-btn:hover {
  background-color: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34, 197, 94, 0.4);
}

.summary-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #333;
  transition: transform 0.3s ease;
}

.summary-item:hover {
  transform: translateX(5px);
}

.summary-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #444;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 15px;
  margin-bottom: 8px;
  color: #e0e0e0;
  font-weight: 500;
}

.item-price-qty {
  font-size: 13px;
  color: #aaa;
}

.item-total {
  font-weight: bold;
  margin-left: 15px;
  color: #22c55e;
}

.summary-totals {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #333;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-row.total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #333;
  font-size: 20px;
  font-weight: bold;
  color: #22c55e;
}

.empty-checkout {
  background-color: #1a1a1a;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 50px 30px;
  text-align: center;
  border: 1px solid #333;
  max-width: 600px;
  margin: 0 auto;
}

.empty-checkout h2 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #fff;
}

.empty-checkout p {
  color: #aaa;
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.6;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 14px 32px;
  background-color: #22c55e;
  color: white;
  border-radius: 8px;
  font-weight: 600;
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

@media (max-width: 992px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .order-summary {
    order: -1;
    margin-bottom: 20px;
  }
}
</style>
