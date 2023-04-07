const Car = require("../models/CarModel.js");

exports.get = async (req, res) => {
  const allCar = await Car.find({});
  res.status(200).json(allCar);
}

exports.getById = async (req, res) => {
  const car = await Car.findOne({ _id: req.params.id });
  res.status(200).json(car);
}

exports.create = async (req, res) => {
  const { title, price, color, point, mileage } = req.body;
  const path = req.files;
  const car = await Car({
    title, price, color, point, mileage,
    image: path
  });
  await car.save();
  res.status(201).json({ message: "success" });
}

exports.remove = async (req, res) => {
  await Car.findOneAndDelete({ _id: req.params.id });
  res.json({ status: true, message: "success" })
}

exports.edit = async (req, res) => {
  const { title, price, color, point, mileage } = req.body;
  // const { path } = req.file;
  // console.log(path)
  // const resp = await Car.updateOne(
  //   { _id: req.params.id },
  //   {
  //     $set: {
  //       title: title,
  //       price: price,
  //       color: color,
  //       point: point,
  //       mileage: mileage,
  //       image: path
  //     }
  //   }
  // );
  // // const resp = await Car.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
  // console.log("res", resp);
  res.json({ message: "success" });
}