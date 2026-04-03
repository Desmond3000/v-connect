<template>
  <div class="page">

    <div class="container">
      <div class="panel">
        <img src="@/assets/v-connect.png" alt="vcunt logo" class="logo" />
        <h1 class="title">SIGN UP</h1>
        <p class="error-txt" v-if="errorMessage">{{ errorMessage }}</p>

        <div class="form-group">
          <label>Username</label>
          <div class="input-wrapper">
            <input type="text" placeholder="Create Username" v-model="username" />
          </div>
        </div>

        <div class="form-group">
          <label>Email</label>
          <div class="input-wrapper">
            <input type="text" placeholder="Enter Email" v-model="email">
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <div class="input-wrapper">
            <input type="text" placeholder="Create Password" v-model="password">
          </div>
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <div class="input-wrapper">
            <input type="text" placeholder="Confirm Password" v-model="confirmpassword">
          </div>
        </div>

        <button class="btn" @click="register">SIGN UP</button>
        <p class="register-link">
          <router-link to="login">Already Have an Account</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmpassword = ref('')
const errorMessage = ref('')

const register = async () => {
  if (!username.value || !email.value || !password.value || !confirmpassword.value) {
    errorMessage.value = 'Fill in all fields'
    return
  }

  if (password.value != confirmpassword.value) {
    errorMessage.value = 'Passwords do not match!'
    return
  }

}
</script>

<style scoped>
.page {
  background-color: black;
  min-height: 100vh;
  position: relative;
}

.logo {
  display: block;
  margin: 0 auto 20px auto;
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  gap: 12px;
  padding: 50px;
}

.title {
  font-family: 'Planet Kosmos', sans-serif;
  text-align: center;
  font-size: 50px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 320px;
  gap: 6px;
}

.form-group label {
  font-family: 'Cascadia Code', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  margin-top: 10px;
  color: aliceblue;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px 10px;
  background: white;
  gap: 10px;
}

.input-wrapper input {
  font-family: 'Cocogoose Classic Trial', sans-serif;
  border: none;
  outline: none;
  width: 100%;
  font-size: 0.8rem;
  background: transparent;
  color: #1a1a2e;
}

.btn {
  width: 320px;
  padding: 14px;
  background-color: #1a1a2e;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}

.btn:hover {
  background-color: brown;
}

.register-link {
  font-size: 13px;
}
</style>