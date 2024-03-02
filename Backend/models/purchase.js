const mongoose = require("mongoose");
const Joi = require("joi");
const { productSchema } = require("../models/product");
const { customerSchema } = require("../models/customer");

const paymentschema = new mongoose.Schema({
  cardNumber: {
    type: Number,
  },

  cardName: {
    type: String,
  },

  cvv: {
    type: Number,
  },

  expDate: {
    type: Date,
  },
});

const deliverySchema = new mongoose.Schema({
  address1: {
    type: String,
  },

  address2: {
    type: String,
  },

  city: {
    type: String,
  },

  state: {
    type: String,
  },

  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
});

const Purchase = mongoose.model(
  "Purchase",
  new mongoose.Schema({
    quantity: {
      type: String,
      required: true,
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
  })
);

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
exports.Purchase = Purchase;
