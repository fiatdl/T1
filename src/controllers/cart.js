const userData = require("../models/users.model");
const productData = require("../models/product.model");
const oderData = require("../models/oder.model");
class Cart {
  index(req, res, next) {
    let isAdmin = false;
    if (req.cookies.role) {
      isAdmin = req.cookies.role === "admin" ? true : false;
    } else {
      isAdmin = false;
    }
    oderData.find({ customer: req.cookies.id }).then(e => {

      let love = [];
      let quan = [];
      for (let i = 0; i < e[0]["cart"].length; i++) {
        love.push({ id: e[0]["cart"][i]["productId"], quantity: e[0]["cart"][i]["quantity"] });
      }
      let l = love.map(e =>
        e.id);
      productData.find({ _id: { "$in": [...new Set(l)] } }).then(
        e => {
          e = e.map((e) => e.toObject());


          let newA = [...new Set(l)];

          for (let i = 0; i < newA.length; i++) {
            quan[i] = 0;
            love.forEach((item) => {
              if (item.id === newA[i])
                quan[i] += item.quantity;
            })
          };
          let result = quan.map(function (item) {
            return { quantity: item };
          });

          let re = e.map(function (obj, index) {
            return { ...obj, quantity: result[index].quantity };
          });


          res.render("cart", { item: re });
        }
      )
    })
      .catch((err) => console.log(err));
  }
  bought(req, res, next) {
    res.json(req.body);
  }
  addtocart(req, res, next) {

    const newarr = [{ productId: req.body.idproduct, quantity: req.body.quantity }];
    const values = req.body.quantity * req.body.price;

    oderData.find({ customer: req.cookies.id }).then(e => {

      if (e.length === 0) {
        const love = new oderData({
          customer: req.cookies.id,
          cart: newarr,
          value: values
        });
        love.save();
        res.redirect("/cart")
      } else {

        oderData.findOneAndUpdate({ _id: e[0]["_id"] }, { $push: { cart: newarr }, $inc: { value: values } }).then(ed => {
          res.redirect("/cart");
        }).catch(er => { console.log(er) })
      }
    }).catch(e => {
      console.log(e);
    })
  }
}
module.exports = new Cart();