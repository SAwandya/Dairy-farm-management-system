const mongoose = require('mongoose');

const milkSessionSchema = new mongoose.Schema({
  sessionId: {
    type: Number,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  cowGroup: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Completed', 'Incomplete', 'Cancelled'],
    required: true
  },
  specialNotes: String
}, { timestamps: false });

const MilkSession = mongoose.model('MilkSession', milkSessionSchema);

module.exports = MilkSession;
