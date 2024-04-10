const mongoose = require("mongoose");
const Joi = require("joi");

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

  customerId: {
    type: String,
    required: true,
  },
});

const Delivery = mongoose.model("Deliverys", deliverySchema);

function validateDelivery(delivery) {
  const schema = Joi.object({
    address1: Joi.string().required(),
    address2: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    customerId: Joi.string().required(),
  });

  var result = schema.validate(delivery);

  return result;
}

exports.validateDelivery = validateDelivery;
exports.Delivery = Delivery;
