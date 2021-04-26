'use strict';

const superagent = require('superagent');

function getMovieData(request, response) {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const query = {
    api_key: process.env.MOVIE_API_KEY,
    query: request.query.city
  };

  superagent
    .get(url)
    .query(query)
    .then(movieInfo => {
      let results = movieInfo.body.results.map(selected => new Film(selected));
      response.json(results);
    })
    .catch(error => {
      console.error(error);
      response.status(500).send('Server error');
    });

}

function Film(selected) {
  this.title = selected.title;
  this.description = selected.overview;
}

module.exports = getMovieData;
