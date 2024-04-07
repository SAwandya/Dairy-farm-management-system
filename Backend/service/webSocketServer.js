//webSocketServer.js
//websocket for real time temperature update


const WebSocket = require('ws');

// WebSocket clients array
const clients = [];

// WebSocket server setup
const wss = new WebSocket.Server({ noServer: true }); // Create WebSocket server

// WebSocket upgrade handler
function handleUpgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
}

// WebSocket connection handler
function handleWebSocketConnection(ws) {
  console.log('Client connected');

  // Remove client from clients array when connection is closed
  ws.on('close', function () {
    console.log('Client disconnected');
  });
}

// Function to send temperature updates to WebSocket clients
function sendTemperatureUpdateToClients(temperature) {
  clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ temperature }));
    }
  });
}

module.exports = {
  handleUpgrade,
  handleWebSocketConnection,
  sendTemperatureUpdateToClients
};
