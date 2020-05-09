const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
  ingredients: []
});

module.exports = mongoose.model('List', ListSchema);
