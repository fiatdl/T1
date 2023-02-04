const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true // `email` must be unique
  },
  price:{
    type:Number,
  
  }
});
const Product = mongoose.model('Product', productSchema);
module.exports=Product;