//authRoutes: Authentication Routes
var express = require('express')
var router = express.Router()
const passport = require('passport');
const User = require('../models/User');
const requireLogin = require('../middlewares/requireLogin');


//Create a new User
router.post('/create', async (req,res) => {
    const user = await new User({...req.body, authProvider: 'Local'}).save();
    res.send("User Created!");
});

//Get all Users
router.get('/users', async (req,res) => {
    const users = await User.getAllUsers();
    res.send(users);
});

//Get current user profile
router.get('/current_user', requireLogin, (req, res) => {
    res.send(req.user.getUserData());
});

//Logout current user
router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/')
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

//Local Login
router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/auth/login',
                                   failureFlash: true })
);

module.exports = router;

