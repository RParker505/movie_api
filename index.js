const express = require('express');
    bodyParser = require('body-parser');
    uuid = require('uuid');

const app = express(); //use this variable to route HTTP requests and responses

app.use(bodyParser.json());


let topMovies = [
    {
      title: 'Midsommar',
      director: 'Ari Aster'
    },
    {
      title: 'IT',
      director: 'Andy Muschietti'
    },
    {
      title: 'The Exorcist',
      director: 'William Friedkin'
    },
    {
      title: 'Talk to Me',
      director: ['Danny Philippou','Michael Philippou']
    },
    {
      title: 'Barbarian',
      director: 'Zach Cregger'
    },
    {
      title: 'Insidious',
      director: 'James Wan'
    },
    {
      title: 'Hereditary',
      director: 'Ari Aster'
    },
    {
      title: 'Silence of the Lambs',
      director: 'Jonathan Demme'
    },
    {
      title: 'The Mist',
      director: 'Frank Darabont'
    },
    {
      title: 'Get Out',
      director: 'Jordan Peele'
    }
  ];

  // serve the “documentation.html” file from the public folder
app.use(express.static('public'));

  // GET requests
  // return welcome message when request path is homepage
app.get('/', (req, res) => {
    res.send('Welcome to Spooky Vibes!');
  });
   
  // return list of top movies when request path is /movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
  });

  // error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
    });