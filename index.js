// index.js Root Back End File
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
var flash = require('connect-flash');
const cookieSession = require('cookie-session');
const keys = require('./server/config/keys');
const authRoutes = require('./server/routes/authRoutes');
const todoRoutes = require('./server/routes/todoRoutes');


//Connection to the DB
mongoose.connect(keys.mongoURI, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the DB!');
});

// App Startup
const PORT = process.env.PORT || 5000;
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(flash());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./server/services/authentication');
//Routing 
app.use('/auth',authRoutes);
app.use('/todo',todoRoutes);

//To be deleted
app.get('/', (req,res) => {
    res.send({username: req.user.username, names: req.user.names, lastName: req.user.lastName});
});


//Static Routes
if (process.env.NODE_ENV === 'production'){
    //Express will serve up production assets
    //like our main.js or main.css
    app.use(express.static('client/build'));
  
    //Express will serve up the index.html file 
    //if doesn't recognize the route
    const path = require('path');
    app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
  
  
  }


// http://localhost:5000
app.listen(PORT, () =>
  console.log('Server Express Listenning at port: ', PORT)
);
