const mongoose = require('mongoose');

const milkSessionSchema = new mongoose.Schema({
  sessionId: {
    type: Number,
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

milkSessionSchema.pre('save', async function(next) {
  try {
    if (!this.sessionId) {
      const lastSession = await MilkSession.findOne({}, {}, { sort: { 'sessionId': -1 } });
      const nextId = lastSession ? lastSession.sessionId + 1 : 1;
      this.sessionId = nextId;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const MilkSession = mongoose.model('MilkSession', milkSessionSchema);

module.exports = MilkSession;
