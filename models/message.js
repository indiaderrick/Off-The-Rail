const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  from: { type: mongoose.Schema.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.ObjectId, ref: 'User' },
  inResponseTo: { type: mongoose.Schema.ObjectId, ref: 'Message' },
  content: String
}, { timestamps: true });

messageSchema.set('toJSON', {
  virtuals: true
});


module.exports = mongoose.model('Message', messageSchema);
