const express = require("express");
const router = express.Router();
const { Customer } = require("../models/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOne({ email: req.body.email });
  if (!customer) return res.status(400).send("Invalide email or password");

  const validePassword = await bcrypt.compare(
    req.body.password,
    customer.password
  );
  if (!validePassword)
    return res.status(400).send("Invalide email or password");

  const token = jwt.sign({ _id: customer._id }, config.get("jwtPrivateKey"));

  res.send({ token: token, customer: customer });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  var result = schema.validate(req);

  return result;
}

module.exports = router;
