const express=require("express");
const Route=express.Router();
const addProductController=require("../controllers/addProduct");

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./src/public/img/post");
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
  });
  
  var upload = multer({ storage: storage }).single("productImg");
Route.get("/",addProductController.index);
Route.post("/",upload,addProductController.add);
module.exports=Route;