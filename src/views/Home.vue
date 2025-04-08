<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1>Welcome to <span class="highlight">GoGoBuy</span></h1>
          <p class="tagline">Premium E-Commerce Experience</p>
          <div class="hero-description">
            <p>Discover a curated collection of exceptional products designed to elevate your lifestyle.</p>
          </div>
          <router-link to="/products" class="shop-now-btn">Explore Products</router-link>
        </div>
      </div>
    </div>
    
    <!-- About Section -->
    <div class="about-section">
      <div class="container">
        <div class="about-content">
          <h2>About <span class="highlight">GoGoBuy</span></h2>
          <p>Welcome to GoGoBuy, your premium online shopping destination. We're committed to providing exceptional products and outstanding customer service. Our carefully curated collection features top-quality items from trusted brands and artisans worldwide.</p>
          <p>At GoGoBuy, we believe shopping should be enjoyable, simple, and rewarding. Whether you're seeking everyday essentials or special indulgences, we're here to help you discover products that enhance your life.</p>
        </div>
      </div>
    </div>
    
    <!-- Feature Section -->
    <div class="features-section">
      <div class="container">
        <h2>Why Choose <span class="highlight">GoGoBuy</span></h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">✨</div>
            <h3>Premium Quality</h3>
            <p>Carefully selected products that meet our high standards</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping to your doorstep</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Multiple safe payment options for your convenience</p>
          </div>
          <div class="feature">
            <div class="feature-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>Our dedicated team is always ready to assist you</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CTA Section -->
    <div class="cta-section">
      <div class="container">
        <h2>Ready to Explore?</h2>
        <p>Discover our extensive range of high-quality products</p>
        <router-link to="/products" class="cta-button">Shop Now</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  padding-bottom: 0;
  color: #e2e2e2;
}

/* Hero Section */
.hero-section {
  background-color: #000000;
  padding: 120px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(76, 175, 80, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero-content h1 {
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: -1px;
  line-height: 1.1;
  text-transform: uppercase;
  background: linear-gradient(90deg, #4CAF50, #81C784);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.highlight {
  color: #4CAF50;
  font-weight: 700;
}

.tagline {
  font-size: 24px;
  color: #999;
  margin-bottom: 30px;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.hero-description {
  max-width: 600px;
  margin: 0 auto 40px;
  font-size: 18px;
  color: #999;
  line-height: 1.6;
}

.shop-now-btn {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  font-weight: 600;
  padding: 16px 36px;
  border-radius: 4px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.shop-now-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
  z-index: -1;
}

.shop-now-btn:hover::before {
  left: 100%;
}

.shop-now-btn:hover {
  background-color: #3b9c3f;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
}

/* About Section */
.about-section {
  background-color: #121212;
  padding: 100px 0;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-content h2 {
  font-size: 36px;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
}

.about-content h2::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 3px;
  background-color: #4CAF50;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
}

.about-content p {
  margin-bottom: 24px;
  line-height: 1.8;
  color: #999;
  font-size: 18px;
}

/* Features Section */
.features-section {
  background-color: #0a0a0a;
  padding: 100px 0;
  text-align: center;
}

.features-section h2 {
  font-size: 36px;
  margin-bottom: 50px;
  position: relative;
  display: inline-block;
}

.features-section h2::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 3px;
  background-color: #4CAF50;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 40px 30px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #333;
}

.feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border-color: #4CAF50;
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
  display: inline-block;
  height: 80px;
  width: 80px;
  line-height: 80px;
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: 50%;
}

.feature h3 {
  font-size: 22px;
  font-weight: 600;
  color: #e2e2e2;
  margin-bottom: 15px;
}

.feature p {
  color: #999;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 120px 0;
  text-align: center;
  color: #fff;
}

.cta-section h2 {
  font-size: 42px;
  margin-bottom: 20px;
}

.cta-section p {
  font-size: 20px;
  margin-bottom: 40px;
  color: #ccc;
}

.cta-button {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  font-weight: 600;
  padding: 16px 36px;
  border-radius: 4px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: #3b9c3f;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
}

/* Responsive Styles */
@media (max-width: 992px) {
  .container {
    padding: 0 30px;
  }
  
  .hero-content h1 {
    font-size: 48px;
  }
  
  .tagline {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 80px 0;
  }
  
  .hero-content h1 {
    font-size: 36px;
  }
  
  .tagline {
    font-size: 18px;
  }
  
  .hero-description {
    font-size: 16px;
  }
  
  .about-section,
  .features-section,
  .cta-section {
    padding: 70px 0;
  }
  
  .about-content h2,
  .features-section h2,
  .cta-section h2 {
    font-size: 30px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 30px;
  }
  
  .tagline {
    font-size: 16px;
    letter-spacing: 2px;
  }
  
  .shop-now-btn,
  .cta-button {
    padding: 14px 28px;
    font-size: 14px;
  }
  
  .feature {
    padding: 30px 20px;
  }
}
</style>
