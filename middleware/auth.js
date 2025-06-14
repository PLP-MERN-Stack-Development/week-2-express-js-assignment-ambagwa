const auth = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  const validApiKey = "my-hardcoded-api-key";

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({
      error: "Unauthorized: Invalid or missing API ky",
    });
  }

  next();
};


module.exports = auth;