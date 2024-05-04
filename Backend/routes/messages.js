const express = require("express");
const router = express.Router();
const { Message, validate } = require("../models/message");
const { Purchase } = require("../models/purchase");

router.get("/:id", async (req, res) => {
  const message = await Message.find({
    "purchase.customer._id": req.params.id,
  });

  res.send(message);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const purchase = await Purchase.findById(req.body.purchaseId);
  if (!purchase) return res.status(400).send(error.details[0].message);

  let message = new Message({
    message: req.body.message,
    purchase: purchase,
  });

  message = await message.save();

  res.send(message);
});

module.exports = router;
