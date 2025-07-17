<template>
  <div class="flag-card">
    <div class="flag-image-container">
      <img 
        :src="country.flag" 
        :alt="`Flag of ${country.name}`" 
        class="flag-image"
        @error="handleImageError"
      >
      <span v-if="country.region" class="region-badge">{{ country.region }}</span>
    </div>
    <div class="flag-info">
      <h3 class="flag-name">{{ country.name }}</h3>
      <p v-if="country.population" class="population">
        <strong>Population:</strong> {{ formatPopulation(country.population) }}
      </p>
      <p v-if="country.capital" class="capital">
        <strong>Capital:</strong> {{ country.capital }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountryCard',
  props: {
    country: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleImageError(e) {
      // Set a placeholder image if the flag image fails to load
      e.target.src = '/placeholder.svg'
    },
    formatPopulation(population) {
      if (population >= 1000000) {
        return `${(population / 1000000).toFixed(1)}M`
      } else if (population >= 1000) {
        return `${(population / 1000).toFixed(1)}K`
      } else {
        return population.toString()
      }
    }
  }
}
</script>

<style scoped>
.flag-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.flag-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.flag-card:hover .flag-image {
  transform: scale(1.05);
}

.flag-image-container {
  position: relative;
  height: 128px;
  overflow: hidden;
}

.flag-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.region-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.flag-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.flag-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.population, .capital {
  font-size: 0.9rem;
  margin: 0;
  color: #555;
}
</style>