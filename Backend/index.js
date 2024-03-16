const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const products = require("./routes/products");
const customers = require("./routes/customers");
const cors = require("cors");
const config = require("config");
const auth = require("./routes/customerAuth");
const purchase = require("./routes/purchases");

if (!config.get("jwtPrivateKey")) {
  console.log("FATA ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect(
    "mongodb+srv://sachilaawandya:PvBJDLO7Df1PvBVU@dfms.zgzy5mn.mongodb.net/?retryWrites=true&w=majority&appName=DFMS")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err + ", Could not connect to MongoDB"));

app.use(cors()); //Enable CORS for all routes

app.use(express.json());

app.use("/api/products", products);

app.use("/api/customers", customers);

app.use("/api/auth", auth);

app.use("/api/purchase", purchase);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
