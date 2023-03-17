const Product = require("../models/product.model");
class ProductController {
  gender(req, res, next) {
    Product.find({ gender: req.params.gender })
      .then((items) => {
        items = items.map((item) => item.toObject());

        res.render("products", { items });
      })
      .catch((err) => res.json(err));
  }
  type(req, res, next) {
    Product.find({ gender: req.params.gender, type: req.params.type })
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
        data = data ? data.toObject() : data;
        res.render("specific", { data });
      })
      .catch((err) => console.log(err));
  }
}
module.exports = new ProductController();
