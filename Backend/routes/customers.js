const express = require("express");
const router = express.Router();
const { validate, Customer } = require("../models/customer");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    type: req.body.type,
    address: req.body.type,
    phone: req.body.phone,
    rep: req.body.rep,
    licenseNo: req.body.licenseNo,
    email: req.body.email,
  });

  customer = await customer.save();

  res.send(customer);
});

module.exports = router;
