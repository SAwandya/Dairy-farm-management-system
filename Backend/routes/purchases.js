const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Purchase, validate } = require("../models/purchase");
const { Customer } = require("../models/customer");

router.get("/", async (req, res) => {
  const purchase = await Purchase.find();
  res.send(purchase);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalide customer");

  const product = await Product.findByIdAndUpdate(
    req.body.productId,
    {
      $inc: { quantity: -req.body.quantity * 100 },
    },
    { quantity: true }
  );
  if (!product) return res.status(400).send("Invalide product");

  let purchase = new Purchase({
    quantity: req.body.quantity,
    customer: customer,
    product: product,
    deliveryDetails: {
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      state: req.body.state,
    },
    paymentDetails: {
      cardName: req.body.cardName,
      cardNumber: req.body.cardNumber,
      cvv: req.body.cvv,
      expDate: req.body.expDate,
    },
  });

  purchase = await purchase.save();

  res.send(purchase);
});

module.exports = router;
