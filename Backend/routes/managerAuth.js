const express = require("express");
const router = express.Router();
const { Manager } = require("../models/manager");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const manager = await Manager.findOne({ email: req.body.email });
  if (!manager) return res.status(400).send("Invalide email or password");

  if (!(manager.password == req.body.password))
    return res.status(400).send("Invalide email or password");

  const token = jwt.sign({ _id: manager._id }, config.get("jwtPrivateKey"));

  res.send(token);
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
