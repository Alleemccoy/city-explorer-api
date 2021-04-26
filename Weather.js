'use strict';

const superagent = require('superagent');

function getWeatherInfo(request, response) {
  const url = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const query = {
    key: process.env.WEATHER_API_KEY,
    lat: request.query.lat,
    lon: request.query.lon
  };

  superagent
    .get(url)
    .query(query)
    .then(weatherData => {
      response.json(weatherData.body.data.map(day => (new DailyForecast(day))));
    })
    .catch(error => {
      console.error(error);
      response.status(500).send('Server error');
    });
}

function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

module.exports = getWeatherInfo;
