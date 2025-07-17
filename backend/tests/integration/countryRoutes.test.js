const request = require('supertest');
const app = require('../../src/index');
const countryService = require('../../src/services/countryService');

// Mock the country service
jest.mock('../../src/services/countryService');

describe('Country Routes', () => {
  describe('GET /countries', () => {
    it('should return all countries', async () => {
      // Mock data
      const mockCountries = [
        { name: 'Germany', flag: 'https://example.com/germany.png' },
        { name: 'France', flag: 'https://example.com/france.svg' }
      ];

      // Mock service response
      countryService.getAllCountries.mockResolvedValue(mockCountries);

      // Make request
      const response = await request(app).get('/countries');

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCountries);
    });

    it('should handle errors', async () => {
      // Mock service error
      countryService.getAllCountries.mockRejectedValue(new Error('Service error'));

      // Make request
      const response = await request(app).get('/countries');

      // Assertions
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /countries/:name', () => {
    it('should return country details', async () => {
      // Mock data
      const mockCountry = {
        name: 'Germany',
        population: 83000000,
        capital: 'Berlin',
        flag: 'https://example.com/germany.png'
      };

      // Mock service response
      countryService.getCountryByName.mockResolvedValue(mockCountry);

      // Make request
      const response = await request(app).get('/countries/germany');

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCountry);
    });

    it('should return 404 for non-existent country', async () => {
      // Mock service response
      countryService.getCountryByName.mockResolvedValue(null);

      // Make request
      const response = await request(app).get('/countries/nonexistent');

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});