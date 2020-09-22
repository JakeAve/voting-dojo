const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },
});

const Option = mongoose.model('option', OptionSchema);

module.exports = { Option, OptionSchema };
