// Import modules
const fs = require("fs");
const crypto = require("crypto");
const write = require("../utils/write");

// Cars data
let cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/cars.json`, "utf-8"),
);

// Get all cars
exports.getAllCars = (req, res) => {
  res.status(200).json({
    message: "All cars data is here",
    results: cars.length,
    cars,
  });
};

// Create a new car
exports.createCar = (req, res) => {
  const newCar = { ...req.body, id: crypto.randomUUID() };

  cars.push(newCar);

  write(cars);

  res.status(201).json({ message: "Car created successfully", newCar });
};

// Get a single car
exports.getCar = (req, res) => {
  res.status(200).json({ message: "Car found", car: req.car });
};

// Delete a car
exports.deleteCar = (req, res) => {
  cars = cars.filter((car) => car.id !== req.car.id);

  write(cars);

  res.status(204).json({ message: "Car deleted successfully" });
};

// Update a car
exports.updateCar = (req, res) => {
  const updateCar = req.body;

  const updatedCar = { ...req.car, ...updateCar };

  const index = cars.findIndex((car) => car.id === req.car.id);

  cars.splice(index, 1, updatedCar);

  write(cars);

  res.status(200).json({ message: "Car updated successfully", updatedCar });
};
