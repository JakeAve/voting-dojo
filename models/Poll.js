const mongoose = require('mongoose');
const { OptionSchema } = require('./Option');

const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  options: [OptionSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Poll = mongoose.model('poll', PollSchema);
