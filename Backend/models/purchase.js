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

    deliveryAddress: {
      type: String,
    },

    paymentDetails: {
      type: String
    }
  })
);

function validatePurchase(purchase) {
  const schema = Joi.object({
    quantity: Joi.number().required(),
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
    deliveryAddress: Joi.string(),
    paymentDetails: Joi.String()
  });

  var result = schema.validate(purchase);

  return result;
}

exports.validate = validatePurchase;
exports.Purchase = Purchase;
