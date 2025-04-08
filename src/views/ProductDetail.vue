<template>
  <div class="product-detail">
    <div class="container">
      <div class="breadcrumbs">
        <router-link to="/">Home</router-link>
        <span class="separator">/</span>
        <router-link :to="`/products?category=${product.category}`">
          {{ categoryName }}
        </router-link>
        <span class="separator">/</span>
        <span class="current">{{ product.name }}</span>
      </div>

      <div class="product-container" v-if="product">
        <div class="product-images">
          <div class="main-image">
            <div class="image-wrapper">
              <img
                :src="product.image"
                :alt="product.name"
                @error="handleImageError"
              />
            </div>
          </div>
        </div>

        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>

          <div class="product-price">
            <span class="current-price">Rs. {{ formatPrice(product.price) }}</span>
            <span class="original-price" v-if="product.originalPrice > product.price">
              Rs. {{ formatPrice(product.originalPrice) }}
            </span>
            <span class="discount" v-if="discountPercentage > 0">
              {{ discountPercentage }}% OFF
            </span>
          </div>

          <div class="stock-status" :class="{ 'in-stock': product.stock > 0, 'out-of-stock': product.stock <= 0 }">
            {{ product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock' }}
          </div>

          <div class="quantity-selector">
            <label for="quantity">Quantity:</label>
            <div class="quantity-controls">
              <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
              <input type="number" id="quantity" v-model.number="quantity" min="1" :max="product.stock" />
              <button @click="increaseQuantity" :disabled="quantity >= product.stock">+</button>
            </div>
          </div>

          <div class="action-buttons">
            <button
              class="add-to-cart-btn"
              @click="addToCart"
              :disabled="product.stock <= 0"
            >
              Add to Cart
            </button>
            <button
              class="buy-now-btn"
              @click="buyNow"
              :disabled="product.stock <= 0"
            >
              Buy Now
            </button>
          </div>

          <div class="product-details">
            <h3>Product Details</h3>
            <p>{{ product.description }}</p>
          </div>

          <div class="delivery-info">
            <div class="delivery-option">
              <img src="https://ext.same-assets.com/3844190759/3347869897.png" alt="Delivery" />
              <span>Nationwide Delivery</span>
            </div>
            <div class="delivery-option">
              <img src="https://ext.same-assets.com/3844190759/2186242231.png" alt="Warranty" />
              <span>7 Days Replacement Warranty</span>
            </div>
            <div class="delivery-option">
              <img src="https://ext.same-assets.com/3844190759/478585328.png" alt="Customer Service" />
              <span>Customer Service: 0311-1444717</span>
            </div>
          </div>
        </div>
      </div>

      <div class="loading" v-else>
        <p>Loading product details...</p>
      </div>

      <div class="related-products" v-if="relatedProducts.length > 0">
        <h2 class="section-title">Related Products</h2>
        <div class="related-products-grid">
          <product-card
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'ProductDetail',
  components: {
    ProductCard
  },
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    ...mapState(['products', 'categories']),
    productId() {
      return parseInt(this.$route.params.id)
    },
    product() {
      return this.products.find(p => p.id === this.productId) || null
    },
    categoryName() {
      if (this.product) {
        const category = this.categories.find(cat => cat.slug === this.product.category)
        return category ? category.name : 'Products'
      }
      return 'Products'
    },
    discountPercentage() {
      if (this.product && this.product.originalPrice > this.product.price) {
        return Math.round(
          ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100
        )
      }
      return 0
    },
    relatedProducts() {
      if (!this.product) return []

      return this.products
        .filter(p => p.category === this.product.category && p.id !== this.productId)
        .slice(0, 4)
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    increaseQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCart() {
      for (let i = 0; i < this.quantity; i++) {
        this.$store.commit('addToCart', this.product)
      }
      alert('Product added to cart!')
    },
    buyNow() {
      for (let i = 0; i < this.quantity; i++) {
        this.$store.commit('addToCart', this.product)
      }
      this.$router.push('/cart')
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
.product-detail {
  padding: 48px 0;
  background-color: #121212;
  color: #e0e0e0;
  min-height: 80vh;
}

.breadcrumbs {
  margin-bottom: 32px;
  color: #aaa;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #1a1a1a;
  padding: 12px 20px;
  border-radius: 8px;
  border-left: 3px solid #22c55e;
}

.breadcrumbs a {
  color: #22c55e;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
}

.breadcrumbs a:hover {
  color: #16a34a;
  text-decoration: underline;
}

.breadcrumbs .separator {
  color: #cbd5e1;
}

.breadcrumbs .current {
  color: #fff;
  font-weight: 500;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  background-color: #1a1a1a;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid #333;
}

.product-images {
  position: sticky;
  top: 32px;
}

.image-wrapper {
  position: relative;
  padding-top: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border: 2px solid #333;
  transition: border-color 0.3s ease;
}

.main-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 24px;
  transition: transform 0.3s ease;
}

.main-image:hover img {
  transform: scale(1.05);
}

.product-info {
  position: relative;
}

.product-title {
  font-size: 36px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 24px;
  line-height: 1.2;
  border-bottom: 2px solid #22c55e;
  padding-bottom: 15px;
}

.product-price {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
  padding: 24px;
  background-color: #252525;
  border-radius: 12px;
  border: 1px solid #333;
}

.current-price {
  font-size: 36px;
  font-weight: 700;
  color: #22c55e;
  line-height: 1;
}

.original-price {
  font-size: 20px;
  text-decoration: line-through;
  color: #888;
}

.discount {
  background-color: #22c55e;
  color: #fff;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 8px rgba(34, 197, 94, 0.3);
}

.stock-status {
  margin-bottom: 24px;
  font-weight: 500;
  font-size: 15px;
}

.in-stock {
  color: #22c55e;
}

.out-of-stock {
  color: #f87171;
}

.quantity-selector {
  margin-bottom: 32px;
}

.quantity-selector label {
  display: block;
  margin-bottom: 12px;
  font-weight: 500;
  color: #e0e0e0;
}

.quantity-controls {
  display: inline-flex;
  align-items: center;
  border: 1px solid #444;
  border-radius: 8px;
  overflow: hidden;
  background-color: #252525;
}

.quantity-controls button {
  width: 44px;
  height: 44px;
  border: none;
  background-color: #333;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-controls button:hover:not(:disabled) {
  background-color: #22c55e;
  color: #fff;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 60px;
  height: 44px;
  border: none;
  border-left: 1px solid #444;
  border-right: 1px solid #444;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #e0e0e0;
  background-color: #252525;
  -moz-appearance: textfield;
  appearance: textfield;
}

.quantity-controls input::-webkit-outer-spin-button,
.quantity-controls input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.add-to-cart-btn, .buy-now-btn {
  flex: 1;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-to-cart-btn {
  background-color: #1a1a1a;
  color: #22c55e;
  border: 2px solid #22c55e;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.buy-now-btn {
  background-color: #22c55e;
  color: #ffffff;
  border: none;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: #252525;
  box-shadow: 0 5px 15px rgba(34, 197, 94, 0.2);
}

.buy-now-btn:hover:not(:disabled) {
  background-color: #16a34a;
  box-shadow: 0 5px 15px rgba(34, 197, 94, 0.4);
}

.add-to-cart-btn:disabled, .buy-now-btn:disabled {
  background-color: #252525;
  color: #666;
  border-color: #333;
  cursor: not-allowed;
}

.product-details {
  margin-bottom: 40px;
  color: #ccc;
  line-height: 1.8;
}

.product-details h3 {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
  border-left: 3px solid #22c55e;
  padding-left: 10px;
}

.delivery-info {
  background-color: #252525;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #333;
}

.delivery-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #444;
}

.delivery-option:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.delivery-option img {
  width: 24px;
  height: 24px;
  opacity: 0.8;
}

.delivery-option span {
  color: #ccc;
  font-size: 15px;
}

.related-products {
  margin-top: 80px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 32px;
  text-align: center;
  position: relative;
  padding-bottom: 15px;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #22c55e;
}

.related-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.loading {
  text-align: center;
  padding: 80px;
  color: #aaa;
  font-size: 16px;
  background-color: #1a1a1a;
  border-radius: 12px;
  border: 1px solid #333;
}

@media (max-width: 1200px) {
  .product-container {
    gap: 40px;
  }

  .related-products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .product-info {
    padding: 0;
  }
}

@media (max-width: 768px) {
  .related-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-title {
    font-size: 28px;
  }

  .current-price {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .product-detail {
    padding: 24px 0;
  }

  .related-products-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .product-title {
    font-size: 24px;
  }

  .current-price {
    font-size: 24px;
  }
}
</style>
