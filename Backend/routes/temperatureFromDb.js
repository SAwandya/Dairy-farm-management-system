const WebSocket = require('ws');
const Temperature = require('../models/temperature');

// WebSocket clients array
const clients = [];

// Function to send temperature updates to WebSocket clients
function sendTemperatureUpdateToClients(temperature) {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ temperature }));
    }
  });
}

// Function to listen for temperature changes in MongoDB
async function listenForTemperatureChanges() {
  const changeStream = Temperature.watch();
  changeStream.on('change', async (change) => {
    if (change.operationType === 'insert') {
      const temperature = change.fullDocument.temperature;
      // Emit temperature update to WebSocket clients
      sendTemperatureUpdateToClients(temperature);
    }
  });
}

// Function to handle WebSocket connections
function handleWebSocketConnection(ws) {
  // Add client to clients array
  clients.push(ws);

  // Remove client from clients array when connection is closed
  ws.on('close', function () {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
}

module.exports = { listenForTemperatureChanges, handleWebSocketConnection };
