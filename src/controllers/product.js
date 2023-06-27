const Product = require("../models/product.model");
const paypal = require('paypal-rest-sdk');
class ProductController {

  specific(req, res, next) {

    const id = req.params.id;
    let isAdmin = false;
    if (req.cookies.role) {
      isAdmin = req.cookies.role === "admin" ? true : false;
    }
    else { isAdmin = false; }

    Product.findOne({ _id: id }).populate('host')
      .then((data) => {

        data = data ? data.toObject() : data;
        let img = data.img;

        res.render("specific", { img, data, admin: isAdmin });
      })
      .catch((err) => console.log(err));
  }
  payment(req, res, next) {
    const value = req.body.final;
    res.cookie("value", value);
    const create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": "http://localhost:3000/product/payment/success",
        "cancel_url": "http://localhost:3000"
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": "item",
            "sku": "item",
            "price": value,
            "currency": "USD",
            "quantity": 1
          }]
        },
        "amount": {
          "currency": "USD",
          "total": value
        },
        "description": "This is the payment description."
      }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });

  }

  success(req, res, next) {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": req.cookies.value
        }
      }]
    };
    res.clearCookie("final");
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.render('success');
      }
    });
  }

}
module.exports = new ProductController();
