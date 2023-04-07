const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roll: { type: String, required: true, default: "buyer" },
})

module.exports = mongoose.model("User", UserSchema);