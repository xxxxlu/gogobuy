import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    categories: [
    ]
  },
  getters: {
    cartTotal: state => {
      return state.cart.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    cartCount: state => {
      return state.cart.reduce((count, item) => {
        return count + item.quantity
      }, 0)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    addToCart(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.push({
          ...product,
          quantity: 1
        })
      }
    },
    updateCartItem(state, { id, quantity }) {
      const item = state.cart.find(item => item.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
    removeFromCart(state, id) {
      state.cart = state.cart.filter(item => item.id !== id)
    },
    clearCart(state) {
      state.cart = []
    }
  },
  actions: {
    fetchProducts({ commit }) {
      // In a real app, this would be an API call
      // For now, we'll use hardcoded data
      const products = [
        {
          "id": 1,
          "name": "Xiaomi Redmi Note 12 (8GB,128GB) Dual Sim",
          "price": 42299,
          "originalPrice": 45000,
          "description": "6.67 inches AMOLED Display, Snapdragon 685, 50MP+8MP+2MP Rear Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2259138206/2418773226.jpeg",
          "stock": 0
        },
        {
          "id": 2,
          "name": "Infinix Note 30 (8GB,256GB) Dual Sim",
          "price": 41499,
          "originalPrice": 49099,
          "description": "6.78 inches IPS LCD Display, Mediatek Helio G99, 64MP+2MP+AI Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2339830959/2117920719.jpeg",
          "stock": 0
        },
        {
          "id": 3,
          "name": "Xiaomi Redmi 13 (8GB,128GB) Dual Sim",
          "price": 32449,
          "originalPrice": 35000,
          "description": "6.79 inches IPS LCD Display, Mediatek Helio G99, 108MP+2MP Rear Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2259138206/3724581363.jpeg",
          "stock": 10
        },
        {
          "id": 4,
          "name": "Infinix Hot 50i (6GB,128GB) Dual Sim",
          "price": 28749,
          "originalPrice": 31999,
          "description": "6.6 inches IPS LCD Display, Unisoc T606, 13MP+0.08MP Rear Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2339830959/1141693577.jpeg",
          "stock": 15
        },
        {
          "id": 5,
          "name": "Xiaomi Redmi 14C (4GB,128GB) Dual Sim",
          "price": 25699,
          "originalPrice": 28500,
          "description": "6.88 inches IPS LCD Display, Helio G85, 50MP+2MP Rear Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2259138206/3662470392.jpeg",
          "stock": 8
        },
        {
          "id": 6,
          "name": "Infinix Smart 9 (4GB,128GB) Dual Sim",
          "price": 26449,
          "originalPrice": 28999,
          "description": "6.6 inches IPS LCD Display, Unisoc T606, 13MP+0.08MP Rear Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2339830959/3256359025.jpeg",
          "stock": 12
        },
        {
          "id": 7,
          "name": "Xiaomi Redmi A3x (3GB,64GB) Dual Sim",
          "price": 18099,
          "originalPrice": 19999,
          "description": "6.71 inches IPS LCD Display, Helio G36, 8MP+0.08MP Rear Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2259138206/3091961373.jpeg",
          "stock": 20
        },
        {
          "id": 8,
          "name": "Xiaomi Poco C75 (8GB,256GB) Dual Sim",
          "price": 30699,
          "originalPrice": 33999,
          "description": "6.74 inches IPS LCD Display, Helio G88, 50MP+2MP Rear Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2259138206/2459063969.jpeg",
          "stock": 5
        },
        {
          "id": 9,
          "name": "OnePlus Nord Buds 2R True Wireless Earbuds",
          "price": 7999,
          "originalPrice": 8999,
          "description": "12.4mm Titanium Drivers, 38 Hours Battery Life, IP55 Rating, Low Latency Gaming Mode",
          "category": "Audio",
          "image": "https://ext.same-assets.com/4115036931/3014731663.woff2",
          "stock": 25
        },
        {
          "id": 10,
          "name": "Anker Soundcore R50i Noise Cancellation TWS Earbuds",
          "price": 9499,
          "originalPrice": 11999,
          "description": "Active Noise Cancellation, 10mm Drivers, 30 Hours Battery Life, IPX5 Water Resistance",
          "category": "Audio",
          "image": "https://ext.same-assets.com/2339830959/3668992757.jpeg",
          "stock": 18
        },
        {
          "id": 11,
          "name": "Samsung Galaxy A24 (6GB,128GB) Dual Sim",
          "price": 45999,
          "originalPrice": 49999,
          "description": "6.5 inches Super AMOLED Display, Mediatek Helio G99, 50MP+5MP+2MP Rear Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2633514410/1313566171.jpeg",
          "stock": 7
        },
        {
          "id": 12,
          "name": "P9 Wireless Bluetooth Headphone",
          "price": 999,
          "originalPrice": 3499,
          "description": "Bluetooth 5.0, Foldable Design, 10 Hours Playback, Built-in Mic, Deep Bass",
          "category": "Audio",
          "image": "https://ext.same-assets.com/2633514410/180210149.jpeg",
          "stock": 30
        },
        {
          "id": 13,
          "name": "Loud WC755 Quick Charge 18W Adaptive Fast Wall Charger",
          "price": 795,
          "originalPrice": 1095,
          "description": "18W Fast Charging, Compatible with iOS and Android, Smart IC Protection, Compact Design",
          "category": "Accessories",
          "image": "https://ext.same-assets.com/2633514410/1987537395.jpeg",
          "stock": 45
        },
        {
          "id": 14,
          "name": "Suzuki Alto 2019-2025 Sun Shades",
          "price": 999,
          "originalPrice": 1300,
          "description": "Foldable, Mesh Fabric, Flexible Rods, Dark Black, Packed In Bag, Heat Protection",
          "category": "Automotive",
          "image": "https://ext.same-assets.com/2633514410/897139563.jpeg",
          "stock": 15
        },
        {
          "id": 15,
          "name": "A350 50000mAh Portable Charger Compact Power Bank",
          "price": 2499,
          "originalPrice": 2999,
          "description": "50000mAh Capacity, Dual USB Output, LED Power Indicator, Compatible with All Smartphones",
          "category": "Accessories",
          "image": "https://ext.same-assets.com/2339830959/3283282549.jpeg",
          "stock": 20
        },
        {
          "id": 16,
          "name": "Buckle Grace (Gray) - WE BY RJS",
          "price": 999,
          "originalPrice": 1999,
          "description": "Premium Quality Belt, Adjustable Size, Stylish Gray Color, Durable Construction",
          "category": "Men's Fashion",
          "image": "https://ext.same-assets.com/2633514410/3144759573.jpeg",
          "stock": 22
        },
        {
          "id": 17,
          "name": "Infinix Hot 50 Pro (8GB,128GB) Dual Sim",
          "price": 41899,
          "originalPrice": 46000,
          "description": "6.78 inches IPS LCD Display, Helio G99, 108MP+2MP Rear Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2339830959/3634545170.jpeg",
          "stock": 10
        },
        {
          "id": 18,
          "name": "Infinix Hot 50 Pro Plus (8GB,256GB) Dual Sim",
          "price": 49449,
          "originalPrice": 54449,
          "description": "6.78 inches IPS LCD Display, Helio G99 Ultra, 108MP+2MP+QVGA Rear Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2339830959/211811717.jpeg",
          "stock": 3
        },
        {
          "id": 19,
          "name": "Velvet Printed Embossed Prayer Mat",
          "price": 1490,
          "originalPrice": 1490,
          "description": "Premium Velvet Material, Embossed Design, Non-slip Base, Comfortable Padding, Elegant Pattern",
          "category": "Home & Living",
          "image": "https://ext.same-assets.com/2259138206/2516539614.jpeg",
          "stock": 50
        },
        {
          "id": 20,
          "name": "Ferrari Power Bank 12000mAh with LED Power Indicator",
          "price": 3999,
          "originalPrice": 4999,
          "description": "12000mAh Capacity, Dual USB Output, LED Power Indicator, Premium Ferrari Design",
          "category": "Accessories",
          "image": "https://ext.same-assets.com/2339830959/721685892.jpeg",
          "stock": 15
        },
        {
          "id": 21,
          "name": "Navy Blue (Rose Flower) Printed Shirt With Lining Trouser",
          "price": 1050,
          "originalPrice": 1649,
          "description": "Navy Blue Color, Rose Flower Print, Premium Fabric, Comfortable Fit, Stylish Design",
          "category": "Men's Fashion",
          "image": "https://ext.same-assets.com/2339830959/3774061229.jpeg",
          "stock": 40
        },
        {
          "id": 22,
          "name": "Rose Pink DAFFY DUCK Frock Style (Full Sleeve)",
          "price": 1050,
          "originalPrice": 1649,
          "description": "Rose Pink Color, DAFFY DUCK Design, Full Sleeve, Premium Quality Fabric, Comfortable Wear",
          "category": "Kids Fashion",
          "image": "https://ext.same-assets.com/2339830959/3907442542.jpeg",
          "stock": 35
        },
        {
          "id": 23,
          "name": "Stylish Blue & Beige Cotton Plain Khimar - 1 Pc",
          "price": 990,
          "originalPrice": 990,
          "description": "Blue & Beige Color, Cotton Material, Plain Design, Comfortable Fit, Elegant Look",
          "category": "Women's Fashion",
          "image": "https://ext.same-assets.com/2339830959/2644302562.jpeg",
          "stock": 25
        },
        {
          "id": 24,
          "name": "Power For Men Perfume",
          "price": 2749,
          "originalPrice": 3249,
          "description": "Long-lasting Fragrance, Masculine Scent, Premium Packaging, Perfect for Daily Use",
          "category": "Men's Fragrances",
          "image": "https://ext.same-assets.com/2259138206/4179159172.jpeg",
          "stock": 30
        },
        {
          "id": 25,
          "name": "1 Pc Comfort and Style Swiss Lawn Namaz Chaddar",
          "price": 1389,
          "originalPrice": 1389,
          "description": "Swiss Lawn Material, Comfortable Design, Elegant Style, Premium Quality, Durable Fabric",
          "category": "Islamic Items",
          "image": "https://ext.same-assets.com/2339830959/668810193.jpeg",
          "stock": 40
        },
        {
          "id": 26,
          "name": "Joy Basket",
          "price": 449,
          "originalPrice": 749,
          "description": "Colorful Design, Durable Material, Multi-purpose Storage, Perfect for Home & Office",
          "category": "Home & Living",
          "image": "https://ext.same-assets.com/2633514410/4213081596.jpeg",
          "stock": 50
        },
        {
          "id": 27,
          "name": "JBL Flip 4 Waterproof Portable Bluetooth Speaker",
          "price": 15999,
          "originalPrice": 18999,
          "description": "Waterproof Design, 12 Hours Playback, Wireless Bluetooth Streaming, Built-in Noise Cancelling Speakerphone",
          "category": "Audio",
          "image": "https://ext.same-assets.com/2259138206/2265525780.jpeg",
          "stock": 12
        },
        {
          "id": 28,
          "name": "Samsung EB-PN930CSEG Power Bank",
          "price": 5999,
          "originalPrice": 7499,
          "description": "10000mAh Capacity, Fast Charging, Samsung Original, Compact Design, LED Indicator",
          "category": "Accessories",
          "image": "https://ext.same-assets.com/2259138206/385976503.jpeg",
          "stock": 18
        },
        {
          "id": 29,
          "name": "Diesel Men's Mr Daddy 2.0 Chronograph Watch DZ7348",
          "price": 49999,
          "originalPrice": 58000,
          "description": "Multiple Time Zone Display, 57mm Case Size, Quartz Movement, Water Resistant, Stainless Steel",
          "category": "Watches",
          "image": "https://ext.same-assets.com/2633514410/897139563.jpeg",
          "stock": 5
        },
        {
          "id": 30,
          "name": "Xiaomi Redmi Note 14 (8GB,128GB) Dual Sim",
          "price": 49799,
          "originalPrice": 53000,
          "description": "6.67 inches AMOLED Display, Snapdragon 7s Gen 2, 50MP+8MP+2MP Rear Camera, 5000mAh Battery",
          "category": "Smartphones",
          "image": "https://ext.same-assets.com/2259138206/2830039996.jpeg",
          "stock": 7
        }
      ]

      // Add more products to get to 32

      commit('setProducts', products)
    }
  }
})
