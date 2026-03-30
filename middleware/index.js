exports.logger = (req, res, next) => {
  console.log("Request received, METHOD: ", req.method, "URL: ", req.url);

  next();
};
