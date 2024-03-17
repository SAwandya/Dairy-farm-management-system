const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  unitOfMeasurement: {
    type: String,
    required: true,
  },

  expirationDate: {
    type: Date,
    required: true,
  },

  manufacDtae: {
    type: Date,
    required: true,
  },

  publish: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Products", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    unitOfMeasurement: Joi.string().required(),
    expirationDate: Joi.date().required(),
    manufacDtae: Joi.date().required(),
    publish: Joi.boolean(),
  });

  var result = schema.validate(product);

  return result;
}

exports.validate = validateProduct;
exports.Product = Product;
exports.productSchema = productSchema;
