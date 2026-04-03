<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="page">
        <!--This is the top portion of the application :DDDDD -->
        <div class="header">
          <div class="header-top">
            <div class="greeting">
              <p class="greeting sub">Good morning,</p>
              <p class="greeting name">Miss Tokneneng</p> <!--Need to change to the actual username-->
            </div>
            <div class="avatar">MT</div>
          </div>

          <div class="search-bar">
            <ion-icon name="search-outline" class="search-icon"></ion-icon>
            <input
              type="text"
              placeholder="Search vehicles, location..."
              v-model="searchQuery"
              class="search-input"/>
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
          <span
            v-for="cat in categories"
            :key="cat"
            :class="['pill', selectedCategory === cat ? 'pill-active' : '']"
            @click="selectedCategory = cat">{{ cat }}</span>
        </div>

        <!--VEHICLE LISTING-->
        <div class="listings">
          <p class="section-title">Available near you</p>
          <div
          v-for="vehicle in filteredVehicles"
          :key="vehicle.id" class="vehicle-card">
            <div class="card-image">
              <ion-icon
              :name="vehicle.icon" class="vehicle-icon"></ion-icon>
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

    <ion-tab-bar slot="bottom" class="tab-bar">
      <ion-tab-button tab="home" href="/home">
        <ion-icon name="grid-outline"></ion-icon>
        <ion-label>Home</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="profile" href="/profile">
        <ion-icon name="person-outline"></ion-icon>
        <ion-label>Profile</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="listings" href="/listings">
        <ion-icon name="list-outline"></ion-icon>
        <ion-label>Listings</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IonPage, IonContent, IonIcon,
         IonTabBar, IonTabButton, IonLabel
} from '@ionic/vue'
import { addIcons } from 'ionicons'
import { searchOutline, gridOutline, personOutline,
         addCircleOutline, listOutline, carOutline
} from 'ionicons/icons'

addIcons({
  'search-outline': searchOutline,
  'grid-outline': gridOutline,
  'person-outline': personOutline,
  'add-circle-outline': addCircleOutline,
  'list-outline': listOutline,
  'car-outline': carOutline, 
})

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
  id:3,
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
  return vehicles.value.filter(v =>{
    const matchCategory = selectedCategory.value === 'All' || v.type === selectedCategory.value
    const matchSearch = v.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        v.location.toLowerCase().includes(searchQuery.value.toLowerCase())
                        return matchCategory && matchSearch
  })
})

</script>

<style scoped>
.page {
  background-color: black;
  min-height: 100vh;
  position: relative;
}

.header{
  background: #cf9ccd;
}
</style>