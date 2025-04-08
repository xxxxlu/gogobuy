<template>
  <div class="product-card">
    <div class="product-image">
      <img
        :src="product.image"
        :alt="product.name"
        @error="handleImageError"
      />
      <div class="product-overlay">
        <button 
          class="quick-view-btn"
          @click="addToCart"
          :disabled="product.stock <= 0"
        >
          {{ product.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK' }}
        </button>
      </div>
      <div class="discount" v-if="discountPercentage > 0">
        {{ discountPercentage }}% OFF
      </div>
    </div>
    <div class="product-details">
      <h3 class="product-title">
        <router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
      </h3>
      <div class="product-price">
        <span class="current-price">Rs. {{ formatPrice(product.price) }}</span>
        <span class="original-price" v-if="product.originalPrice > product.price">
          Rs. {{ formatPrice(product.originalPrice) }}
        </span>
      </div>
      <div class="product-stock" :class="{ 'in-stock': product.stock > 0, 'out-of-stock': product.stock <= 0 }">
        <span v-if="product.stock > 0">In Stock</span>
        <span v-else>Out of Stock</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    discountPercentage() {
      if (this.product.originalPrice > this.product.price) {
        return Math.round(
          ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100
        )
      }
      return 0
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    addToCart() {
      this.$store.commit('addToCart', this.product)
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
.product-card {
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #333;
}

.product-card:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border-color: #4CAF50;
}

.product-image {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.quick-view-btn {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(20px);
  opacity: 0;
}

.product-card:hover .quick-view-btn {
  transform: translateY(0);
  opacity: 1;
}

.quick-view-btn:hover {
  background-color: #3b9c3f;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
}

.quick-view-btn:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.discount {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #4CAF50;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-details {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 18px;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 50px;
  line-height: 1.4;
}

.product-title a {
  color: #e2e2e2;
  text-decoration: none;
  transition: color 0.3s ease;
}

.product-title a:hover {
  color: #4CAF50;
}

.product-price {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.current-price {
  font-size: 22px;
  font-weight: bold;
  color: #4CAF50;
  margin-right: 12px;
}

.original-price {
  font-size: 16px;
  text-decoration: line-through;
  color: #888;
}

.product-stock {
  margin-top: auto;
  font-size: 14px;
  font-weight: 500;
  padding: 5px 0;
}

.in-stock {
  color: #4CAF50;
}

.out-of-stock {
  color: #f44336;
}
</style>
