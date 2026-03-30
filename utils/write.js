const fs = require("fs");

module.exports = (cars) => {
  fs.writeFile(
    `${__dirname}/../data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      if (err) {
        console.log("An error occurred while writing the file:", err);
      }

      return;
    },
  );
};
