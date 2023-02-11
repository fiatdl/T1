const express = require("express");
const Route = express.Router();
const ProductController = require("../controllers/product")
Route.get("/women", ProductController.women);
Route.get("women/:type/:id", ProductController.specific)
Route.get("/men", ProductController.men);
Route.get("/kid", ProductController.kid);
Route.get("/phukien", ProductController.phukien);
module.exports = Route;
