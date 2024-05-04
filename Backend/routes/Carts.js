const express = require("express");
const router = express.Router();
const { Cart, validateCart } = require("../models/salesCart");
const { Customer } = require("../models/customer");
const { Product } = require("../models/product");
const ProductBatch = require("../models/ProductBatch");
const { ReorderMessage } = require("../models/reorderNotification");

router.get("/", async (req, res) => {
  const carts = await Cart.find();
  res.send(carts);
});

router.get("/:id", async (req, res) => {
  const carts = await Cart.find({
    "customer._id": req.params.id,
  });
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

  //automate the re-order process

  if (product) {
    const productId = req.body.productId;

    let updatedProduct = await Product.findById(productId);

    if (updatedProduct.quantity < 50) {
      let productbatch = await ProductBatch.findOne({
        name: updatedProduct.name,
        variant: updatedProduct.unitOfMeasurement,
        released: true,
        collect: false,
      });

      if (!productbatch) {
        //send notification to the production
        console.log("has been reached minimum level");
        let message = new ReorderMessage({
          message: `${updatedProduct.name} has reached the minimum stock level`,
          product: updatedProduct,
        });

        message = await message.save();
      } else {
        updatedProduct = await Product.findByIdAndUpdate(
          updatedProduct._id,
          {
            $inc: { quantity: +productbatch.quantity / 20 },
          },
          { quantity: true }
        );

        productbatch = await ProductBatch.findByIdAndUpdate(productbatch._id, {
          collect: true,
        });
      }
    }
  } else {
    return res.status(400).send("Invalide product");
  }

  //================================

  if (!product) return res.status(400).send("Invalide product");

  let cart = new Cart({
    quantity: req.body.quantity,
    product: product,
    customer: customer,
  });

  cart = await cart.save();

  res.send(cart);
});

router.delete("/:id", async (req, res) => {
  let cart = await Cart.findById(req.params.id);

  const product = await Product.findByIdAndUpdate(
    cart?.product._id,
    {
      $inc: { quantity: +cart.quantity },
    },
    { quantity: true }
  );

  cart = await Cart.findByIdAndDelete(req.params.id);

  if (!cart)
    return res.status(400).send("The cart with the given id not found");

  res.send(cart);
});

module.exports = router;
