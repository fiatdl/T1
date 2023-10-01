const express = require("express");
const Route = express.Router();
const Home = require("../../controllers/user/home.user.controllers");

Route.get("/", Home.defaultDisplay);
Route.post("/:type", Home.displayProductByType);
module.exports = Route;