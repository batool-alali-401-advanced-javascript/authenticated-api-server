module.exports = (req, res, next) => {
  console.log(`properties of the request:', method: ${req.method}, path: ${req.path}, date ${req.requestTime}`);
  next();
};