const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models.js'),
    passportJWT = require('passport-jwt');

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

//Takes username and password from request body and use Mongoose findOne to determine if user exists
passport.use(
    new LocalStrategy(
        {
            usernameField: 'Username',
            passwordField: 'Password',
        },
        async (username, password, callback) => {
            console.log(`${username} ${password}`);
            await Users.findOne({Username: username})
            .then((user) => {
                if (!user) {
                    console.log('incorrect username');
                    return callback(null, false, {//comes back false if user does not exist
                        message: 'Incorrect username or password.',
                    });
                }
                console.log('finished');
                return callback(null, user);//returns user if they exist
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                    return callback(error);
                }
            })
        }
    )
);

//Authenticate users based on JWT submitted with their request.
passport.use(new JWTStrategy ({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),//JWT is extracted from HTTP request header
    secretOrKey: 'your_jwt_secret'//use secret key to verify signature of the JWT (ensure client is who it says it is and JWT hasn't been altered)
}, async (jwtPayload, callback) => {
    return await Users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));