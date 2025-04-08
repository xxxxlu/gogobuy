<template>
  <div id="app">
    <header>
      <div class="header-top">
        <div class="container">
          <div class="logo">
            <router-link to="/">
              <img src="" alt="gogobuy" />
            </router-link>
          </div>
          <div class="header-actions">
            <div class="account">
              <router-link to="/account" v-if="username">Welcome, {{ username }}!</router-link>
              <router-link v-else to="/account">My Account</router-link>
            </div>
            <div class="cart">
              <router-link to="/cart">
                <span class="cart-icon">
                  <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Cart" />
                  <span class="cart-count">{{ cartCount }}</span>
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <nav class="main-nav">
        <div class="container">
          <ul class="nav-items">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/products">Products</router-link>
            </li>
            <li>
              <router-link to="/contact">Contact Us</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <div class="container">
        <div class="footer-columns">
          <div class="footer-column">
            <h3>CUSTOMER SERVICE</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>email</h3>
            <ul>
              <li><a href="#">gogobuy@zontec.club</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>PAYMENT METHOD</h3>
            <div class="payment-icons">
              <img src="./assets/easypaisa.png" alt="Payment easypaisa" />
              <img src="./assets/Frame.png" alt="Payment Frame" />
            </div>
          </div>
        </div>
        <div class="copyright">
          <p>
            Copyright 2025 | Powered by Data Network Solutions (SMC-Private) Limited
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      username: localStorage.getItem('username') || ''
    }
  },
  computed: {
    ...mapState(['categories']),
    ...mapGetters(['cartCount'])
  },
  created() {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #e2e2e2;
  background-color: #121212;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

a {
  text-decoration: none;
  color: #e2e2e2;
  transition: all 0.3s ease;
}

ul {
  list-style: none;
}

/* Header Styles */
header {
  background-color: #1a1a1a;
  border-bottom: 1px solid #333;
}

.header-top {
  padding: 20px 0;
  background-color: #000000;
}

.header-top .container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 40px;
  align-items: center;
}

.logo img {
  height: 45px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.account a {
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #333;
  color: #e2e2e2;
}

.account a:hover {
  background-color: #444;
  color: #ffffff;
}

.cart-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-icon img {
  height: 24px;
  filter: brightness(0.2);
}

.cart-count {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #4CAF50;
  color: white;
  border-radius: 20px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  padding: 0 6px;
}

/* Navigation Styles */
.main-nav {
  background-color: #1a1a1a;
  border-bottom: 1px solid #333;
  padding: 12px 0;
}

.nav-items {
  display: flex;
  gap: 32px;
}

.nav-items a {
  color: #e2e2e2;
  font-weight: 500;
  position: relative;
  padding: 6px 0;
}

.nav-items a:hover {
  color: #4CAF50;
}

.nav-items a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}

.nav-items a:hover::after {
  width: 100%;
}

/* Main Content Styles */
main {
  min-height: 600px;
  padding: 40px 0;
  background-color: #121212;
}

/* Footer Styles */
footer {
  background-color: #000000;
  color: #999;
  padding: 60px 0 30px;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-column h3 {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  color: #4CAF50;
}

.footer-column ul li {
  margin-bottom: 12px;
}

.footer-column ul li a {
  color: #999;
  font-size: 15px;
  transition: color 0.2s ease;
}

.footer-column ul li a:hover {
  color: #4CAF50;
}

.payment-icons {
  display: flex;
  gap: 16px;
  align-items: center;
}

.payment-icons img {
  height: 36px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.payment-icons img:hover {
  opacity: 1;
}

.copyright {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #333;
  color: #777;
  font-size: 14px;
}

@media (max-width: 768px) {
  .header-top .container {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
  }

  .header-actions {
    justify-content: center;
  }

  .nav-items {
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer-columns {
    grid-template-columns: 1fr;
  }

  .payment-icons {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
