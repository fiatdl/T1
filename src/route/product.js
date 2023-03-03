const express = require("express");
const Route = express.Router();
const ProductController = require("../controllers/product")

Route.get("/:gender", ProductController.gender);

Route.get("/:gender/:type", ProductController.type);
Route.get("/:gender/:type/:id", ProductController.specific);
module.exports = Route;
