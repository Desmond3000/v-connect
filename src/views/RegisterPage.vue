<template>
  <ion-page>
    <ion-content :fullscreen="true">
  <div class="page">
      <img src="@/assets/new-bg.png" alt="Vcon Background" class="bg-mobile"/>
      <img src="@/assets/v-connect-bg-web.png" alt="Vcon Background" class="bg-web"/>
    <div class="container">
       <img src="@/assets/v-connect.png" alt="vcunt logo" class="logo" />
      <div class="glass-panel">
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
          <label>contact_number</label>
          <div class="input-wrapper">
            <input type="text" placeholder="Enter Contact Number" v-model="contact_number">
          </div>
        </div>

        <div class="form-group">
          <label>Address</label>
          <div class="input-wrapper">
            <input type="text" placeholder="Enter Home Address" v-model="address">
          </div>
        </div>

        <div class="form-group">
          <label>Drivers License</label>
          <div class="input-wrapper">
            <input type="text" placeholder="Enter Driver's License" v-model="drivers_license">
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
        <p class="register-link" @click="goLogin">
          Already Have an Account
        </p>
      </div>
    </div>
  </div>
  </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { useIonRouter } from '@ionic/vue'
import { IonPage, IonContent } from '@ionic/vue'
import axios from 'axios'

const router = useIonRouter()

const goLogin = () => {
  router.push('/login')
}



const username = ref('')
const email = ref('')
const password = ref('')
const confirmpassword = ref('')
const errorMessage = ref('')
const address = ref('')
const contact_number = ref('')
const drivers_license = ref('')

const register = async () => {
  if (!username.value || !email.value || !password.value || !confirmpassword.value || !address.value || !contact_number.value || !drivers_license.value) {
    errorMessage.value = 'Fill in all fields'
    return
  }

  if (password.value != confirmpassword.value) {
    errorMessage.value = 'Passwords do not match!'
    return
  }

  try{
    await axios.post('http://localhost:3000/api/auth/register',{
      name: username.value,
      email: email.value,
      contact_number: contact_number.value,
      address: address.value,
      drivers_license: drivers_license.value,
      password: password.value
      })


    router.push('/login')
  } catch(err){
    errorMessage.value=err.response?.data?.message || 'Registration failed.'
  }
  }
</script>

<style scoped>
.page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.bg-mobile{
  display:block;
  position:absolute;
  top: 0;
  left:0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 0;
}

.bg-web{
  display:none;
  position:absolute;
  top: 0;
  left:0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 0;
}

@media (min-width: 768px){
  .bg-mobile{
    display:none;
  }

  .bg-web{
    display: block;
  }
}

.logo {
  display: block;
  margin: 20px auto;
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 0px;
  filter:drop-shadow(0 0 15px rgba(3, 3, 66, 0.7)); 
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
.glass-panel {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  padding: 10px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  width:332px;
}

.title {
  font-family: 'Planet Kosmos', sans-serif;
  text-align: flex-start;
  font-size: 50px;
  margin-bottom: 0px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 250px;
  max-width:400px;
  gap: 6px;
  margin-left: 30px;
  margin-right: 30px;
}

.form-group label {
  font-family: 'Gil Sans MT', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  margin-top: 7px;
  color: aliceblue;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px 10px;
  gap: 10px;
}

.input-wrapper input {
  font-family: 'Gil Sans MT', sans-serif;
  border: none;
  outline: none;
  width: 100%;
  font-size: 0.7rem;
  background: transparent;
  color: #ffffff;
}

.btn {
  width: 200px;
  max-width: 400px;
  padding: 14px;
  background-color: #b70b67;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 10px;
}

.btn:hover {
  background-color: brown;
}

.register-link {
  font-size: 13px;
}

.bg-image{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  object-fit: cover;
  z-index:0;
}
</style>