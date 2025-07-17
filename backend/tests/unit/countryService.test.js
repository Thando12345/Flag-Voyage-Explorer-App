const axios = require('axios');
const countryService = require('../../src/services/countryService');

// Mock axios
jest.mock('axios');

describe('Country Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCountries', () => {
    it('should return formatted country data', async () => {
      // Mock data
      const mockCountries = [
        {
          name: { common: 'Germany' },
          flags: { png: 'https://example.com/germany.png' }
        },
        {
          name: { common: 'France' },
          flags: { svg: 'https://example.com/france.svg' }
        }
      ];

      // Mock axios response
      axios.get.mockResolvedValue({ data: mockCountries });

      // Call the service
      const result = await countryService.getAllCountries();

      // Assertions
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
      expect(result).toEqual([
        { name: 'Germany', flag: 'https://example.com/germany.png' },
        { name: 'France', flag: 'https://example.com/france.svg' }
      ]);
    });

    it('should handle errors', async () => {
      // Mock axios error
      axios.get.mockRejectedValue(new Error('Network error'));

      // Call the service and expect it to throw
      await expect(countryService.getAllCountries()).rejects.toThrow('Network error');
    });
  });

  describe('getCountryByName', () => {
    it('should return formatted country details', async () => {
      // Mock data
      const mockCountry = [{
        name: { common: 'Germany' },
        population: 83000000,
        capital: ['Berlin'],
        flags: { png: 'https://example.com/germany.png' }
      }];

      // Mock axios response
      axios.get.mockResolvedValue({ data: mockCountry });

      // Call the service
      const result = await countryService.getCountryByName('germany');

      // Assertions
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/germany');
      expect(result).toEqual({
        name: 'Germany',
        population: 83000000,
        capital: 'Berlin',
        flag: 'https://example.com/germany.png'
      });
    });

    it('should return null for non-existent country', async () => {
      // Mock axios 404 response
      axios.get.mockRejectedValue({ response: { status: 404 } });

      // Call the service
      const result = await countryService.getCountryByName('nonexistent');

      // Assertions
      expect(result).toBeNull();
    });
  });
});