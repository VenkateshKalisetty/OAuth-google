const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('../../config');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: config["google-oauth2"].clientId,
        clientSecret: config["google-oauth2"].clientSecret,
        callbackURL: config["google-oauth2"].callbackUrl
    }, (token, refreshToken, profile, done) => {
        console.log(token)
        return done(null, {
            profile: profile,
            token: token
        });
    }));
}