const mongoose = require('mongoose');

const ProcessSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  milkQuantity: {
    type: Number,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  specialNotes: {
    type: String
  },
  scheduleDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['scheduled', 'started'],
    default: 'scheduled'
  }
});

const Process = mongoose.model('Process', ProcessSchema);

module.exports = Process;
