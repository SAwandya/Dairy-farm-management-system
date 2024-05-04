const mongoose = require('mongoose');

const milkingDataSchema = new mongoose.Schema({
    milkBatchId: {
        type: Number,
        required: true,
        unique: true
    },
  amountOfMilk: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  qualityCheckResult: {
    type: String,
    enum: ['Pass', 'Fail'],
    required: true
  },
  issues: String
}, { timestamps: true });

const MilkingData = mongoose.model('MilkingData', milkingDataSchema);

module.exports = MilkingData;
