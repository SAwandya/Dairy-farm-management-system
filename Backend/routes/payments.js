const express = require("express");
const router = express.Router();
const { Payment } = require("../models/salesPayment");

router.get("/:id", async (req, res) => {
  const payment = await Payment.find({
    customerId: req.params.id,
  });
  res.send(payment);
});

module.exports = router;
