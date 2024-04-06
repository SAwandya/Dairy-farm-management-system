const mongoose = require('mongoose');

const storageTankSchema = new mongoose.Schema({
    tankId: {
        type: String,
        required: true,
        unique: true
    },
  capacity: {
    type: Number,
    required: true
  },
  installedDate: {
    type: Date,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  specialNotes: String
}, { timestamps: true });

const StorageTank = mongoose.model('StorageTank', storageTankSchema);

module.exports = StorageTank;
