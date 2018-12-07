const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  price: Number,
  quantity: Number
}, { timestamps: true });



module.exports = mongoose.model('Purchase', purchaseSchema);

// status: { type: String, enum: ['paid', 'sent', 'received'], default: 'paid' }
// }, { timestamps: true });
