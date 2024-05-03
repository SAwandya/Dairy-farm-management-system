const express = require("express");
const { default: mongoose } = require("mongoose");
const http = require("http"); // Import the HTTP module for creating an HTTP server
const WebSocket = require("ws"); // Import the WebSocket module
const app = express();
const products = require("./routes/products");
const customers = require("./routes/customers");
const cors = require("cors");
const config = require("config");
const auth = require("./routes/customerAuth");
const purchase = require("./routes/purchases");
const animalReg = require("./routes/animalRegister");
const vaccAnim = require("./routes/vacAnimal");
const exmAnim = require("./routes/exmAnimal");
const pregnantCow = require("./routes/pregnantCow");
const messages = require("./routes/messages");
const employee = require("./routes/eRegister");
const supplier = require("./routes/supplier");
const order = require("./routes/order");
const item = require("./routes/item");
const milkingSessions = require("./routes/milkingSessionRoute");
const milkingData = require("./routes/milkingDataRoute");
const milkingStorage = require("./routes/storageTankRoute");
const pdf = require("./routes/pdf");
const pasture=require("./routes/pastureDetails");
const temperatureSendRcv = require("./routes/temperatureSendRcv");
const processCrud = require("./routes/processCrud");
const productBatchCrud = require("./routes/productBatchCrud");
const payment = require("./routes/payments");
const session=require("./routes/sessions");
const waste=require("./routes/effluentRoutes");
const cart = require("./routes/Carts");
const salesDelivery = require("./routes/salesDelivery");
const inventory = require("./routes/inventory");
const transaction = require("./routes/transaction");
const reorderMessage = require("./routes/reorderNotifications");


if (!config.get("jwtPrivateKey")) {
  console.log("FATA ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect(
    "mongodb+srv://sachilaawandya:PvBJDLO7Df1PvBVU@dfms.zgzy5mn.mongodb.net/?retryWrites=true&w=majority&appName=DFMS"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err + ", Could not connect to MongoDB"));

app.use(cors()); //Enable CORS for all routes

app.use(express.json());

app.use("/api/products", products);

app.use("/api/customers", customers);

app.use("/api/auth", auth);

app.use("/api/purchase", purchase);

app.use("/api/animalReg", animalReg);

app.use("/api/vacAnim", vaccAnim);

app.use("/api/exmAnim", exmAnim);

app.use("/api/pregnantCow",pregnantCow);

app.use("/api/messages", messages);

app.use("/api/employee", employee);

app.use("/api/supplier", supplier);

app.use("/api/order", order);

app.use("/api/item", item);

app.use("/api/milkingSessions", milkingSessions);

app.use("/api/milkingData", milkingData);

app.use("/api/milkingStorage", milkingStorage);

//production management
app.use("/api/processCrud", processCrud);
app.use("/api/temperatureSendRcv", temperatureSendRcv);
app.use("/api/productBatchCrud", productBatchCrud);

app.use("/api/invoice", pdf);

app.use("/api/pastureDetails",pasture);

app.use("/api/payments", payment);

app.use("/api/sessions", session);

app.use("/api/effluentRoutes",waste);


app.use("/api/carts", cart);

app.use("/api/salesdelivery", salesDelivery);

app.use("/api/inventory", inventory);

app.use("/api/transaction", transaction);

app.use("/api/reordernotify", reorderMessage);


const server = http.createServer(app); // Create an HTTP server using Express app

const wss = new WebSocket.Server({ port: 3030 }); // Create a WebSocket server attached to the HTTP server

// Set wss as a local variable accessible from request object
app.locals.wss = wss;

wss.on("connection", function connection(ws) {
  console.log("Client connected");


  ws.on("message", function incoming(message) {
    console.log("Received: %s", message);
    ws.send("Hello, client!"); // Send a message to the client
  });

  ws.on("close", function () {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}...`));
