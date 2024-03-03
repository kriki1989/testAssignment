require('dotenv').config();
const express = require('express');
const bearerAuthMiddleware = require('./middleware/bearerAuth');
const countryController = require('./controllers/countryController');

const app = express();
const port = process.env.PORT;

// Bearer Authentication Middleware
app.use(bearerAuthMiddleware);

// Countries Endpoint
app.get('/countries', countryController.getCountriesByCurrency);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
