const axios = require('axios');

const getCountriesDataByCurrency = async (currency) => {
  try {

    const response = await axios.get(`https://restcountries.com/v3.1/currency/${currency}`);
    return response.data;

  } catch (error) {

    throw new Error(`${error.message} - Failed to fetch countries.`);

  }
};

module.exports = {
  getCountriesDataByCurrency,
};
