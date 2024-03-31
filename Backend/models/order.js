const mongoose = require('mongoose');

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

module.exports = Order;