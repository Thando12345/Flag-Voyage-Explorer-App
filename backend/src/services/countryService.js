const axios = require('axios');

// Service for handling country data operations
const countryService = {
  // Get all countries
  getAllCountries: async () => {
    try {
      console.log('Fetching all countries from external API...');
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region');
      console.log(`Received ${response.data.length} countries from API`);
      
      // Format the response according to the Swagger spec
      const formattedData = response.data.map(country => ({
        name: country.name.common,
        flag: country.flags?.png || country.flags?.svg || '',
        region: country.region || '',
        population: country.population || 0,
        capital: country.capital?.[0] || ''
      }));
      
      console.log(`Returning ${formattedData.length} formatted countries`);
      return formattedData;
    } catch (error) {
      console.error('Error in countryService.getAllCountries:', error);
      throw error;
    }
  },

  // Get a specific country by name
  getCountryByName: async (name) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,region,languages,currencies,borders`);
      
      if (!response.data || response.data.length === 0) {
        return null;
      }
      
      const country = response.data[0];
      
      // Format the response according to the Swagger spec
      return {
        name: country.name.common,
        population: country.population,
        capital: country.capital?.[0] || 'N/A',
        flag: country.flags?.png || country.flags?.svg || '',
        region: country.region || '',
        languages: country.languages ? Object.values(country.languages) : [],
        currencies: country.currencies ? Object.keys(country.currencies).map(key => country.currencies[key].name) : [],
        borders: country.borders || []
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      console.error(`Error in countryService.getCountryByName for ${name}:`, error);
      throw error;
    }
  }
};

module.exports = countryService;