// models which are objects that represent collections in our database
const mongoose = require('mongoose');
// models are defined through the Schema interface
const Schema = mongoose.Schema;

const recipeSchema = new      Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: [mongoose.Schema.Types.ObjectId], ref:'Ingredient',
    required: true
  },
  instructions: {
      type: String,
      required: true
  },
  likes: {
    type: Number
  },
  calories: {
    type: Number
  },
  imagePath: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref:'User',
    required: true
  },
  createdOn: {
    type: Date,
    'default': Date.now
  }
});

// we access the database via mongoose.model.
const Recipe = mongoose.model('Recipe',recipeSchema);

//before save any record encrypt the password using bcrypt with a rotation of 10
recipeSchema.pre('save', function(next) {
  const recipe = this;
  if (req.session.user) {
    recipe.author = req.session.user.userid;
  } else {
    throw 'user must be authenticated!';
  }
  next();
  // bcrypt.hash(user.password, 10, (error, hash) => {
  //     user.password = hash
  //     next(); //mongoose can continue creating the user data
  // })
})

module.exports = Recipe;
