const express = require("express");
const router = express.Router();
const { validate, Customer } = require("../models/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get('/', async (req, res) => {

  const customers = await Customer.find();

  res.send(customers);
})

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({ email: req.body.email });
  if (customer) return res.status(400).send("User already registered");

  customer = new Customer({
    name: req.body.name,
    type: req.body.type,
    address: req.body.type,
    phone: req.body.phone,
    rep: req.body.rep,
    licenseNo: req.body.licenseNo,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);
  customer = await customer.save();

  let token = jwt.sign({ _id: customer._id }, config.get("jwtPrivateKey"));

  res.header("x-auth-token", token).send({
    name: customer.name,
    email: customer.email,
  });
});

module.exports = router;
