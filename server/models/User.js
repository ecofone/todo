//User.js: User Model
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Schema of the users' collections
const UserSchema = new Schema({
    googleId: String,
    username: { type: String, required: true, unique: true },
    password: String,
    authProvider: String,
    email: { type: String, required: true, unique: true },
    names: { type: String, required: true },
    lastName: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator);

//------------------------Statics Methods--------------------
//Get Info of all Users
UserSchema.statics.getAllUsers = function(){
  return User.find().select({username:1, email: 1, names: 1, lastName: 1});
};

//------------------------Instance Methods--------------------
//Validate password
UserSchema.methods.verifyPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  };

//Get Info of current user
UserSchema.methods.getUserData = function(){
  return {username: this.username, email: this.email, names: this.names, lastName: this.lastName};
};

UserSchema.pre('save', function(next) {
    // Check if document is new or a new password has been set
    if ((this.isNew || this.isModified('password'))&& this.authProvider === 'Local')  {
        // Saving reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
            if (err) {
                next(err);
            }
            else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
    });


//Associate Schema to the Model (Collection)
const User = mongoose.model('User', UserSchema);

module.exports = User;