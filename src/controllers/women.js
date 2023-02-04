const Product = require("../models/product.model");
class Women {
  index(req, res, next) {
    Product.find()
      .then((items) => {
        items = items.map((item) => item.toObject());
        res.render("women", { items });
      })
      .catch((err) => res.json(err));
  }
}
module.exports = new Women();
