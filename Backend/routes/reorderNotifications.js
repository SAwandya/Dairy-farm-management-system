const express = require("express");
const router = express.Router();
const { ReorderMessage } = require("../models/reorderNotification");

router.get("/", async (req, res) => {

    let message = await ReorderMessage.find()

    res.send(message);
});

module.exports = router;
