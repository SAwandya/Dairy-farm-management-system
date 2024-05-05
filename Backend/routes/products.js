const express = require("express");
const router = express.Router();
const { Product, validate } = require("../models/product");
const ProductBatch = require("../models/ProductBatch");

router.get("/", async (req, res) => {
  const products = await Product.find();

  res.send(products);
});

router.get("/:id", async (req, res) => {
  const products = await Product.findById(req.params.id);
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = await Product.findByIdAndUpdate(req.params.id, {
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

  if (!product)
    return res.status(400).send("The product wit the given id not found");

  res.send(product);
});

router.post("/releasedadd", async (req, res) => {

  let product = await Product.findOne({
    name: req.body.name,
    unitOfMeasurement: req.body.variant
  });

  product = await Product.findByIdAndUpdate(
    product._id,
    {
      $inc: { quantity: +req.body.quantity / 20 },
      
    },
    { quantity: true }
  );

  await ProductBatch.findByIdAndUpdate(req.body._id,{
    collect: true,
  })

  res.send(product);
});

router.put("/publish/:id", async (req, res) => {
  let product = await Product.findByIdAndUpdate(req.params.id, {
    publish: req.body.publish,
  });

  product = await product.save();

  if (!product)
    return res.status(400).send("The product with the given id not found");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);

  if (!product)
    return res.status(400).send("The product with the given id not found");

  res.send(product);
});

module.exports = router;
