// index.js Root Back End File
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
var flash = require('connect-flash');
const cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser')
const db = require('./server/services/database');
const authRoutes = require('./server/routes/authRoutes');
const todoRoutes = require('./server/routes/todoRoutes');
const keys = require('./server/config/keys');


//Connection to the DB
db();

// App Startup
const PORT = process.env.PORT || 5000;
const app = express();

//Middleware
app.use(cookieParser())
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
app.use('/api/todo',todoRoutes);


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
