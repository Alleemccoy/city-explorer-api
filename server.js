'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const superagent = require('superagent');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    .query({
      key: process.env.WEATHER_API_KEY,
      lat: request.query.lat,
      lon: request.query.lon
    })
    .then(weatherData => {
      response.json(weatherData.body.data.map(day => (new DailyForecast(day))));
    })
    .catch(error => {
      console.error(error);
      response.status(500).send('Server error');
    });
  // } catch (error) {
  //   handleErrors(error, response);
}
);


function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

// function handleErrors(error, response) {
//   response.status(500).send('Internal Error: 500');

// }

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
