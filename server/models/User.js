const mongoose = require('mongoose');
const {Schema} = mongoose;

//Schema of the users' collections
const UserSchema = new Schema({
    googleId: String,
    username: String,
    email: String,
    names: String,
    lastName: String
});

//Associate Schema to the Model (Collection)
const User = mongoose.model('User', UserSchema);

module.exports = User;