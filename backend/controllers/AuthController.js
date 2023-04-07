const User = require("../models/User.js");
const bcrypt = require("bcrypt");


exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.json({ message: "user Already exist" });
  }

  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  const user = await User({
    firstName, lastName, email, password: hash
  })
  await user.save();
  res.json({ status: true, message: "user is created", user });
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(406).json({ message: "Credentials not found" });
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return res.status(400).json({ message: "Credentials not found" });
  }
  res.json({ status: true, message: "successfully logged in", user });
}