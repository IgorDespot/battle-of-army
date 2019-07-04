const mongoose = require('mongoose');

const JoinSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfSquads: {
    type: Number,
    required: true,
    min: 10,
    max: 100,
  },
  webHookUrl: {
    type: String,
    required: true,
    dropDups: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('JoinSchema', JoinSchema);
