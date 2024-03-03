const axios = require('axios');
const countryService = require('../services/countryService');

jest.mock('axios');

describe('Country Service', () => {
  it('should return country data when call is successsful', async () => {
    const mockedResponse = [
      { name: { common: 'United States' } },
      { name: { common: 'Ecuador' } },
    ];

    axios.get.mockResolvedValue({ data: mockedResponse });

    // Call the function with a valid currency
    const currency = 'USD';

    const result = await countryService.getCountriesDataByCurrency(currency);
    expect(result).toEqual(mockedResponse);
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/currency/USD');
  });

  it('should throw an error for invalid currency', async () => {
    // Mocking Axios error
    const errorMessage = 'Not Found';
    axios.get.mockRejectedValue(new Error(errorMessage));

    // Call the function with an invalid currency
    const currency = 'InvalidCurrency';

    // Assert that the function throws the expected error message
    await expect(countryService.getCountriesDataByCurrency(currency)).rejects.toThrow(`${errorMessage} - Failed to fetch countries.`);
  });
});
