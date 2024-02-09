const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const products = require("./routes/products");

mongoose
  .connect("mongodb://localhost/dairydb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB"));

app.use(express.json());

app.use("/api/products", products);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
