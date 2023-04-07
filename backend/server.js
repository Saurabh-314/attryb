const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const index = require("./routes/index.js");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/uploads", express.static('uploads'));


app.use("/", index);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("db connection successfully");
}).catch((err) => {
  console.log("err.message");
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})