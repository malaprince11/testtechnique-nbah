const mongoose = require('mongoose');

const { Schema } = mongoose;

const scoreSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  point: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model('Score', scoreSchema);
