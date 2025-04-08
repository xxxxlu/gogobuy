<template>
  <div class="product-list">
    <div class="hero-banner">
      <div class="container">
        <h1>{{ categoryTitle }}</h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> /
          <span>{{ categoryTitle }}</span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="content-wrapper">
        <div class="sidebar">
          <div class="filter-section">
            <h3>Categories</h3>
            <ul>
              <li v-for="category in categories" :key="category.id">
                <router-link :to="'/products?category=' + category.slug">
                  {{ category.name }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="filter-section">
            <h3>Price Range</h3>
            <div class="price-inputs">
              <input type="number" placeholder="Min" v-model="priceMin" />
              <span>-</span>
              <input type="number" placeholder="Max" v-model="priceMax" />
            </div>
            <button class="filter-btn" @click="applyFilters">Apply</button>
          </div>
        </div>

        <div class="main-content">
          <div class="sort-bar">
            <span>{{ filteredProducts.length }} products found</span>
            <div class="sort-options">
              <label for="sort">Sort by:</label>
              <select id="sort" v-model="sortOption">
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          <div class="products-grid">
            <template v-if="filteredProducts.length > 0">
              <product-card
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
                class="product-card-item"
              />
            </template>
            <div v-else class="no-products">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  data() {
    return {
      sortOption: 'price-low',
      priceMin: '',
      priceMax: '',
      appliedPriceMin: null,
      appliedPriceMax: null
    }
  },
  computed: {
    ...mapState(['products', 'categories']),
    categorySlug() {
      return this.$route.query.category || ''
    },
    categoryTitle() {
      if (this.categorySlug) {
        const category = this.categories.find(cat => cat.slug === this.categorySlug)
        return category ? category.name : 'All Products'
      }
      return 'All Products'
    },
    filteredProducts() {
      let filtered = [...this.products]

      // Filter by category
      if (this.categorySlug) {
        filtered = filtered.filter(product => product.category === this.categorySlug)
      }

      // Filter by price range
      if (this.appliedPriceMin !== null) {
        filtered = filtered.filter(product => product.price >= this.appliedPriceMin)
      }

      if (this.appliedPriceMax !== null) {
        filtered = filtered.filter(product => product.price <= this.appliedPriceMax)
      }

      // Sort products
      switch (this.sortOption) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
      }

      return filtered
    }
  },
  methods: {
    applyFilters() {
      this.appliedPriceMin = this.priceMin !== '' ? parseInt(this.priceMin) : null
      this.appliedPriceMax = this.priceMax !== '' ? parseInt(this.priceMax) : null
    }
  },
  watch: {
    '$route.query.category'() {
      // Reset filters when category changes
      this.priceMin = ''
      this.priceMax = ''
      this.appliedPriceMin = null
      this.appliedPriceMax = null
    }
  }
}
</script>

<style scoped>
.product-list {
  margin-bottom: 0;
  color: #e2e2e2;
  min-height: 100vh;
  background-color: #121212;
}

.hero-banner {
  background-color: #000000;
  padding: 60px 0;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
}

.hero-banner::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #4CAF50, #81C784, #4CAF50);
}

.hero-banner h1 {
  font-size: 40px;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #4CAF50, #81C784);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.breadcrumbs {
  color: #999;
  font-size: 14px;
}

.breadcrumbs a {
  color: #4CAF50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumbs a:hover {
  color: #81C784;
}

.content-wrapper {
  display: flex;
  gap: 30px;
  padding: 20px 0 60px;
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
}

.filter-section {
  background-color: #1a1a1a;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.filter-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  border-color: #4CAF50;
}

.filter-section h3 {
  font-size: 18px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #333;
  color: #4CAF50;
  letter-spacing: 1px;
}

.filter-section ul li {
  margin-bottom: 12px;
}

.filter-section ul li a {
  color: #e2e2e2;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
  display: block;
  padding: 5px 0;
}

.filter-section ul li a:hover {
  color: #4CAF50;
  transform: translateX(5px);
}

.price-inputs {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.price-inputs input {
  flex: 1;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #222;
  color: #e2e2e2;
  transition: border-color 0.3s ease;
}

.price-inputs input:focus {
  border-color: #4CAF50;
  outline: none;
}

.price-inputs span {
  margin: 0 10px;
  color: #999;
}

.filter-btn {
  width: 100%;
  padding: 12px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background-color: #3b9c3f;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.main-content {
  flex-grow: 1;
}

.sort-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a1a;
  padding: 20px 30px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
}

.sort-bar span {
  font-size: 16px;
  color: #4CAF50;
  font-weight: 500;
}

.sort-options label {
  margin-right: 10px;
  color: #999;
}

.sort-options select {
  padding: 8px 15px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #222;
  color: #e2e2e2;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.sort-options select:focus {
  border-color: #4CAF50;
  outline: none;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.product-card-item {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.product-card-item:hover {
  transform: translateY(-10px) scale(1.03);
  z-index: 10;
}

.no-products {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px;
  background-color: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.no-products p {
  font-size: 18px;
  color: #999;
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 992px) {
  .container {
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 30px;
  }

  .hero-banner {
    padding: 40px 0;
  }
  
  .hero-banner h1 {
    font-size: 32px;
  }
}

@media (max-width: 576px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .sort-bar {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 20px;
  }

  .sort-options {
    margin-top: 15px;
    width: 100%;
  }
  
  .sort-options select {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
