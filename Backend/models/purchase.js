const mongoose = require("mongoose");
const Joi = require("joi");
const { productSchema } = require("../models/product");
const { customerSchema } = require("../models/customer");

const Purchase = mongoose.model(
  "Purchase",
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
    customerId: Joi.string().required(),
    productId: Joi.string().required()
  });

  var result = schema.validate(purchase);

  return result;
}

exports.validate = validatePurchase;
exports.Purchase = Purchase;
