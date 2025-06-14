const mongoose = require("mongoose");

//Create the structure of the documents
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  inStock: Boolean,
});

//Export the schema
module.exports = mongoose.model("product", productSchema);
