'use strict';

const express = require('express');
const weatherData = require('./data/weather.json');

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/weather', (request, response) => {
  response.send('Looking for weather?');
});




app.listen(PORT, () => console.log(`Listening on ${PORT}`));
