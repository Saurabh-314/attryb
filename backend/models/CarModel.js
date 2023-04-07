const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
  title: { type: String, required: true },
  point: { type: String, required: true },
  price: { type: String, required: true },
  color: { type: String, required: true },
  mileage: { type: String, required: true },
  image: { type: String }
})

module.exports = mongoose.model("Car", CarSchema);