<template>
  <ion-page>
    <ion-content>
  <div class="page">
    <img src="@/assets/new-bg.png" class="bg-image" />

    <div class="container">

      <!-- Header -->
      <div class="post-header">
        <div class="back-btn" @click="goBack">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        <h1 class="header-title">Post a Vehicle</h1>
      </div>

      <!-- Form -->
      <div class="form-card">

        <!-- Photo Upload -->
        <div class="photo-upload" @click="triggerUpload">
          <input type="file" ref="fileInput" accept="image/*" @change="handlePhoto" style="display:none" />
          <div v-if="!photoPreview" class="upload-placeholder">
            <ion-icon name="camera-outline" class="camera-icon"></ion-icon>
            <p>Tap to upload vehicle photo</p>
          </div>
          <img v-else :src="photoPreview" class="photo-preview" />
        </div>

        <!-- Vehicle Type -->
        <div class="form-group">
          <label>Vehicle Type</label>
          <select v-model="form.vehicleType" class="input-field">
            <option value="" disabled>Select type</option>
            <option>Tricycle</option>
            <option>Motorcycle</option>
            <option>Car</option>
            <option>Van</option>
          </select>
        </div>

        <!-- Vehicle Model -->
        <div class="form-group">
          <label>Vehicle Model</label>
          <input type="text" placeholder="e.g. Toyota Vios 2022" v-model="form.vehicleModel" class="input-field" />
        </div>

        <div class="form-group">
          <label>Vehicle Color</label>
          <input type="text" placeholder="e.g. White" v-model="form.vehicleColor" class="input-field" />
        </div>

        <!-- Seat Capacity -->
        <div class="form-group">
          <label>Seat Capacity</label>
          <input type="number" placeholder="e.g. 5" v-model="form.seatCapacity" class="input-field" />
        </div>

        <!-- Location: FOREIGN KEY: Owner_Account_ID -->

        <!-- Seat Capacity -->
        <div class="form-group">
          <label>Plate Number</label>
          <input type="text" placeholder="Enter registered plate number" v-model="form.plateNumber" class="input-field" />
        </div>

        <!-- With/Without Driver -->
        <div class="form-group">
          <label>Driver Option</label>
          <div class="driver-options">
            <div :class="['driver-btn', form.withDriver === 'with' ? 'driver-active' : '']"
              @click="form.withDriver = 'with'">
              With Driver
            </div>
            <div :class="['driver-btn', form.withDriver === 'without' ? 'driver-active' : '']"
              @click="form.withDriver = 'without'">
              Without Driver
            </div>
            <div :class="['driver-btn', form.withDriver === 'both' ? 'driver-active' : '']"
              @click="form.withDriver = 'both'">
              Both
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <p class="error-txt" v-if="errorMessage">{{ errorMessage }}</p>

        <!-- Submit Button -->
        <button class="btn" @click="submitPost">POST VEHICLE</button>

      </div>
    </div>
  </div>
  </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useIonRouter, IonIcon, IonPage, IonContent } from '@ionic/vue'
import { addIcons } from 'ionicons'
import {
  arrowBackOutline,
  cameraOutline
} from 'ionicons/icons'

addIcons({
  'arrow-back-outline': arrowBackOutline,
  'camera-outline': cameraOutline
})

const router = useIonRouter()

const fileInput = ref(null)
const photoPreview = ref(null)
const errorMessage = ref('')

const form = reactive({
  vehicleType: '',
  vehicleModel: '',
  seatCapacity: '',
  location: '',
  price: '',
  availableFrom: '',
  availableUntil: '',
  withDriver: ''
})

const goBack = () => {
  router.back()
}

const triggerUpload = () => {
  fileInput.value.click()
}

const handlePhoto = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const submitPost = () => {
  if (
    !form.vehicleType ||
    !form.vehicleModel ||
    !form.seatCapacity ||
    !form.plateNumber||
    !form.withDriver
  ) {
    errorMessage.value = 'Please fill in all fields'
    return
  }
  errorMessage.value = ''

  console.log('Redirecting...')
  router.push('/listings')
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding-bottom: 40px;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.9;
}

.container {
  position: relative;
  z-index: 1;
  padding: 48px 16px 40px;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.back-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  font-size: 20px;
}

.header-title {
  font-family: 'Gil Sans MT', sans-serif;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.form-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.photo-upload {
  border: 2px dashed rgba(255, 255, 255, 0.5);
  border-radius: 14px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
}

.camera-icon {
  font-size: 36px;
}

.upload-placeholder p {
  font-size: 13px;
  margin: 0;
}

.photo-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-family: 'Gil Sans MT', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
}

.input-field {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  color: #ffffff;
  outline: none;
  width: 100%;
  font-family: 'Gil Sans MT', sans-serif;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

select.input-field option {
  color: #1a1a2e;
  background: #ffffff;
}

.driver-options {
  display: flex;
  gap: 8px;
}

.driver-btn {
  flex: 1;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
}

.driver-active {
  background: #fc89d0;
  border-color: #fc89d0;
  color: #ffffff;
}

.error-txt {
  color: #ff6b6b;
  font-size: 13px;
  text-align: center;
  margin: 0;
}

.btn {
  width: 100%;
  padding: 14px;
  background: #b70b67;
  color: #ffffff;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 6px;
}

.btn:hover {
  background: #fc89d0;
}
</style>