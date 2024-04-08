const mongoose = require("mongoose");
const Joi = require("joi");
const { productSchema } = require("../models/product");
const { customerSchema } = require("../models/customer");

const deliverySchema = new mongoose.Schema({
  address1: {
    type: String,
    required: true,
  },

  address2: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

});

const purchaseSchema = new mongoose.Schema({
  quantity: {
    type: String,
    required: true,
  },

  approve: {
    type: Boolean,
    default: false,
  },

  orderDate: {
    type: Date,
    default: Date.now,
  },

  product: {
    type: productSchema,
    required: true,
  },

  customer: {
    type: customerSchema,
    required: true,
  },

  delivery: {
    type: deliverySchema,
    required: true,
  },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

function validatePurchase(purchase) {
  const schema = Joi.object({
    quantity: Joi.number().required(),
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
    deliveryId: Joi.string().required(),
  });

  var result = schema.validate(purchase);

  return result;
}

exports.validate = validatePurchase;
exports.purchaseSchema = purchaseSchema;
exports.Purchase = Purchase;
