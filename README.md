# SpookyVibes API

## Goal
To build the server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

## Description

The SpookyVibes REST API is the server-side component of the SpookyVibes web application (frontend is here: https://github.com/RParker505/spookyVibes-client). The API provides users with access to information about different horror movies, including the plot, director, genre, and an image. Users are able to sign up, update their personal information, and create a list of their favorite scary movies.

## Documentation

_See documentation.html in the public folder of the repository._

## Dependencies
* **Node.js:** JavaScript runtime for server-side scripting.
* **Express:** Back end web application framework for building RESTful APIs with Node.js.
* **MongoDB with Mongoose:** NoSQL database and Object Data Modeling library for Node.js.
* **Postman:** Allows you to design, develop, test and monitor APIs.
* **body-parser:** Express middleware for parsing request bodies.
* **express-validator:** Middleware for input validation in Express.
* **jsonwebtoken:** Library for JWT ( JSON Web Token) generation and verification.
* **lodash:** Utility library for JavaScript.
* **passport:** Authentication middleware for Node.js.
* **passport-jwt:** Passport strategy for JWT authentication.
* **passport-local:** Passport strategy for username/password authentication.
* **uuid:** Library for generating unique identifiers.
* **bcrypt:** A password-hashing function
* **cors:** Supports secure cross-origin requests and data transfers between browsers and servers

## Endpoints
You can also view all endpoints here: https://spookyvibes-d90e0cfd567b.herokuapp.com/documentation.html

### Get all movies
* URL: `/movies`
* Request body: None
* Response body: A JSON object holding data about all movies.
### Get a single movie
* URL: `/movies/[movieTitle]`
* Request body: None
* Response body: A JSON object holding data about a single movie, containing title, genre, director and description.
### Get genre information
* URL: `/movies/genre/[genreName]`
* Request body: None
* Response body: A JSON object holding data about a single genre, containing genre name and description.
### Get director information
* URL: `/movies/director/[directorName]`
* Request body: None
* Response body: A JSON object holding data about a single director, containing director name, bio, and birth year.
### Get all users
* URL: `/users`
* Request body: None
* Response body: A JSON object holding data about all users.
### Get a single user
* URL: `/users/[Username]`
* Request body: None
* Response body: A JSON object holding data about a single user, containing username, password, email, birthday, favorite movies.
### Post new user (register)
* URL: `/users`
* Request body: A JSON object holding data about the user to add to database.
* Response body: A JSON object holding data about the user that was added, including an new unique ID.
### Update (put) user information
* URL: `/users/[Username]`
* Request body: A JSON object holding data about the user which needs to be updated.
* Response body: A JSON object holding data with the updated user information.
### Post movie to users favorite movies list
* URL: `/users/[Username]/movies/[MovieID]`
* Request body: None
* Response body: A JSON object holding data about the updated user information, including FavoriteMovies.
### Delete movie from users favorite movie list
* URL: `/users/[Username]/movies/[MovieID]`
* Request body: None
* Response body: A JSON object holding data about the updated user information, including FavoriteMovies.
### Delete user
* URL: `/users/[Username]`
* Request body: None
* Response body: Text message indicating whether the user has been successfully removed from the database.


