//database.js: manage Connection to the DB
const mongoose = require('mongoose');
const keys = require('../config/keys');

module.exports = () => {
    mongoose.connect(keys.mongoURI, {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log('Connected to the DB!');
    });
}