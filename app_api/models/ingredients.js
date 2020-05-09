// models which are objects that represent collections in our database
const mongoose = require('mongoose');
// models are defined through the Schema interface
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ingredientSchema = new      Schema({
  item: {
    type: String,
    required: true,
    unique: true
  },
  category: {
      type: String,
      required: true
  },
  calories: {
    type: Number
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

// check for duplicate database entries
ingredientSchema.plugin(uniqueValidator);

// we access the database via mongoose.model.
const Ingredient = mongoose.model('Ingredient',ingredientSchema);

module.exports = Ingredient;
