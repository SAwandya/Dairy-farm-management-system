const mongoose = require("mongoose");
const Joi = require("joi");
const { productSchema } = require("../models/product");
const { customerSchema } = require("../models/customer");

const Product = mongoose.model(
  "Products",
  new mongoose.Schema({
    quantity: {
      type: String,
      required: true,
    },

    product: {
      type: productSchema,
      required: true,
    },

    customer: {
      type: customerSchema,
      required: true,
    },
  })
);

function validatePurchase(purchase) {
  const schema = Joi.object({
    quantity: Joi.number().required(),
  });

  var result = schema.validate(movie);

  return result;
}

exports.validate = validatePurchase;
exports.Product = Product;
