const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customers",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    rep: {
      type: String,
      required: true,
    },

    licenseNo: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.number().required(),
    rep: Joi.string().required(),
    licenseNo: Joi.string().required(),
    email: Joi.email().required(),
  });

  var result = schema.validate(customer);

  return result;
}

exports.validate = validateCustomer;
exports.Customer = Customer;
