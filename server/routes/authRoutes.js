var express = require('express')
var router = express.Router()
const passport = require('passport');
const User = require('../models/User');

//Create a new User
router.post('/create', async (req,res) => {
    const user = await new User(req.body).save();
    res.send("User Created!");
});

//Get all Users
router.get('/users', async (req,res) => {
    const users = await User.find();
    res.send(users);
});


//--Google Auth Step 1: Get Authentification code
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
})
);

//--Google Auth Step 2: get user profile
router.get(
    '/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' } ),
    (req,res) => res.redirect('/')
)

module.exports = router;

