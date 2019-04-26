//Key.js Figurate out with key return based on which enviroment we are running

if (process.env.NODE_ENV === 'production'){
    // we are in production - reuturn production set of variables
    module.exports = require('./prod');
} else {
    // we are in development - return develpoment variables
    module.exports = require('./dev');
}