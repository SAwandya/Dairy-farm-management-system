const mongoose = require('mongoose');
const Joi = require("joi");

const orderSchema = new mongoose.Schema({

  orderType: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  advanceFee: {
    type: Number,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    orderType: Joi.string().required(),
    orderStatus: Joi.string().required(),
    quantity: Joi.number().required(),
    advanceFee: Joi.number().required(),
    deliveryDate: Joi.date().required()

  });

  var result = schema.validate(order);
  return result;
}


exports.validate = validateOrder;
exports.Order = Order;
exports.orderSchema = orderSchema;