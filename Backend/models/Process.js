// models/Process.js
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
  startTime:{
    type: Date
  },
  
  scheduleDate: {
    type: Date
  },
  scheduleTime: {
    type: String
  },
  status: {
    type: String,
    enum: ['scheduled', 'started'],
    default: 'started'
  }
});

const Process = mongoose.model('Process', ProcessSchema);

module.exports = Process;
