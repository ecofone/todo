//User.js: User Model
const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Schema of the users' collections
const UserSchema = new Schema({
    googleId: String,
    username: String,
    password: String,
    authProvider: String,
    email: String,
    names: String,
    lastName: String
});

//Validate password
UserSchema.methods.verifyPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  }

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