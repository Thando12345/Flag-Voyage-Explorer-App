<template>
  <div class="home">
    <h2>Explore Country Flags</h2>
    
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search countries..." 
        class="search-input"
        @input="filterCountries"
      />
      <button @click="filterCountries" class="search-button">Search</button>
    </div>
    
    <div v-if="loading" class="loading">
      <div class="skeleton-grid">
        <country-card-skeleton v-for="n in 12" :key="n" />
      </div>
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else>
      <p class="country-count">Showing {{ filteredCountries.length }} countries</p>
      
      <div v-if="filteredCountries.length === 0" class="no-results">
        No countries found matching your search.
      </div>
      
      <div v-else class="flag-grid">
        <country-card 
          v-for="country in filteredCountries" 
          :key="country.name" 
          :country="country" 
          @click="goToCountryDetail(country.name)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CountryCard from '../components/CountryCard.vue'
import CountryCardSkeleton from '../components/CountryCardSkeleton.vue'
import countryService from '../services/countryService'

export default {
  name: 'HomeView',
  components: {
    CountryCard,
    CountryCardSkeleton
  },
  setup() {
    const router = useRouter()
    const countries = ref([])
    const searchQuery = ref('')
    const loading = ref(true)
    const error = ref(null)

    const filteredCountries = computed(() => {
      if (!searchQuery.value) return countries.value
      
      const query = searchQuery.value.toLowerCase()
      return countries.value.filter(country => 
        country.name.toLowerCase().includes(query) || 
        (country.capital && country.capital.toLowerCase().includes(query)) ||
        (country.region && country.region.toLowerCase().includes(query))
      )
    })

    const fetchCountries = async () => {
      try {
        loading.value = true
        countries.value = await countryService.getAllCountries()
        loading.value = false
      } catch (err) {
        error.value = 'Failed to load countries. Please try again later.'
        loading.value = false
        console.error('Error fetching countries:', err)
      }
    }

    const filterCountries = () => {
      // This function is called on input changes
      // The filtering is handled by the computed property
    }

    const goToCountryDetail = (name) => {
      router.push({ name: 'country-detail', params: { name } })
    }

    onMounted(() => {
      fetchCountries()
    })

    return {
      countries,
      filteredCountries,
      searchQuery,
      loading,
      error,
      filterCountries,
      goToCountryDetail
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px 0;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.search-container {
  display: flex;
  max-width: 600px;
  margin: 0 auto 30px;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.search-button {
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #2980b9;
}

.country-count {
  text-align: center;
  margin-bottom: 20px;
  color: #666;
}

.loading, .error, .no-results {
  text-align: center;
  margin: 40px 0;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.no-results {
  color: #666;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.skeleton-card {
  height: 250px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Responsive grid */
.flag-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 576px) {
  .flag-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .flag-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 992px) {
  .flag-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>