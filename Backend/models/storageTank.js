const mongoose = require('mongoose');

const storageTankSchema = new mongoose.Schema({
    tankId: {
        type: Number,
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

storageTankSchema.pre('save', async function(next) {
    try {
      if (!this.tankId) {
        const lastTank = await StorageTank.findOne({}, {}, { sort: { 'tankId': -1 } });
        const nextId = lastTank ? lastTank.tankId + 1 : 1;
        this.tankId = nextId;
      }
      next();
    } catch (error) {
      next(error);
    }
  });

const StorageTank = mongoose.model('StorageTank', storageTankSchema);

module.exports = StorageTank;
