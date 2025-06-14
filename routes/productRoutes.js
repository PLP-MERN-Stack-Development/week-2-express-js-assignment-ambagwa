//Interaction with the db
const express = require("express");
const router = express.Router();
const Product = require("../models/products");

//Custom middleware
const validateProduct = require("../middleware/validateProduct");
const auth = require("../middleware/auth");
const {
  NotFoundError,
  ValidationError,
} = require("../middleware/customErrors");

//Create a new product
router.post("/", validateProduct, auth, async (req, res) => {
  try {
    if (!req.body.name) {
      throw new ValidationError("Product name is required");
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    next(err);
  }
});

//List all products
router.get("/", auth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    //Pagination parameters
    const page = parseint(req.query.page) || 1; //Default page 1
    const limit = parseInt(req.query.limit) || 10; //Default to 10 items
    const skip = (page - 1) * limit;

    const products = await Product.find(filter).skip(skip).limit(limit);

    const total = await Product.countDocuments(filter);

    res.send({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    next(err);
  }
});

//Get a specific product
router.get("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    res.send(product);
  } catch (err) {
    next(err);
  }
});

//Update a product
router.put("/:id", validateProduct, auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).send({ message: "Product Not Found" });
    res.send(product);
  } catch (error) {
    next(err);
  }
});

//Delete a product
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send({ message: "Product Not Found" });
    res.send(product);
  } catch (error) {
    next(err);
  }
});

//Create a search endpoint that allows searching products by name
router.get("/search", auth, async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({
        error: "Query parameter 'name' is required",
      });
    }

    //case-insensitive search using a reqular expression
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
