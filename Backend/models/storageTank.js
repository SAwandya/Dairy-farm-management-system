const mongoose = require('mongoose');

const storageTankSchema = new mongoose.Schema({
    tankId: {
        type: Number,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    availableMilk: {
      type: Number,
    },
    installedDate: {
        type: Date,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    specialNotes: String,
    storedMilkBatches: [
        {
            type: Number,
        }
    ]
}, { timestamps: false });

const StorageTank = mongoose.model('StorageTank', storageTankSchema);

module.exports = StorageTank;
