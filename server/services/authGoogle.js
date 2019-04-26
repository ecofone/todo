//authGoogle.js passport strategy to get authentication through Google
//https://console.developers.google.com/
const passport = require('passport');
const mongoose = require('mongoose');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
                        lastName: profile.name.familyName
                        }).save();
                }
                return done(null, user);
            } catch (err) { return done(err) }
        }   
    )
);