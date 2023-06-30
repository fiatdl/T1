const userData = require("../models/users.model");
const productData = require("../models/product.model");
const oderData = require("../models/oder.model");
const Reserve = require("../models/Reserve.model");
class user {
    setavatar(req, res, next) {

        res.render("setavatar", { addProcessing: true });
    }

    saveAvatar(req, res, next) {

        userData.findByIdAndUpdate({ _id: req.cookies.id }, { avatar: req.file.originalname }).then((love) => {
            res.json("success");
        }).catch(err => res.json("failed"))
    }
    getTrip(req, res, next) {

        Reserve.find({ cus: req.cookies.id }).populate("room")
            .then((list) => {
                list = list.map((item) => item.toObject());

                res.render("trips", { list });
            })
            .catch((err) => console.log(err));

    }
}
module.exports = new user();