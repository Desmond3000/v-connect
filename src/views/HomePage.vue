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
              <p class="greeting-name">Miss Tokneneng</p> <!--Need to change to the actual username-->
            </div>
            <div class="avatar">MT</div> <!--should be clickable-->
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

        <!--VEHICLE LISTING-->
        <div class="listings">
          <p class="section-title">Available near you</p>
          <div v-for="vehicle in filteredVehicles" :key="vehicle.id" class="vehicle-card">
            <div class="card-image">
              <ion-icon :name="vehicle.icon" class="vehicle-icon"></ion-icon>
            </div>
            <div class="card-body">
              <div class="card-row">
                <div>
                  <p class="vehicle-name">{{ vehicle.name }}</p>
                  <p class="vehicle-info">{{ vehicle.type }} · {{ vehicle.seats }} seats · {{ vehicle.location }}</p>
                  <span class="badge-available">Available</span>
                </div>
                <div class="price-box">
                  <p class="price">Php{{ vehicle.price }}</p>
                  <p class="price-label">/day</p>
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

      <div class="tab-item" @click="goTo('/post')">
        <div class="plus-btn">
          <ion-icon name="add-outline"></ion-icon>
        </div>
        <span>Post</span>
      </div>

      <div class="tab-item" @click="goTo('/notifications')">
        <ion-icon name="notif-outline"></ion-icon>
        <span>Alerts</span>
      </div>

    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  IonPage, IonContent, IonIcon,
  useIonRouter,
} from '@ionic/vue'
import { addIcons } from 'ionicons'
import {
  searchOutline, gridOutline,
  addCircleOutline, carOutline, addOutline, notificationsOutline
} from 'ionicons/icons'

addIcons({
  'search-outline': searchOutline,
  'grid-outline': gridOutline,
  'notif-outline': notificationsOutline,
  'add-circle-outline': addCircleOutline,
  'car-outline': carOutline,
  'add-outline': addOutline
})

const router = useIonRouter()

const goTo = (path: string) => {
  router.push(path)
}
const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = ['All', 'Tricycle', 'Motorcycle', 'Car', 'Van']
const vehicles = ref([
  {
    id: 1,
    name: 'Toyota Vios 2022',
    type: 'Car',
    seats: 5,
    location: 'Dayangdang',
    price: 800,
    icon: 'car-outline',
    status: 'available'
  },
  {
    id: 2,
    name: 'Honda TMX 125',
    type: 'Motorcycle',
    seats: 2,
    location: 'Penafrancia',
    price: 350,
    icon: 'car-outline',
    status: 'available'
  },
  {
    id: 3,
    name: 'Tricycle',
    type: 'Tricycle',
    seats: 6,
    location: 'Dayangdang',
    price: 200,
    icon: 'car-outline',
    status: 'available'
  },
  {
    id: 4,
    name: 'Toyota Hi-Ace Van',
    type: 'Van',
    seats: 12,
    location: 'CBD Naga',
    price: 1500,
    icon: 'car-outline',
    status: 'available'
  },
])

const filteredVehicles = computed(() => {
  return vehicles.value.filter(v => {
    const matchCategory = selectedCategory.value === 'All' || v.type === selectedCategory.value
    const matchSearch = v.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      v.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchSearch
  })
})

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
  overflow: hidden;
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

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #e67dca;
  color: #e8f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
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

.price-box {
  text-align: right;
}

.price {
  font-family: 'Gil Sans MT', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #1a3a5c;
  margin: 0;
}

.price-label {
  font-family: 'Gil Sans MT', sans-serif;
  font-size: 11px;
  color: #999;
  margin: 0;
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
  background: #fc89d0;
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