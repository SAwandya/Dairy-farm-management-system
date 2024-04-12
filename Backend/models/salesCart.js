const mongoose = require("mongoose");
const Joi = require("joi");
const { productSchema } = require("../models/product");
const { customerSchema } = require("../models/customer");

const cartSchema = new mongoose.Schema({
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

});

const Cart = mongoose.model("Cart", cartSchema);

function validateCart(cart) {
  const schema = Joi.object({
    quantity: Joi.number().required(),
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
  });

  var result = schema.validate(cart);

  return result;
}

exports.validateCart = validateCart;
exports.cartSchema = cartSchema;
exports.Cart = Cart;
