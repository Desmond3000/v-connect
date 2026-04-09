<template>
  <ion-page>
    <ion-content :fullscreen="true">
  <div class="page">
    <img src="@/assets/new-bg.png" alt="Vcon Background" class="bg-image"/>
    <div class="container">
              <img src="@/assets/v-connect.png" alt="vcunt logo" class="logo" />
      <div class="glass-panel">

        <h1 class="title">LOGIN</h1>
        <p class="error-txt" v-if="errorMessage">{{ errorMessage }}</p>

        <!--Email-->
        <div class="form-group">
          <label>Email</label>
          <div class="input-wrapper">
            <input type="text" placeholder="Enter Email" v-model="email" />
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <div class="input-wrapper">
            <input type="password" placeholder="Enter Password" v-model="password" />
          </div>
          <p class="forgot" @click="forgotPassword">Forgot Password</p>
        </div>

        <button class="btn" @click="login">LOGIN</button>
        <p class="register-link" @click="goRegister">
          Create New Account
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

const router = useIonRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const goRegister = () =>{
  router.push('/Register')
}


const login = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields'
    return
  }
  router.push('/home')
}

const forgotPassword = () => {
  console.log('Forgot password clicked')
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
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
  padding: 20px;
  margin-top: center;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  width:600px;
  max-width: 95%;

}

.title {
  font-family: 'Planet Kosmos', sans-serif;
  text-align: center;
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

.forgot {
  font-family: 'Gil Sans MT', sans-serif;
  text-align: right;
  font-size: 0.80rem;
  color: #888;
  cursor: pointer;
  margin-top: 4px;
}

.forgot:hover {
  color: #1a1a2e;
}

.btn {
  width: 100%;
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
}

.btn:hover {
  background-color: #4263bc;
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