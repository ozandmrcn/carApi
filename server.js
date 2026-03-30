const {
  getAllCars,
  createCar,
  getCar,
  updateCar,
  deleteCar,
} = require("./controllers");

// Setup
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { logger } = require("./middleware");
const idControl = require("./middleware/idControl");

// Middleware for logging
app.use(logger);

// Middleware for request body
app.use(express.json());

// Middleware for CORS
app.use(cors());

// Routes

app.route("/api/v1/cars").get(getAllCars).post(createCar);

app
  .route("/api/v1/cars/:id")
  .get(idControl, getCar)
  .patch(idControl, updateCar)
  .delete(idControl, deleteCar);

// Error Handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON format. Please check your request body.",
      error: err.message,
    });
  }
  next();
});

// Server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
