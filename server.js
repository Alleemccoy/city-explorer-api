'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const getWeatherInfo = require('./Weather.js');
const getMovieData = require('./Movies.js');
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', getWeatherInfo);


app.get('/movies', getMovieData);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
