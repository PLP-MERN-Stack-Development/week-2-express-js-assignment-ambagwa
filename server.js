// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHhandler");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb://localhost:27017/productsStoreDBD";

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//Custom middleware
app.use(logger);

// Sample in-memory products database
let products = [
  {
    id: "1",
    name: "Laptop",
    description: "High-performance laptop with 16GB RAM",
    price: 1200,
    category: "electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Smartphone",
    description: "Latest model with 128GB storage",
    price: 800,
    category: "electronics",
    inStock: true,
  },
  {
    id: "3",
    name: "Coffee Maker",
    description: "Programmable coffee maker with timer",
    price: 50,
    category: "kitchen",
    inStock: false,
  },
];

// Root route
app.get("/", (req, res) => {
  res.send("Hello world");
});

//Fire up MongoDB
mongoose
  .connect(MONGO_URI, {
    UseNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected successfully"))
  .catch((err) => console.error(`MongoDB Error: ${err}`));

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product
//Use the routes
app.use("/api/products", productRoutes);

// Example route implementation for GET /api/products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

//Global error handler
app.use(errorHandler);

//Route to test the error handler
app.get('/api/error-test', (req, res, next) => {
  // Create and throw an error
  const err = new Error('This is a test error!');
  err.status = 400; // Optional: set a custom status code
  next(err); // Pass the error to the error handler
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;
