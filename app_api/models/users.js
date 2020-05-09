// models which are objects that represent collections in our database
const mongoose = require('mongoose');
// models are defined through the Schema interface
const Schema = mongoose.Schema;
//encode string using crypt and rotation
const bcrypt = require('bcrypt');
//check if there is any duplicate
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new      Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
      type: String,
      required: true
  },
  email: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    'default': Date.now
  },
  recipes: [String]
});

// check for duplicate database entries
userSchema.plugin(uniqueValidator);

//before save any record encrypt the password using bcrypt with a rotation of 10
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
      user.password = hash
      next(); //mongoose can continue creating the user data
  })
})

// we access the database via mongoose.model.
const User = mongoose.model('User',userSchema);

module.exports = User;
