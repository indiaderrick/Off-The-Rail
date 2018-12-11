const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  image: String,
  originallyFrom: String,
  description: String,
  type: String,
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User' },
  savedForLater: [ { type: mongoose.Schema.ObjectId, ref: 'User' }],
  retailPrice: Number,
  newPrice: Number

});

// boughtBy will be a virtual scheme that references the user's purchases & checks for item ids.

module.exports = mongoose.model('Item', itemSchema);
