const errorHandler = (req, res, next, err) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
