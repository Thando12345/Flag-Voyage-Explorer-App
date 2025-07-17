const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

// GET all countries
router.get('/', countryController.getAllCountries);

// GET specific country by name
router.get('/:name', countryController.getCountryByName);

module.exports = router;