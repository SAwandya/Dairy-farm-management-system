const express = require("express");
const router = express.Router();
const { Product, validate } = require("../models/product");

router.get("/", async (req, res) => {
    const products = await Product.find().sort("name");
    res.send(products);
});

router.post("/", async (req, res) => {

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      unitOfMeasurement: req.body.unitOfMeasurement,
      expirationDate: req.body.expirationDate,
      manufacDtae: req.body.manufacDtae,
    });

    product = await product.save();

    res.send(product);
})

module.exports = router;