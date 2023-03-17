const userData = require("../models/users.model");
const productData = require("../models/product.model");
class Cart {
  index(req, res, next) {
    productData
      .find({ "customer.cusid": { $in: [req.cookies.id] } })
      .then((user) => {
        const product = user.map((item) => item.toObject());
        res.render("cart", { product });
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
