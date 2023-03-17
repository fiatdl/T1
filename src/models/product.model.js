const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true, // `email` must be unique
  },
  customer: [{ quantity: Number, cusid: String }],
  img: {
    type: String,
  },
  price: {
    type: Number,
  },
  gender: {
    type: String,
  },
  type: {
    type: String,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
