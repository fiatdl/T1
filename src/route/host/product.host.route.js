const express = require("express");
const Route = express.Router();
const ProductController = require("../../controllers/host/product.host.controllers");


const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./src/public/img/post");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).array("productImg", 12);


Route.get("/addproduct", ProductController.displayProductAddingForm);
Route.post("/addproduct/savedata", ProductController.saveDataFromForm);
Route.get("/addproduct/secondstep", ProductController.displayProductAddingForm1);
Route.post("/addproduct/savesecondstepdata", ProductController.saveDataFromForm1);
Route.get("/addproduct/thirdstep", ProductController.displayProductAddingForm2);
Route.post("/addproduct/savenewproduct", upload, ProductController.saveNewProduct);
module.exports = Route;