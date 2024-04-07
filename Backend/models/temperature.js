//recommit
const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true
  },
  recordedAt: {
    type: Date,
    default: Date.now
  }
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

module.exports = Temperature;
