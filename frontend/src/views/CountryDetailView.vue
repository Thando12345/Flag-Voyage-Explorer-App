<template>
  <div class="country-detail">
    <router-link to="/" class="btn">&larr; Back to All Countries</router-link>
    
    <div v-if="loading" class="loading">
      <div class="skeleton-detail"></div>
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="country" class="country-info">
      <h2>{{ country.name }}</h2>
      <img :src="country.flag" :alt="`Flag of ${country.name}`" class="country-flag">
      
      <div class="details">
        <div class="detail-section">
          <h3>General Information</h3>
          <p><strong>Region:</strong> {{ country.region || 'N/A' }}</p>
          <p><strong>Capital:</strong> {{ country.capital || 'N/A' }}</p>
          <p><strong>Population:</strong> {{ formatPopulation(country.population) }}</p>
        </div>
        
        <div v-if="country.languages && country.languages.length" class="detail-section">
          <h3>Languages</h3>
          <ul class="detail-list">
            <li v-for="(language, index) in country.languages" :key="index">{{ language }}</li>
          </ul>
        </div>
        
        <div v-if="country.currencies && country.currencies.length" class="detail-section">
          <h3>Currencies</h3>
          <ul class="detail-list">
            <li v-for="(currency, index) in country.currencies" :key="index">{{ currency }}</li>
          </ul>
        </div>
        
        <div v-if="country.borders && country.borders.length" class="detail-section">
          <h3>Border Countries</h3>
          <div class="border-countries">
            <span v-for="border in country.borders" :key="border" class="border-tag">
              {{ border }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import countryService from '../services/countryService'

export default {
  name: 'CountryDetailView',
  setup() {
    const route = useRoute()
    const country = ref(null)
    const loading = ref(true)
    const error = ref(null)

    const fetchCountryDetails = async () => {
      const countryName = route.params.name
      try {
        loading.value = true
        country.value = await countryService.getCountryByName(countryName)
        loading.value = false
      } catch (err) {
        error.value = 'Failed to load country details. Please try again later.'
        loading.value = false
        console.error(`Error fetching country ${countryName}:`, err)
      }
    }

    const formatPopulation = (population) => {
      return new Intl.NumberFormat().format(population)
    }

    onMounted(() => {
      fetchCountryDetails()
    })

    return {
      country,
      loading,
      error,
      formatPopulation
    }
  }
}
</script>

<style scoped>
.loading, .error {
  text-align: center;
  margin: 40px 0;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.skeleton-detail {
  height: 500px;
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

.country-info h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
}

.country-flag {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 30px;
  display: block;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

@media (min-width: 768px) {
  .details {
    grid-template-columns: repeat(2, 1fr);
  }
}

.detail-section {
  margin-bottom: 20px;
}

.detail-section h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.detail-section p {
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-list li {
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.border-countries {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.border-tag {
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>