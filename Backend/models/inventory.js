const mongoose = require('mongoose');
const Joi = require('joi');


const InventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Inventory = mongoose.model('Inventory', InventorySchema);

function validateInventory(inventory) {
  const schema = Joi.object({
    itemName: Joi.string().trim().required(),
    quantity: Joi.number().required(),
    lastUpdated: Joi.date(),
  });

  const result = schema.validate(inventory);
  return result;
}

exports.validate = validateInventory;
exports.Inventory = Inventory;
exports.InventorySchema = InventorySchema;