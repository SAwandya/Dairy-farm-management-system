const mongoose = require("mongoose");

// Define schema for product
const productBatchSchema = new mongoose.Schema({
  productId: {
    type: String,
    //required: true,
  },
  name: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  manufactureDate: {
    type: Date,
    required: true,
  },

  manufactureTime: {
    type: String,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  batchId: {
    type: String,
    required: true,
  },
  released: {
    type: Boolean,
    default: false,
  },
  storageLocation: {
    type: String,
  },
  collect: {
    type: Boolean,
    default: false,
  },
});

// Create a model based on the schema
const ProductBatch = mongoose.model("productBatch", productBatchSchema);

module.exports = ProductBatch;
