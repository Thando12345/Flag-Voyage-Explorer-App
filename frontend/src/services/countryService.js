import axios from 'axios'

const API_URL = 'http://localhost:3000'

const countryService = {
  /**
   * Get all countries
   * @returns {Promise<Array>} Array of country objects
   */
  getAllCountries: async () => {
    try {
      console.log('Frontend: Fetching countries from API:', `${API_URL}/countries`);
      const response = await axios.get(`${API_URL}/countries`);
      console.log('Frontend: Received countries data:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('Error fetching all countries:', error);
      console.error('Error details:', error.response?.data || 'No response data');
      throw error;
    }
  },

  /**
   * Get a specific country by name
   * @param {string} name - Country name
   * @returns {Promise<Object>} Country details object
   */
  getCountryByName: async (name) => {
    try {
      const response = await axios.get(`${API_URL}/countries/${name}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching country ${name}:`, error)
      throw error
    }
  }
}

export default countryService