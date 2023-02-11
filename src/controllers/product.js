const Product = require("../models/product.model");
class ProductController {
  women(req, res, next) {
    Product.find({ gender: "nu" })
      .then((items) => {
        items = items.map((item) => item.toObject());

        res.render("products", { items });
      })
      .catch((err) => res.json(err));
  }
  men(req, res, next) {
    Product.find({ gender: "nam" })
      .then((items) => {
        items = items.map((item) => item.toObject());

        res.render("products", { items });
      })
      .catch((err) => res.json(err));
  }
  kid(req, res, next) {
    Product.find({ gender: "kid" })
      .then((items) => {
        items = items.map((item) => item.toObject());

        res.render("products", { items });
      })
      .catch((err) => res.json(err));
  }

  phukien(req, res, next) {
    Product.find({ gender: "phukien" })
      .then((items) => {
        items = items.map((item) => item.toObject());

        res.render("products", { items });
      })
      .catch((err) => res.json(err));
  }

  specific(req, res, next) {
    const id = req.params.id;
    Product.findOne({ _id: id })
      .then((data) => {
        data = data.map((datas) => datas.toObject());
        res.render("product", { data });
      })
      .catch((err) => console.log(err));
  }
}
module.exports = new ProductController();
