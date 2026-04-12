<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="page">
        
        <!--This is the top portion of the application :DDDDD -->
        <div class="header">
          <img src="@/assets/giphy.gif" alt="header-bg" class="backgroundHeader">
          <img src="@/assets/v-connect.png" alt="vcunt logo" class="logo" />
          <div class="header-top">
            <div class="greeting">
              <p class="greeting-sub">Good Day!</p>
              <p class="greeting-name">{{ userName }}</p> 
            </div>
          
          <!--HEADER AVATAR-->
          <div class="avatar-wrapper">  
            <div class="avatar" @click="toggleMenu">{{ userInitials }}</div> <!--should be clickable-->
            <div class="dropdown-menu" v-if="showMenu">
              <div class="dropdown-item" @click="goToProfile">
                <ion-icon name="person-outline"></ion-icon>
                <span>Profile</span>
              </div>
              <div class="dropdown-item" @click="goToSettings">
                <ion-icon name="settings-outline"></ion-icon>
                <span>Settings</span>
              </div>
              <div class="dropdown-divider"></div>
              <div class="dropdown-item" @click="logout">
                <ion-icon name="log-out-outline"></ion-icon>
                <span>Logout</span>
              </div>
            </div>
          </div>  
          
        
        </div>

          <div class="search-bar"> <!--should be clickable-->
            <ion-icon name="search-outline" class="search-icon"></ion-icon>
            <input type="text" placeholder="Search vehicles, location..." v-model="searchQuery" class="search-input" />
          </div>
        </div>

        <div class="filters">
          <div class="filter-chip">
            <p class="chip-label">Vehicle Type</p>
            <p class="chip-value">All Types</p>
          </div>
          <div class="filter-chip">
            <p class="chip-label">Seats</p>
            <p class="chip-value">Any</p>
          </div>
          <div class="filter-chip">
            <p class="chip-label">Dates</p>
            <p class="chip-value">Any</p>
          </div>
        </div>

        <!--CATEGORY PILLS-->
        <div class="categories">
          <span v-for="cat in categories" :key="cat" :class="['pill', selectedCategory === cat ? 'pill-active' : '']"
            @click="selectedCategory = cat">{{ cat }}</span>
        </div>
        
        <div v-if="isLoading" class="listings">
          <p class="section-title">Loading vehicles...</p>
        </div>

        <div v-else-if="filteredVehicles.length === 0" class="listings">
          <p class="section-title">No vehicles available</p>
        </div>

        <!--VEHICLE LISTING-->
        <div class="listings" v-else>
          <p class="section-title">Available near you</p>
          <div v-for="vehicle in filteredVehicles" :key="vehicle.Vehicle_ID" class="vehicle-card">
            
            <div class="card-image">
              <ion-icon name="car-outline" class="vehicle-icon"></ion-icon>
            </div>
            <div class="card-body">
              <div class="card-row">
                <div>
                  <p class="vehicle-name">{{ vehicle.Vehicle_Model }}</p>
                  <p class="vehicle-info">{{ vehicle.Vehicle_Type }} · {{ vehicle.Seat_Capacity }} seats · {{ vehicle.Owner_Address || 'Naga City' }}</p>
                  <span class="badge-available">{{ vehicle.Vehicle_Status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

    <div class="tab-bar">
      <div class="tab-item active" @click="goTo('/home')">
        <ion-icon name="grid-outline"></ion-icon>
        <span>Home</span>
      </div>

      <div class="tab-item" @click="goTo('/chat')">
        <ion-icon name="chatbubble-outline"></ion-icon>
        <span>Chat</span>
      </div>

      <div class="tab-item" @click="goTo('/post')">
        <div class="plus-btn">
          <ion-icon name="add-outline"></ion-icon>
        </div>
        <span>Post</span>
      </div>

      <div class="tab-item" @click="goTo('/listings')">
        <ion-icon name="list-outline"></ion-icon>
        <span>Listing</span>
      </div>

      <div class="tab-item" @click="goTo('/notifications')">
        <ion-icon name="notifications-outline"></ion-icon>
        <span>Alerts</span>
      </div>

    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  IonPage, IonContent, IonIcon,
  useIonRouter, onIonViewWillEnter
} from '@ionic/vue'
import { addIcons } from 'ionicons'
import {
  searchOutline, gridOutline,
  addCircleOutline, carOutline, addOutline, notificationsOutline, listOutline, chatbubbleOutline,
  personOutline, settingsOutline, logOutOutline
} from 'ionicons/icons'
import { vehicleAPI } from '@/api'

addIcons({
  'search-outline': searchOutline,
  'grid-outline': gridOutline,
  'notifications-outline': notificationsOutline,
  'add-circle-outline': addCircleOutline,
  'car-outline': carOutline,
  'add-outline': addOutline,
  'list-outline': listOutline,
  'chatbubble-outline': chatbubbleOutline,
  'person-outline': personOutline,
  'settings-outline': settingsOutline,
  'log-out-outline': logOutOutline
})

const router = useIonRouter()
const searchQuery = ref('')
const selectedCategory = ref('All')
const userName = ref('Guest')
const userInitials = ref('??')
const categories = ['All', 'Tricycle', 'Motorcycle', 'Car', 'Van']
const vehicles = ref([])
const isLoading = ref(false)

const loadUser = () => {
  const savedUser = localStorage.getItem('user')
  if (savedUser){
    const user = JSON.parse(savedUser)
    userName.value = user.name || 'Guest'

    const names = user.name.split(' ')
    userInitials.value = names.map((n:string) => n[0]).join('').toUpperCase().slice(0, 2)
  }
}

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const goToProfile =() => {
  showMenu.value = false
  router.push('/profile')
}

const goToSettings =() =>{
  showMenu.value = false
  router.push('/settings')
}

const logout = () => {
  showMenu.value = false
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}

const closeMenu = (e: Event) => {
  const target = e.target as HTMLElement
  if (!target.closest('.avatar-wrapper')){
    showMenu.value = false
  }
}


onIonViewWillEnter (async () => {
  loadUser()
  await loadVehicles()
})

onMounted(async () => {
  loadUser()
  await loadVehicles()
  document.addEventListener('click', closeMenu)
})

onUnmounted (() => {
  document.removeEventListener('click', closeMenu)
})

const loadVehicles = async () =>{
  isLoading.value = true
  try{
    const response = await vehicleAPI.getAll()
    vehicles.value = response.data.data
    console.log('Vehicles:', vehicles.value)
  }
  catch(err){
    console.error('Failed to load vehicles', err)
  }
  finally{
    isLoading.value = false
  }
}
const filteredVehicles = computed(() => {
  return vehicles.value.filter((v: any) => {
    const matchCategory = selectedCategory.value === 'All' || v.Vehicle_Type === selectedCategory.value
    const matchSearch = v.Vehicle_Model.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      v.Owner_Address?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      v.Owner_Name?.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchSearch
  })
})

const goTo = (path: string) => router.push(path)
</script>

<style scoped>
.page {
  background: #f4f6f9;
  min-height: 100vh;
}

.header {
  background: #1a3a5c;
  padding: 70px 16px 24px;
  position: relative;
  padding: 130px 16px 15px;
  overflow: visible;
}


.backgroundHeader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.7;
}

