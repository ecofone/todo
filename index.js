// index.js Root Back End File
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./server/config/keys');


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

//Routing
require('./server/routes/authRoutes')(app);


// http://localhost:5000
app.listen(PORT, () =>
  console.log('Server Express Listenning at port: ', PORT)
);
