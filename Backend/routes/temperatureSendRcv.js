//temperatureSendRcv.js
const express = require('express');
const router = express.Router();
const Temperature = require('../models/temperature');

// POST route to receive temperature data
router.post('/temperature', async (req, res) => {
  try {
    const { temperature } = req.body;
    // Save temperature data to MongoDB
    const newTemperature = new Temperature({ temperature });
    await newTemperature.save();
    res.status(201).json({ message: 'Temperature data received and saved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