.logo {
  position: absolute;
  top: 12px;
  left: 16px;
  width: 30px;
  height: 30px;
  object-fit: contain;
  filter: drop-shadow(0 0 15px rgba(3, 3, 66, 0.7));
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
  opacity: 1;
}

.greeting-sub {
  font-family: 'Gil Sans MT', sans-serif;
  color: #ffffff;
  font-size: 15px;
  margin: 0;
}

.greeting-name {
  font-family: 'Gil Sans MT', sans-serif;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin: 4px 0 0;
}

.avatar-wrapper{
  position:relative;
  z-index: 999;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #b83a96;
  color: #e8f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.dropdown-menu{
  position: absolute;
  top:50px;
  right: 0;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  min-width: 180px;
  overflow: hidden;
  z-index: 200;
}

.dropdown-item{
  display: flex;
  align-items: center;
  gap:12px;
  padding: 14px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #1a1a2e;
  transition: background 0.2s;
}

.dropdown-item:hover{
  background: #f4f6f9;
}

.dropdown-item ion-icon{
  font-size: 18px;
  color: #1a3a5c;
}

.dropdown-divider{
  height: 0.5px;
  background: #e0e0e0;
  margin: 4px 0;
}

.dropdown-item.logout{
  color: #a83434;
}

.dropdown-item.logout ion-icon{
  color: #a83434;
}

.search-bar {
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
  background: transparent;
  z-index: 10;
}

.search-icon {
  color: #ffffff;
  font-size: 18px;
  opacity: 1;
}

.search-input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  color: #ffffff;
  background: transparent;
  opacity: 1;
  z-index: 10;
  pointer-events: all;
}

.filters {
  display: flex;
  gap: 10px;
  padding: 12px 16px;
  background: #f4f6f9;
}

.filter-chip {
  background: #ffffff;
  border: 0.5px solid #ddd;
  border-radius: 10px;
  padding: 8px 12px;
  flex: 1;
  text-align: center;
}

.chip-label {
  font-size: 10px;
  color: #999;
  margin: 0 0 2px;
}

.chip-value {
  font-size: 12px;
  font-weight: 600;
  color: #1a3a5c;
  margin: 0;
}

.categories {
  display: flex;
  gap: 8px;
  padding: 0 16px 12px;
  overflow-x: auto;
}

.pill {
  background: #ffffff;
  color: #888;
  font-size: 12px;
  padding: 6px 16px;
  border-radius: 20px;
  white-space: nowrap;
  border: 0.5px solid #ddd;
  cursor: pointer;
}

.pill-active {
  background: #fc89d0;
  color: #ffffff;
  filter: drop-shadow(0 0 1px rgba(3, 3, 66, 0.7));
}

.listings {
  padding: 0 16px 100px;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: #888;
  margin: 0 0 12px;
}

.vehicle-card {
  background: #ffffff;
  border-radius: 14px;
  border: 0.5px solid #e0e0e0;
  margin-bottom: 14px;
  overflow: hidden;
}

.card-image {
  background: #e8f0f8;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vehicle-icon {
  font-size: 48px;
  color: #2d6a9f;
  opacity: 0.5;
}

.card-body {
  padding: 12px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.vehicle-name {
  font-family: 'Gil Sans MT', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 2px;
}

.vehicle-info {
  font-family: 'Gil Sans MT', sans-serif;
  font-size: 12px;
  color: #888;
  margin: 0 0 6px;
}

.badge-available {
  font-family: 'Gil Sans MT', sans-serif;
  background: #eaf3de;
  color: #3b6d11;
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 20px;
}


.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  border-top: 0.5px solid #e0e0e0;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  z-index: 100;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #888;
  font-size: 10px;
}

.tab-item ion-icon {
  font-size: 22px;
}

.tab-item.active {
  color: #fc89d0;
}

.plus-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ef70be;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -24px;
  box-shadow: 0 4px 12px rgba(255, 137, 208, 0.5);
}

.plus-btn ion-icon {
  font-size: 26px;
  color: rgb(255, 255, 255);
}
</style>