const mongoose = require("mongoose");
const Joi = require("joi");
const { productSchema } = require("../models/product");
const { customerSchema } = require("../models/customer");

const paymentschema = new mongoose.Schema({
  cardNumber: {
    type: Number,
    required: true,
  },

  cardName: {
    type: String,
    required: true,
  },

  cvv: {
    type: Number,
    required: true,
  },

  expDate: {
    type: Date,
    required: true,
  },
});

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

  paymentDetails: paymentschema,

  deliveryDetails: deliverySchema,
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

function validatePurchase(purchase) {
  const schema = Joi.object({
    quantity: Joi.number().required(),
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
    cardNumber: Joi.number().required(),
    cardName: Joi.string().required(),
    cvv: Joi.number().required(),
    state: Joi.string().required(),
    expDate: Joi.date().required(),
    address1: Joi.string().required(),
    address2: Joi.string().required(),
    city: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });

  var result = schema.validate(purchase);

  return result;
}

exports.validate = validatePurchase;
exports.purchaseSchema = purchaseSchema;
exports.Purchase = Purchase;
