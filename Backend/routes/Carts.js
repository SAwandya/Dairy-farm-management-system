const express = require("express");
const router = express.Router();
const { Cart, validateCart } = require("../models/salesCart");
const { Customer } = require("../models/customer");
const { Product } = require("../models/product");

router.get("/", async (req, res) => {
  const carts = await Cart.find();
  res.send(carts);
});

router.get("/:id", async (req, res) => {
  const carts = await Cart.findById(req.params.id);
  res.send(carts);
});

router.post("/", async (req, res) => {
  const { error } = validateCart(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalide customer");

  const product = await Product.findByIdAndUpdate(
    req.body.productId,
    {
      $inc: { quantity: -req.body.quantity },
    },
    { quantity: true }
  );
  if (!product) return res.status(400).send("Invalide product");

  let cart = new Cart({
    quantity: req.body.quantity,
    product: product,
    customer: customer,
  });

  cart = await cart.save();

  res.send(cart);
});

module.exports = router;