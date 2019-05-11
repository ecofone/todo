//authentication.js passport strategy to get authentication through Google
//https://console.developers.google.com/
const passport = require('passport');
const mongoose = require('mongoose');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const keys = require('../config/keys');

//User Model
const User = require('../models/User');

//Serialize user to pass to passport and send it as cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
})


//De-Serialize user to read id in the cokie and pass to passport 
passport.deserializeUser((id, done) => {
    User.findById(id).then( user => {
        done(null, user);
    });
});


//Local User and password authentication
passport.use(new LocalStrategy(
    {   passReqToCallback : true,
        proxy: true
    } ,
    async (req, username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) { 
                return done(null, false, { message: 'Incorrect username or password' }) 
            }
            user.verifyPassword(password, (error, same) => {
                if (same) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect username or password'});
                }
            });
        } catch (err) {
            return done(err);
        }
}));

//Configuration of google autenthication strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => { 
            try {
                let user = await User.findOne({googleId: profile.id});
                if (!user){
                    user = await new User({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        names: profile.name.givenName,
                        lastName: profile.name.familyName,
                        authProvider: 'Google'
                        }).save();
                }
                return done(null, user);
            } catch (err) { conssole.log("Google Strategy Error: ", err); return done(err) }
        }   
    )
);
