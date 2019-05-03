const express = require("express");
const http = require("http");
const passport = require("passport");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const config = require("./config");
const auth = require("./src/middlewares/auth");

const app = express();
const server = http.createServer(app);

auth(passport);
app.use(passport.initialize());

app.use(cookieSession({
    name: config.cookie.name,
    keys: config.cookie.key,
    maxAge: 24 * 60 * 1000
}));
app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', res.session.token);
        res.json({
            status: 'cookie set'
        });
    } else {
        res.cookie('token', '');
        res.json({
            status: 'cookie not set'
        });
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    req.session.token = req.user.token;
    console.log(req.user.token);
    res.redirect('/');
});

server.listen(process.env.PORT || config.port, err => {
    if (err) {
        console.log(`Something went wrong. Unable to start server`);
        throw err;
    } else {
        console.log(`Server running on http://localhost:${config.port}`);
    }
});