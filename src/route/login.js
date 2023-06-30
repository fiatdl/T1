const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/login");
router.get("/", LoginController.index);
router.get("/google", LoginController.googleauth);
router.post("/", LoginController.checkEmail, LoginController.login);
module.exports = router;
