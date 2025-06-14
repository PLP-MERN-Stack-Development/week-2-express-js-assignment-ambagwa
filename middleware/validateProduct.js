//Validation middleware for product creation and update routes

const validateProduct = (req, res, next) => {
  const { name, price, description, id } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Product name is required and must be a non-empty string",
    });
  }

  if (typeof description !== "string" || description.trim() === "") {
    return res.status(400).json({
      error: "Product description is required and must be a non-empty string",
    });
  }

  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({
      error: "Product id is required and must be a non-empty string",
    });
  }
if (typeof price !== "number" || price < 0) {
    return res.status(400).json({
      error: "Product price is required and must be a non-negative number",
    });
  }

};



module.exports = validateProduct;