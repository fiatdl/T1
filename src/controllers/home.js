const hotel = require("../models/product.model");
const type = require("../models/type.model");
class Home {
    type(req, res, next) {

        let logged;
        if (req.cookies.token) {
            logged = true;
        }
        else {
            logged = false;
        }
        hotel.find({ type: req.params.type }).then((list) => {
            list = list.map((item) => item.toObject());

            type.find({}).then((e) => {
                e = e.map((i) => i.toObject());
                res.render("home", { list, islogged: logged, e });

            }).catch(err => { console.log(err) });

        });



    }
    index(req, res, next) {


        let logged;
        if (req.cookies.token) {
            logged = true;
        }
        else {
            logged = false;
        }
        hotel.find({}).then((list) => {
            list = list.map((item) => item.toObject());

            type.find({}).then((e) => {
                e = e.map((i) => i.toObject());
                res.render("home", { list, islogged: logged, e });

            }).catch(err => { console.log(err) });

        });

        const { start, end, quantity, search } = req.query;
        const day1 = new Date(start);
        const day2 = new Date(end);
        // if (search !== "") {

        //     hotel
        //         .find({ name: { $regex: "^" + search, $options: "i" } })
        //         .then((list) => {
        //             list = list.map((item) => item.toObject());

        //             res.render("home", { list, admin: true, admin: isAdmin });
        //             next();
        //         });
        // }

        // if (Object.keys(req.query).length === 0) {
        //     hotel.find({}).then((list) => {
        //         list = list.map((item) => item.toObject());

        //         res.render("home", { list });
        //     });
        // }
        // else {
        //     hotel
        //         .find({
        //             maximuncus: { $gte: quantity },
        //             startday: {
        //                 $lte: day1,
        //             },
        //             endday: {
        //                 $gte: day2,
        //             },
        //         })
        //         .then((list) => {
        //             list = list.map((item) => item.toObject());

        //             res.render("home", { list, admin: true, admin: isAdmin });
        //         });
        // }

    }
}
module.exports = new Home();
