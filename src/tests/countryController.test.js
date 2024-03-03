const express = require('express');
const countryController = require('../controllers/countryController');
const countryService = require('../services/countryService');

jest.mock('../services/countryService');

const app = express();

app.get('/countries', countryController.getCountriesByCurrency);

describe('Country Controller', () => {
  it('should return country names based on currency', async () => {
    const req = { query: { currency: 'USD' } };
    const res = {
      json: jest.fn(),
      status: jest.fn()
    };

    const mockCountriesData = [
      { name: { common: 'United States' } },
      { name: { common: 'Canada' } }
    ];

    countryService.getCountriesDataByCurrency.mockResolvedValueOnce(mockCountriesData);

    await countryController.getCountriesByCurrency(req, res);

    expect(res.json).toHaveBeenCalledWith({ countries: ['United States', 'Canada'] });
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return bad request when currency not provided', async () => {
    const req = { query: { currency: '' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await countryController.getCountriesByCurrency(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: {
        name: 'Error',
        message: 'Currency must be provided.'
      }
    });
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should handle an error from the service and return a 503 status', async () => {
    const req = { query: { currency: 'INVALID' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    const mockError = new Error('Not Found');

    countryService.getCountriesDataByCurrency.mockRejectedValueOnce(mockError);

    await countryController.getCountriesByCurrency(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: {
        name: 'Error',
        message: 'Service Unavailable - Remote API Error'
      }
    });
    expect(res.status).toHaveBeenCalledWith(503);
  });
});