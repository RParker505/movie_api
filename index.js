const express = require('express');
    bodyParser = require('body-parser');
    uuid = require('uuid');

const app = express(); //use this variable to route HTTP requests and responses

app.use(bodyParser.json());

let users = []

let movies = [
    {
        'Title': 'Midsommar',
        'Description': 'A couple travels to Northern Europe to visit a rural hometown\'s fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.',
        'Director': {
            'Name': 'Ari Aster',
            'Bio': 'Ari Aster is an American filmmaker. He became best known for writing and directing Hereditary, Midsommar, and Beau Is Afraid, all of which were released by A24.',
            'Birth_year': 1986
        },
        'Genre': {
            'Name': 'Folk horror',
            'Description': 'Folk horror is a subgenre of horror film and horror fiction that uses elements of folklore to invoke fear and foreboding.'
        },
        'Image': 'https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_.jpg',
        'Featured': false
    },
    {
        'Title': 'IT',
        'Description': 'In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.',
        'Director': {
            'Name': 'Andy Muschietti',
            'Bio': 'Andy Muschietti was born on August 26, 1973, in Buenos Aires, Federal District, Argentina. He is a producer and director, known for Mama (2013), It (2017) and It Chapter Two (2019).',
            'Birth_year': 1973
        },
        'Genre': {
            'Name': 'Supernatural horror',
            'Description': 'Supernatural horror film is a film genre that combines aspects of supernatural film and horror film. Supernatural occurrences in such films often include ghosts and demons, and many supernatural horror films have elements of religion.'
        },
        'Image': 'https://upload.wikimedia.org/wikipedia/en/5/5a/It_%282017%29_poster.jpg',
        'Featured': false
    }
]

// READ/GET to return the full list of movies
app.get('/movies', (req, res) => {
  res.status(200).json(movies)
})

// READ/GET to return the details for movie by title
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('No such movie in the database!')
  }
})

// READ/GET to return the details for movie genre
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('No such genre in the database!')
  }
})


  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });