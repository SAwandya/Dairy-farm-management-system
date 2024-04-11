const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
    trim: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Inventory = mongoose.model('Inventory', InventorySchema);

exports.Inventory = Inventory;
exports.InventorySchema = InventorySchema;