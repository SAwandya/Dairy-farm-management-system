const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

mongoose
.connect("mongodb://localhost/dairydb")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Could not connect to MongoDB"));

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
