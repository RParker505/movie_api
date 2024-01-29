const express = require('express');
    bodyParser = require('body-parser');
    uuid = require('uuid');

const app = express(); //use this variable to route HTTP requests and responses

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: 'Kim',
    favoriteMovies: []
  },
  {
    id: 2,
    name: 'Mark',
    favoriteMovies: ["Alien"]
  }
]

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

app.get("/", (req, res) => {
  res.send("Welcome to SpookyVibes!");
});

// serve the “documentation.html” and any other files from the public folder
app.use(express.static('public'));

// CREATE/POST to set up a new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (!newUser.name) {
      res.status(400).send('New user must include a name.');
  } else {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser);
  }
});

// UPDATE/PUT to update a username
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );//use let here because if the user does exist, we're going to update it with a new username. Use == instead of === because :id will be a string and user.id is a number.

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('No such user in the database!')
  }
});

// CREATE/POST to add a movie to user favorites
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );//use let here because if the user does exist, we're going to update it with a new favoite movie. Use == instead of === because :id will be a string and user.id is a number.

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send('No such user in the database!')
  }
});

// DELETE to remove movie from list of user favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );//use let here because if the user does exist, we're going to update it by removing a favoite movie. Use == instead of === because :id will be a string and user.id is a number.

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle );
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send('No such user in the database!')
  }
})

// DELETE to let user deregister
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id );//use let here because if the user does exist, we're going to update it by removing the user. Use == instead of === because :id will be a string and user.id is a number.

  if (user) {
    users = users.filter( user => user.id != id );//use != because we're comparing string to a number
    res.status(200).send(`User ${id} has been deleted.`);
  } else {
    res.status(400).send('No such user in the database!')
  }
})

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
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;//adding .Genre at the end returns just the Genre part of the movie object

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('No such genre in the database!')
  }
})

// READ/GET to return the details for movie director
app.get('/movies/director/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;//adding .Director at the end returns just the Director part of the movie object

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('No such director in the database!')
  }
})


  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });