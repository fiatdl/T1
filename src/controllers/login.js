const user = require("../models/users.model");
var jwt = require("jsonwebtoken");
var Cookies = require("cookies-js");
const bcrypt = require('bcrypt');
const saltRounds = 10;
class LoginController {
  index(req, res, next) {
    res.render("login", { loginform: true, addProcessing: true });

  }

  async checkEmail(req, res, next) {
    await user.find({ email: req.body.username }).then((docs) => {
      if (docs.length === 0) {
        res.render("login", {
          message: "tài khoản chưa  được đăng kí",
          announce: true,
        });
      }
    });
    next();

  }

  login(req, res, next) {
    user
      .findOne({
        email: req.body.username,
      })
      .then((data) => {
        if (data) {
          bcrypt.compare(req.body.password, data.password).then(function (result) {
            if (result) {
              const token = jwt.sign({ name: req.body.username }, "fiat");
              res.cookie("id", data._id);
              res.cookie("token", token);
              res.cookie("avatar", data.avatar);
              res.cookie("username", data.fullName);
              res.cookie("password", data.password);
              res.cookie("role", data.role);
              if (data.avatar === undefined) {
                res.redirect("/user/setavatar");
              } else {
                res.redirect("/");
              }
            } else {
              res.render("login", {
                message: "sai mật khẩu",
                announce: true,
              });
            }
          });
        } else {
          res.render("login");
        }
      })
      .catch((err) => console.log(err));
  }
}
module.exports = new LoginController();
