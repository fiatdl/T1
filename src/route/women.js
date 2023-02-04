const express=require("express");
const Route=express.Router();
const WomenControler=require("../controllers/women")
Route.get("/",WomenControler.index);
module.exports=Route;
