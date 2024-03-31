const mongoose = require('mongoose');
const Joi = require('joi');

const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true
  },
  OrderType: {
    type: String,
    required: true
  },
  OrderStatus: {
    type: String,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  },
  PerunitCost: {
    type: Number,
    required: true
  },
  DeliveryDate: {
    type: Date,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    orderID: Joi.string().required(),
    OrderType: Joi.string().required(),
    OrderStatus: Joi.string().required(),
    Quantity: Joi.number().required(),
    PerunitCost: Joi.number().required(),
    DeliveryDate: Joi.date().required()
  });

  return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;
exports.orderSchema = orderSchema;