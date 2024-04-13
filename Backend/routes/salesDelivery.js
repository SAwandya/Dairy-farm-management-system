const express = require("express");
const router = express.Router();
const { Delivery } = require("../models/salesDelivery");

router.get("/:id", async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);
  res.send(delivery);
});

module.exports = router;

