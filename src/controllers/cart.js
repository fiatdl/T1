const userData = require("../models/users.model");
const productData = require("../models/product.model");
class Cart {
  index(req, res, next) {
    let isAdmin = false;
    if (req.cookies.role) {
      isAdmin = req.cookies.role === "admin" ? true : false;
    }
    else { isAdmin = false; }
    productData
      .find({ "customer.cusid": { $in: [req.cookies.id] } })
      .then((user) => {
        const product = user.map((item) => item.toObject());
        res.render("cart", { product, admin: isAdmin });
      })
      .catch((err) => console.log(err));
  }
  bought(req, res, next) {
    res.json(req.body);
  }
  addtocart(req, res, next) {
    productData.findByIdAndUpdate(
      req.body.idproduct,
      {
        $push: {
          customer: { cusid: req.cookies.id, quantity: req.body.quantity },
        },
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", docs);
        }
      }
    );
    res.redirect("/cart");
  }
}
module.exports = new Cart();
