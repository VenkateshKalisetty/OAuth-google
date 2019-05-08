const express = require("express");
const http = require("http");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const session = require("express-session");
const path = require("path");

const config = require("./config");

const app = express();
const server = http.createServer(app);

app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/src/views/'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/src/views'));
});

passport.serializeUser((user, done) => {  
    done(null, user);
});

passport.deserializeUser((userDataFromCookie, done) => {  
    done(null, userDataFromCookie);
});

// Checks if a user is logged in
const accessProtectionMiddleware = (req, res, next) => {  
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({
        message: 'must be logged in to continue',
      });
    }
  };

  // Set up passport strategy
passport.use(new GoogleStrategy(  
    {
      clientID: config["google-oauth2"].clientId,
      clientSecret: config["google-oauth2"].clientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email'],
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    },
  ));

  app.get('/auth/google/callback',  
    passport.authenticate('google', { failureRedirect: '/', session: true }),
    (req, res) => {
      console.log('wooo we authenticated, here is our user object:', req.user);
      // res.json(req.user);
      res.redirect('/');
    }
  );
  
  app.get('/protected', accessProtectionMiddleware, (req, res) => {  
    res.json({
      message: 'You have accessed',
      id: req.user.id,
      email: req.user.emails[0].value,
      photo: req.user.photos[0].value
    });
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write('<h6>' + req.user.emails[0].value + '</h6><br><img src="'+ req.user.photos[0].value +'"/>');
  });

server.listen(process.env.PORT || config.port, err => {
    if (err) {
        console.log(`Something went wrong. Unable to start server`);
        throw err;
    } else {
        console.log(`Server running on http://localhost:${config.port}`);
    }
});