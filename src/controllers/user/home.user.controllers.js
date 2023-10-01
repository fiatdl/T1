const hotel = require("../../models/product.model");
const type = require("../../models/type.model");
const collection = require("../../models/collection.model");
class Home {
    displayProductByType(req, res, next) {

        let isLoggedIn = (req.cookies.token)
            ? true
            : false;
        let isAdmin = (req.cookies.role === "admin" && isLoggedIn)
            ? true
            : false;

        hotel.find({ type: req.body._id, validByAdmin: true }).then((list) => {
            list = list.map((item) => item.toObject());

            type.find({}).then((e) => {
                e = e.map((i) => i.toObject());

                collection.find({ user: req.cookies.id }).then((item) => {
                    item = item.map((item) => item.toObject());
                    res.render("home", { list, islogged: isLoggedIn, e, isAdmin: isAdmin });
                }).catch((err) => { console.error(err) });



            }).catch(err => { console.log(err) });

        });
    }
    defaultDisplay(req, res, next) {

        let isLoggedIn = (req.cookies.token)
            ? true
            : false;
        let isAdmin = (req.cookies.role === "admin" && isLoggedIn)
            ? true
            : false;
        let start = req.query.start || "";
        let end = req.query.end || "";
        let quantity = req.query.quantity || 1;
        let search = req.query.search || "";
        let logged;

        if (req.cookies.token) {
            logged = true;
        }
        else {
            logged = false;
        }



        const day1 = (start !== "") ? new Date(start) : Date.now();
        const day2 = (end !== "") ? new Date(end) : Date.now();
        if (search !== "") {

            hotel
                .find({
                    name: { $regex: "^" + search, $options: "i" }, startday: {
                        $lte: day1,
                    },
                    endday: {
                        $gte: day2,
                    },
                    maximuncus: {
                        $gte: quantity
                    },
                    validByAdmin: true
                })
                .then((list) => {
                    list = list.map((item) => item.toObject());

                    type.find({}).then((e) => {
                        e = e.map((i) => i.toObject());
                        collection.find({ user: req.cookies.id }).then(wish => {
                            wish = wish.map((i) => i.toObject());
                            let name = req.cookies.username;
                            let email = req.cookies.email;
                            let phone = req.cookies.phone;
                            let avatar = req.cookies.avatar;
                            res.render("home", { name, email, phone, avatar, list, islogged: isLoggedIn, e, wish, isAdmin: isAdmin });
                        }).catch(err => console.log(err));

                    }).catch(err => console.log(err));
                })
        }
        else {
            hotel
                .find({ validByAdmin: true })
                .then((list) => {
                    list = list.map((item) => item.toObject());

                    type.find({}).then((e) => {
                        e = e.map((i) => i.toObject());
                        collection.find({ user: req.cookies.id }).then(wish => {
                            wish = wish.map((i) => i.toObject());
                            let name = req.cookies.username;
                            let email = req.cookies.email;
                            let phone = req.cookies.phone;
                            let avatar = req.cookies.avatar;
                            res.render("home", { name, email, phone, avatar, list, islogged: isLoggedIn, e, wish, isAdmin: isAdmin });
                        }).catch(err => console.log(err));

                    }).catch(err => console.log(err));
                })
        }



    }
}
module.exports = new Home();
