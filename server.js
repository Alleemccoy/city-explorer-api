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
}
);

app.get('/movies', (request, response) => {
  superagent.get('https://api.themoviedb.org/3/search/movie')
    .query({
      api_key: process.env.MOVIE_API_KEY,
      query: request.query.city
    })
    .then(movieInfo => {
      let results = movieInfo.body.results.map(selected => new Film(selected));
      console.log(results);
      response.json(results);
    })
    .catch(error => {
      console.error(error);
      response.status(500).send('Server error');
    });
}
);


function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

function Film(selected) {
  this.title = selected.title;
  this.description = selected.overview;
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
