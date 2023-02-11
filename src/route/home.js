const express = require("express");
const Route = express.Router();
const Home = require("../controllers/home");

Route.get("/", Home.index);
module.exports = Route;