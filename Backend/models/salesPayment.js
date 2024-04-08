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

const Payment = mongoose.model("Payments", paymentschema);

function validatePayment(payment) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    cardNumber: Joi.number().required(),
    cardName: Joi.string().required(),
    cvv: Joi.number().required(),
    expDate: Joi.date().required(),
  });

  var result = schema.validate(payment);

  return result;
}

exports.validate = validatePayment;
exports.Payment = Payment;
