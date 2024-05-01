const express = require('express');
const router = express.Router();
const WebSocket = require('ws'); // Import WebSocket module
const Temperature = require('../models/temperature');

// POST route to receive temperature data
router.post('/temperature', async (req, res) => {
  try {
    const { temperature, humidity, moisture } = req.body;
    // Save temperature data to MongoDB
    const newTemperature = new Temperature({ temperature, humidity, moisture });
    await newTemperature.save();
    
    // Emit temperature update to WebSocket clients
    req.app.locals.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ temperature }));
      }
    });

    res.status(201).json({ message: 'Temperature data received and saved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// retrieve temp, humi, mois from MongoDB
router.get('/data', async (req, res) => {
  try {

    const latestData = await Temperature.findOne().sort({ recordedAt: -1 });
    if (!latestData) {
      return res.status(404).json({ message: 'No data found' });
    }

    const { temperature, humidity, moisture } = latestData;

    // Send the retrieved data as JSON response
    res.json({ temperature, humidity, moisture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
