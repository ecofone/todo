//authRoutes: Authentication Routes
var express = require('express')
var router = express.Router()
const passport = require('passport');
const User = require('../models/User');
const requireLogin = require('../middlewares/requireLogin');


//Create a new User
router.post('/create', async (req,res) => {
    try{
        const user = await new User({...req.body, authProvider: 'Local'}).save();
        res.send(user.getUserData());
    }
    catch (error) {
        var duplicateLogin = false;
        const {errors} = error;
        var descError = "Error al Crear el usuario. Intente nuevamente";
        if (errors['username']&& errors['username']['kind'] 
            && errors['username']['kind'] === 'unique') {
                duplicateLogin = true;
        }
        if (errors['email']&& errors['email']['kind'] 
        && errors['email']['kind'] === 'unique') {
            duplicateLogin = true;
        }
        if (duplicateLogin){
            descError = "Username or Email duplicado!"
         }
        res.status(400).send(descError);
    }
});

//Get all Users
router.get('/users', async (req,res) => {
    const users = await User.getAllUsers();
    res.send(users);
});

//Get current user profile
router.get('/current_user', (req, res) => {
    res.send(req.user && req.user.getUserData());
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
    (req,res) => res.redirect('/todos')
);

//Local Login
router.post('/login',
    passport.authenticate('local'),
    (req, res) => res.send(req.user && req.user.getUserData())
);

module.exports = router;

