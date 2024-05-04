const mongoose = require("mongoose");
const { productSchema } = require("./product");

const reorderMessage = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },

  product: {
    type: productSchema,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now()
  }
});

const ReorderMessage = mongoose.model("ReorderMessage", reorderMessage);

exports.ReorderMessage = ReorderMessage;
