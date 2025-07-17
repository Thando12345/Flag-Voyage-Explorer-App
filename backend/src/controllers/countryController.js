const countryService = require('../services/countryService');

// Controller for handling country-related requests
const countryController = {
  // Get all countries
  getAllCountries: async (req, res) => {
    try {
      console.log('Controller: getAllCountries called');
      const countries = await countryService.getAllCountries();
      console.log(`Controller: Returning ${countries.length} countries`);
      res.status(200).json(countries);
    } catch (error) {
      console.error('Error fetching countries:', error);
      res.status(500).json({ message: 'Failed to fetch countries' });
    }
  },

  // Get a specific country by name
  getCountryByName: async (req, res) => {
    try {
      const { name } = req.params;
      const country = await countryService.getCountryByName(name);
      
      if (!country) {
        return res.status(404).json({ message: 'Country not found' });
      }
      
      res.status(200).json(country);
    } catch (error) {
      console.error(`Error fetching country ${req.params.name}:`, error);
      res.status(500).json({ message: 'Failed to fetch country details' });
    }
  }
};

module.exports = countryController;