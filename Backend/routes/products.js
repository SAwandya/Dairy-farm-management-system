const express = require("express");
const router = express.Router();
const { Product, validate } = require("../models/product");

router.get("/", async (req, res) => {
    const products = await Product.find.sort("name");
    res.send(products);
})