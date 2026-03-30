const fs = require("fs");

module.exports = (req, res, next) => {
  const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/cars.json`, "utf-8"),
  );

  const { id } = req.params;

  const car = cars.find((car) => car.id === id);

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  req.car = car;

  next();
};
