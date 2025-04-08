<template>
  <div class="account-page">
    <div class="container">
      <h1>Account</h1>
      <div v-if="!isLoggedIn">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit" class="login-btn">Login</button>
        </form>
      </div>
      <div v-else>
        <p>Welcome, {{ username }}!</p>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      username: localStorage.getItem('username') || '',
      password: '',
      isLoggedIn: !!localStorage.getItem('username')
    }
  },
  methods: {
    login() {
      localStorage.setItem('username', this.username)
      this.isLoggedIn = true
      
      // 跳转到首页
      this.$router.push('/')
      
      // 刷新页面以更新顶部导航栏中的用户名显示
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    logout() {
      localStorage.removeItem('username')
      this.username = ''
      this.password = ''
      this.isLoggedIn = false
    }
  }
}
</script>

<style scoped>
.account-page {
  padding: 48px 0;
  text-align: center;
  background-color: #121212;
  color: #e0e0e0;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 400px;
  margin: 0 auto;
  background-color: #1a1a1a;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  border-color: #22c55e;
}

h1 {
  font-size: 28px;
  margin-bottom: 24px;
  color: #ffffff;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
}

h1:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #22c55e;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #e0e0e0;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #444;
  border-radius: 6px;
  background-color: #252525;
  color: #e0e0e0;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #22c55e;
  outline: none;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

.login-btn, .logout-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.login-btn:hover, .logout-btn:hover {
  background-color: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34, 197, 94, 0.4);
}
</style>
