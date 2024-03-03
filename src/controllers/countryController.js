const service = require('../services/countryService');

const getCountriesByCurrency = async (req, res) => {
  const { currency } = req.query;

  if (!currency) {
    res.status(400).json({
      error: {
        name: 'Error',
        message: 'Currency must be provided.'
      }
    });
  }

  try {

    const response = await service.getCountriesDataByCurrency(currency);

    const countries = response.map(country => country.name.common);

    res.json({ countries });

  } catch (error) {

    res.status(503).json({
      error: {
        name: error.name,
        message: 'Service Unavailable - Remote API Error'
      }
    });

  }
};

module.exports = {
  getCountriesByCurrency
};
