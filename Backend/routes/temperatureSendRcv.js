// temperatureSendRcv.js

const express = require('express');
const router = express.Router();
const WebSocket = require('ws'); // Import WebSocket module

const wss = new WebSocket.Server({ noServer: true }); // Create WebSocket server

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// POST route to receive temperature data
router.post('/temperature', async (req, res) => {
  try {
    const { temperature } = req.body;
    // Save temperature data to MongoDB
    const newTemperature = new Temperature({ temperature });
    await newTemperature.save();
    
    // Emit temperature update to WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ temperature }));
      }
    });

    res.status(201).json({ message: 'Temperature data received and saved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


/*

Esp32 code

#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

const char* ssid = "Dialog 4G 841";
const char* password = "91cAAaFF";
const char* serverAddress = "http://192.168.8.186:3000/api/temperatureSendRcv/temperature";
// Replace "192.168.1.100" with your server's IP address

DHT dht(DHTPIN, DHTTYPE);
float previousTemperature = -999; // Initialize with an unlikely value

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi connected");
}

void loop() {
  delay(2000);
  float temperature = dht.readTemperature();

  if (isnan(temperature)) {
    Serial.println("Failed to read temperature from DHT sensor");
    return;
  }

  // Check if the temperature has changed
  if (temperature - previousTemperature >= 1 || temperature - previousTemperature <= -1 ) {
    HTTPClient http;
    http.begin(serverAddress);
    http.addHeader("Content-Type", "application/json");

    String payload = "{\"temperature\": " + String(temperature) + "}";
    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("HTTP Response Code: " + String(httpResponseCode));
      Serial.println(response);
      previousTemperature = temperature; // Update previous temperature
    } else {
      Serial.println("Error sending data to server");
    }

    http.end();
  }
}


*/